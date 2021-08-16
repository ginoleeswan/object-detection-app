import { createEvent } from "@testing-library/react";

export const drawRect = (detections, ctx) => {
  detections.forEach((prediction) => {
    // Get prediction results
    const [x, y, width, height] = prediction["bbox"];
    const text = prediction["class"];

    // set styling
    const color = "blue";
    ctx.strokeStyle = color;
    ctx.font = "50px Helvetica";
    ctx.fillStyle = color;

    // draw rectangles and text
    ctx.beginPath();
    ctx.fillText(text, x, y);
    ctx.rect(x, y, width, height);
    ctx.stroke();
  });
};
