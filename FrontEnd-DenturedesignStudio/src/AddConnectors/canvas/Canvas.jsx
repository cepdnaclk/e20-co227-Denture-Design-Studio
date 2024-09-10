import React, { useState, useRef, useEffect } from "react";
import "./canvas.css";

function DrawingCanvas({ connectortype, curvesData, drewcurves }) {
  const canvasRef = useRef(null);
  const uppercurve = drewcurves?.uppercurve;
  const lowercurve = drewcurves?.lowercurve;
  const lowerminorcurve = drewcurves?.lowerminorcurve;
  const [curves, setCurves] = useState(uppercurve ? uppercurve : []);
  const [lowercurves, setLowercurves] = useState(lowercurve ? lowercurve : []);
  const [lowerMinorcurve, setLowerminorcurve] = useState(
    lowerminorcurve ? lowerminorcurve : []
  );
  const [activeCurve, setActiveCurve] = useState(null);
  const [draggingPoint, setDraggingPoint] = useState(null);
  const [selectedCurve, setSelectedCurve] = useState(null);

  useEffect(() => {
    drawAllCurves();
    curvesData(curves, lowercurves, lowerMinorcurve);
  }, [curves, selectedCurve, lowercurves, lowerMinorcurve]);

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
  }, [selectedCurve, curves, lowercurves]);

  const handleMouseDown = (e) => {
    const { x, y } = getMousePosition(e);
    const foundPoint = findNearbyPoint(x, y, connectortype);
    const foundCurve = findNearbyCurve(x, y, connectortype);

    if (foundPoint) {
      setDraggingPoint(foundPoint);
      setSelectedCurve({
        curveIndex: foundPoint.curveIndex,
        conType: foundPoint.conType,
      });
    } else if (foundCurve !== null) {
      setSelectedCurve(foundCurve);
    } else if (!activeCurve) {
      const nearestEndpoint = findNearbyEndpoint(x, y, connectortype);
      const startPoint = nearestEndpoint ? nearestEndpoint : { x, y };
      const newCurve = {
        anchorPoints: [startPoint, { x, y }],
        controlPoints: calculateControlPoints(startPoint, { x, y }),
      };
      if (connectortype === "upper") {
        setCurves([...curves, newCurve]);
        setActiveCurve(curves.length);
        setSelectedCurve({ curveIndex: curves.length, conType: "upper" });
      } else if (connectortype === "lower") {
        setLowercurves([...lowercurves, newCurve]);
        setActiveCurve(lowercurves.length);
        setSelectedCurve({ curveIndex: lowercurves.length, conType: "lower" });
      } else if (connectortype === "lower_minor") {
        setLowerminorcurve([...lowerMinorcurve, newCurve]);
        setActiveCurve(lowerMinorcurve.length);
        setSelectedCurve({
          curveIndex: lowerMinorcurve.length,
          conType: "lower_minor",
        });
      }
    }
  };

  const handleMouseMove = (e) => {
    const updateCurvePoints = (
      updatedCurves,
      curveIndex,
      pointIndex,
      type,
      x,
      y
    ) => {
      if (type === "control") {
        if (updatedCurves[curveIndex]?.controlPoints) {
          updatedCurves[curveIndex].controlPoints[pointIndex] = { x, y };
        }
      } else if (type === "anchor") {
        if (updatedCurves[curveIndex]?.anchorPoints) {
          updatedCurves[curveIndex].anchorPoints[pointIndex] = { x, y };
        }
      }
    };

    const handleCurveUpdate = (updatedCurves, activeCurve, x, y) => {
      if (updatedCurves[activeCurve]?.anchorPoints) {
        updatedCurves[activeCurve].anchorPoints[1] = { x, y };
        updatedCurves[activeCurve].controlPoints = calculateControlPoints(
          updatedCurves[activeCurve].anchorPoints[0],
          updatedCurves[activeCurve].anchorPoints[1]
        );
      }
    };

    if (connectortype === "upper") {
      if (draggingPoint) {
        const { x, y } = getMousePosition(e);
        const updatedCurves = [...curves];
        const { curveIndex, pointIndex, type } = draggingPoint;

        updateCurvePoints(updatedCurves, curveIndex, pointIndex, type, x, y);
        setCurves(updatedCurves);
      } else if (activeCurve !== null) {
        const { x, y } = getMousePosition(e);
        const updatedCurves = [...curves];
        handleCurveUpdate(updatedCurves, activeCurve, x, y);
        setCurves(updatedCurves);
      }
    } else if (connectortype === "lower") {
      if (draggingPoint) {
        const { x, y } = getMousePosition(e);
        const updatedCurves = [...lowercurves];
        const { curveIndex, pointIndex, type } = draggingPoint;

        updateCurvePoints(updatedCurves, curveIndex, pointIndex, type, x, y);
        setLowercurves(updatedCurves);
      } else if (activeCurve !== null) {
        const { x, y } = getMousePosition(e);
        const updatedCurves = [...lowercurves];
        handleCurveUpdate(updatedCurves, activeCurve, x, y);
        setLowercurves(updatedCurves);
      }
    } else if (connectortype === "lower_minor") {
      if (draggingPoint) {
        const { x, y } = getMousePosition(e);
        const updatedCurves = [...lowerMinorcurve];
        const { curveIndex, pointIndex, type } = draggingPoint;

        updateCurvePoints(updatedCurves, curveIndex, pointIndex, type, x, y);
        setLowerminorcurve(updatedCurves);
      } else if (activeCurve !== null) {
        const { x, y } = getMousePosition(e);
        const updatedCurves = [...lowerMinorcurve];
        handleCurveUpdate(updatedCurves, activeCurve, x, y);
        setLowerminorcurve(updatedCurves);
      }
    }
  };

  const handleMouseUp = () => {
    setDraggingPoint(null);
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

  const findNearbyPoint = (x, y, connectortype) => {
    let foundPoint = null;
    const curvesArray =
      connectortype === "upper"
        ? curves
        : connectortype === "lower"
        ? lowercurves
        : lowerMinorcurve;

    curvesArray.forEach((curve, curveIndex) => {
      curve.controlPoints.forEach((point, pointIndex) => {
        if (isNearPoint(x, y, point)) {
          foundPoint = {
            curveIndex,
            pointIndex,
            type: "control",
            conType: connectortype,
          };
        }
      });
      curve.anchorPoints.forEach((point, pointIndex) => {
        if (isNearPoint(x, y, point)) {
          foundPoint = {
            curveIndex,
            pointIndex,
            type: "anchor",
            conType: connectortype,
          };
        }
      });
    });

    return foundPoint;
  };

  const findNearbyCurve = (x, y, connectortype) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const curvesArray =
      connectortype === "upper"
        ? curves
        : connectortype === "lower"
        ? lowercurves
        : lowerMinorcurve;

    for (let i = 0; i < curvesArray.length; i++) {
      const { anchorPoints, controlPoints } = curvesArray[i];

      ctx.beginPath();
      ctx.moveTo(anchorPoints[0].x, anchorPoints[0].y);
      ctx.bezierCurveTo(
        controlPoints[0].x,
        controlPoints[0].y,
        controlPoints[1].x,
        controlPoints[1].y,
        anchorPoints[1].x,
        anchorPoints[1].y
      );

      if (ctx.isPointInStroke(x, y)) {
        return { curveIndex: i, conType: connectortype };
      }
    }

    return null;
  };

  const findNearbyEndpoint = (x, y, connectortype) => {
    let nearestPoint = null;
    let minDistance = 10;
    const curvesArray =
      connectortype === "upper"
        ? curves
        : connectortype === "lower"
        ? lowercurves
        : lowerMinorcurve;

    curvesArray.forEach((curve) => {
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

  const calculateControlPoints = (start, end) => {
    const control1 = {
      x: start.x + (end.x - start.x) / 3,
      y: start.y + (end.y - start.y) / 3,
    };
    const control2 = {
      x: start.x + (2 * (end.x - start.x)) / 3,
      y: start.y + (2 * (end.y - start.y)) / 3,
    };

    return [control1, control2];
  };

  const drawCurves = (curvesArray, lineWidth, conType) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    curvesArray.forEach(({ anchorPoints, controlPoints }, curveIndex) => {
      ctx.beginPath();
      ctx.moveTo(anchorPoints[0].x, anchorPoints[0].y);
      ctx.bezierCurveTo(
        controlPoints[0].x,
        controlPoints[0].y,
        controlPoints[1].x,
        controlPoints[1].y,
        anchorPoints[1].x,
        anchorPoints[1].y
      );

      ctx.lineWidth = lineWidth;
      ctx.stroke();

      if (
        curveIndex === selectedCurve?.curveIndex &&
        selectedCurve?.conType === conType
      ) {
        controlPoints.forEach((point) => {
          ctx.beginPath();
          ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
          ctx.fillStyle = "blue";
          ctx.fill();
          ctx.stroke();
        });

        anchorPoints.forEach((point) => {
          ctx.beginPath();
          ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
          ctx.fillStyle = "red";
          ctx.fill();
          ctx.stroke();
        });
      }
    });
  };

  const drawAllCurves = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawCurves(curves, 2, "upper");
    drawCurves(lowercurves, 13, "lower");
    drawCurves(lowerMinorcurve, 5, "lower_minor");

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
          controlPoints[1].x,
          controlPoints[1].y,
          anchorPoints[1].x,
          anchorPoints[1].y
        );
      });
      ctx.closePath();
      ctx.fillStyle = "#000000b5";
      ctx.fill();
    });
  };

  const getClosedShapes = () => {
    const closedShapes = [];
    const usedCurves = new Set();

    for (let i = 0; i < curves.length; i++) {
      if (usedCurves.has(i)) continue;

      const currentShape = [];
      let startPoint = curves[i].anchorPoints[0];
      let endPoint = curves[i].anchorPoints[1];

      currentShape.push(curves[i]);
      usedCurves.add(i);

      let foundClosedShape = false;

      while (!foundClosedShape) {
        let hasExtended = false;

        for (let j = 0; j < curves.length; j++) {
          if (usedCurves.has(j)) continue;

          let nextCurve = curves[j];
          let nextStart = nextCurve.anchorPoints[0];
          let nextEnd = nextCurve.anchorPoints[1];

          if (isNearPoint(endPoint.x, endPoint.y, nextStart)) {
            currentShape.push(nextCurve);
            usedCurves.add(j);
            endPoint = nextEnd;
            hasExtended = true;
            break;
          } else if (isNearPoint(endPoint.x, endPoint.y, nextEnd)) {
            currentShape.push({
              ...nextCurve,
              anchorPoints: [
                nextCurve.anchorPoints[1],
                nextCurve.anchorPoints[0],
              ],
              controlPoints: [
                nextCurve.controlPoints[1],
                nextCurve.controlPoints[0],
              ],
            });
            usedCurves.add(j);
            endPoint = nextStart;
            hasExtended = true;
            break;
          }
        }

        if (!hasExtended) {
          if (isNearPoint(startPoint.x, startPoint.y, endPoint)) {
            foundClosedShape = true;
            closedShapes.push(currentShape);
          } else {
            break;
          }
        }
      }
    }

    return closedShapes;
  };

  const deleteSelectedCurve = () => {
    if (selectedCurve !== null) {
      if (selectedCurve?.conType === "upper") {
        const updatedCurves = curves.filter(
          (_, index) => index !== selectedCurve.curveIndex
        );
        setCurves(updatedCurves);
      }
      if (selectedCurve?.conType === "lower") {
        const updatedlowerCurves = lowercurves.filter(
          (_, index) => index !== selectedCurve.curveIndex
        );

        setLowercurves(updatedlowerCurves);
      }
      if (selectedCurve?.conType === "lower_minor") {
        const updatedlowerCurves = lowerMinorcurve.filter(
          (_, index) => index !== selectedCurve.curveIndex
        );

        setLowerminorcurve(updatedlowerCurves);
      }

      setSelectedCurve(null);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const handleresize = () => {
      canvas.width = window.innerWidth * 0.1485;
      canvas.height = window.innerHeight * 0.75;
      drawAllCurves();
    };
    handleresize();
    window.addEventListener("resize", handleresize);
    return () => {
      window.removeEventListener("resize", handleresize);
    };
  }, [curves, lowercurves, lowerMinorcurve]);

  return (
    <canvas
      className="canvas"
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
