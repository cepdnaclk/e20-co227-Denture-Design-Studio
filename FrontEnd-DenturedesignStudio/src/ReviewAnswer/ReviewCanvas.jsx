import React, { useState, useRef, useEffect } from "react";
import "./reviewcanvas.css";
function ReviewCanvas({ drewcurves }) {
  const uppercurve = drewcurves?.uppercurve;
  const lowercurve = drewcurves?.lowercurve;
  const lowerminorcurve = drewcurves?.lowerminorcurve;
  const curves = uppercurve || [];
  const lowercurves = lowercurve || [];
  const lowerMinorcurve = lowerminorcurve || [];

  useEffect(() => {
    drawAllCurves();
  }, [curves, lowercurves, lowerMinorcurve]);

  const canvasRef = useRef(null);

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
  const isNearPoint = (x, y, point) => {
    const distance = Math.sqrt((x - point.x) ** 2 + (y - point.y) ** 2);
    return distance < 5;
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
  console.log(drewcurves);

  return (
    <canvas
      className="reviewcanvas"
      ref={canvasRef}
      style={{
        display: "block",
        margin: "20px auto",
        background: "transparent",
      }}
    />
  );
}
export default ReviewCanvas;
