import React, { useState, useRef, useEffect, forwardRef } from "react";
import "./canvas.css";
function DrawingCanvas() {
  const canvasRef = useRef(null);
  const [curves, setCurves] = useState([]);
  const [activeCurve, setActiveCurve] = useState(null);
  const [draggingPoint, setDraggingPoint] = useState(null);
  const [selectedCurve, setSelectedCurve] = useState(null);

  useEffect(() => {
    drawAllCurves();
  }, [curves, selectedCurve]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Delete" && selectedCurve !== null) {
        deleteSelectedCurve();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedCurve, curves]);

  const handleMouseDown = (e) => {
    const { x, y } = getMousePosition(e);
    const foundPoint = findNearbyPoint(x, y);
    const foundCurve = findNearbyCurve(x, y);

    if (foundPoint) {
      setDraggingPoint(foundPoint);
      setSelectedCurve(foundPoint.curveIndex);
    } else if (foundCurve !== null) {
      setSelectedCurve(foundCurve);
    } else if (!activeCurve) {
      const nearestEndpoint = findNearbyEndpoint(x, y);
      const startPoint = nearestEndpoint ? nearestEndpoint : { x, y };

      setCurves([
        ...curves,
        {
          anchorPoints: [startPoint, { x, y }],
          controlPoints: [
            {
              x: (startPoint.x + x) / 2,
              y: startPoint.y - Math.abs(startPoint.y - y) / 4,
            },
          ],
        },
      ]);
      setActiveCurve(curves.length);

      setSelectedCurve(curves.length);
    }
  };

  const handleMouseMove = (e) => {
    if (draggingPoint) {
      const { x, y } = getMousePosition(e);
      const updatedCurves = [...curves];
      const { curveIndex, pointIndex, type } = draggingPoint;

      if (type === "control") {
        updatedCurves[curveIndex].controlPoints[pointIndex] = { x, y };
      } else if (type === "anchor") {
        updatedCurves[curveIndex].anchorPoints[pointIndex] = { x, y };
      }
      setCurves(updatedCurves);
    } else if (activeCurve !== null) {
      const { x, y } = getMousePosition(e);
      const updatedCurves = [...curves];
      updatedCurves[activeCurve].anchorPoints[1] = { x, y };
      updatedCurves[activeCurve].controlPoints = calculateControlPoints(
        updatedCurves[activeCurve].anchorPoints
      );
      setCurves(updatedCurves);
      drawAllCurves();
    }
  };

  const handleMouseUp = () => {
    setDraggingPoint(null);

    if (activeCurve !== null) {
      const updatedCurves = [...curves];
      const { anchorPoints } = updatedCurves[activeCurve];
      const endPoint = anchorPoints[1];

      if (isNearPoint(endPoint.x, endPoint.y, curves[0].anchorPoints[0])) {
        updatedCurves[activeCurve].anchorPoints[1] = curves[0].anchorPoints[0];
        setCurves(updatedCurves);
      }
    }

    setActiveCurve(null);
  };

  const getMousePosition = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const isNearPoint = (x, y, point) => {
    const distance = Math.sqrt((x - point.x) ** 2 + (y - point.y) ** 2);
    return distance < 5;
  };

  const findNearbyPoint = (x, y) => {
    let foundPoint = null;
    curves.forEach((curve, curveIndex) => {
      curve.controlPoints.forEach((point, pointIndex) => {
        if (isNearPoint(x, y, point)) {
          foundPoint = { curveIndex, pointIndex, type: "control" };
        }
      });
      curve.anchorPoints.forEach((point, pointIndex) => {
        if (isNearPoint(x, y, point)) {
          foundPoint = { curveIndex, pointIndex, type: "anchor" };
        }
      });
    });
    return foundPoint;
  };

  const findNearbyCurve = (x, y) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    for (let i = 0; i < curves.length; i++) {
      const { anchorPoints, controlPoints } = curves[i];

      ctx.beginPath();
      ctx.moveTo(anchorPoints[0].x, anchorPoints[0].y);
      ctx.bezierCurveTo(
        controlPoints[0].x,
        controlPoints[0].y,
        controlPoints[0].x,
        controlPoints[0].y,
        anchorPoints[1].x,
        anchorPoints[1].y
      );

      if (ctx.isPointInStroke(x, y)) {
        return i;
      }
    }

    return null;
  };

  const findNearbyEndpoint = (x, y) => {
    let nearestPoint = null;
    let minDistance = 10;
    curves.forEach((curve) => {
      curve.anchorPoints.forEach((point) => {
        const distance = Math.sqrt((x - point.x) ** 2 + (y - point.y) ** 2);
        if (distance < minDistance) {
          nearestPoint = point;
          minDistance = distance;
        }
      });
    });
    return nearestPoint;
  };

  const calculateControlPoints = (anchorPoints) => {
    const [start, end] = anchorPoints;
    const control1 = {
      x: (start.x + end.x) / 2,
      y: (start.y + end.y) / 2,
    };
    return [control1];
  };

  const drawAllCurves = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    curves.forEach(({ anchorPoints, controlPoints }, curveIndex) => {
      ctx.beginPath();
      ctx.moveTo(anchorPoints[0].x, anchorPoints[0].y);
      ctx.bezierCurveTo(
        controlPoints[0].x,
        controlPoints[0].y,
        controlPoints[0].x,
        controlPoints[0].y,
        anchorPoints[1].x,
        anchorPoints[1].y
      );
      ctx.stroke();

      if (curveIndex === selectedCurve) {
        // Draw control points only for the selected curve
        controlPoints.forEach((point) => {
          ctx.beginPath();
          ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
          ctx.fillStyle = "blue";
          ctx.fill();
          ctx.stroke();
        });

        // Draw anchor points only for the selected curve
        anchorPoints.forEach((point) => {
          ctx.beginPath();
          ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
          ctx.fillStyle = "red";
          ctx.fill();
          ctx.stroke();
        });
      }
    });

    fillClosedShapes();
  };

  const fillClosedShapes = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const closedShapes = getClosedShapes();

    closedShapes.forEach((shape) => {
      ctx.beginPath();
      shape.forEach(({ anchorPoints, controlPoints }, index) => {
        if (index === 0) {
          ctx.moveTo(anchorPoints[0].x, anchorPoints[0].y);
        }
        ctx.bezierCurveTo(
          controlPoints[0].x,
          controlPoints[0].y,
          controlPoints[0].x,
          controlPoints[0].y,
          anchorPoints[1].x,
          anchorPoints[1].y
        );
      });
      ctx.closePath();
      ctx.fillStyle = "gray";
      ctx.fill();
    });
  };

  const getClosedShapes = () => {
    const closedShapes = [];
    let currentShape = [];

    for (let i = 0; i < curves.length; i++) {
      currentShape.push(curves[i]);
      console.log(currentShape);

      for (let j = 0; j < currentShape.length; j++) {
        if (
          isNearPoint(
            currentShape[j].anchorPoints[1].x,
            currentShape[j].anchorPoints[1].y,
            currentShape[0].anchorPoints[0]
          )
        ) {
          console.log(true);
          closedShapes.push(currentShape);
          currentShape = [];
        } else {
          console.log(false);
        }
      }
    }
    return closedShapes;
  };
  const deleteSelectedCurve = () => {
    if (selectedCurve !== null) {
      const updatedCurves = curves.filter(
        (_, index) => index !== selectedCurve
      );
      setCurves(updatedCurves);
      setSelectedCurve(null);
    }
  };
  useEffect(() => {
    const canvas = canvasRef.current;
    const handleresize = () => {
      canvas.width = window.innerWidth * 0.1475;
      canvas.height = window.innerHeight * 0.74;
      drawAllCurves();
    };
    handleresize();
    window.addEventListener("resize", handleresize);
    return () => {
      window.removeEventListener("resize", handleresize);
    };
  }, [curves]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "block",
        margin: "20px auto",
        background: "transparent",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
  );
}
export default DrawingCanvas;
