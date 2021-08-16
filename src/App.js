// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import { IoCameraReverse } from "react-icons/io5";

// 1. TODO - Import required model here
// e.g. import * as tfmodel from "@tensorflow-models/tfmodel";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import "./App.css";
// 2. TODO - Import drawing utility here
import { drawRect } from "./utilities";

function App() {
  const [cameraFace, setCameraFace] = useState("user");

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  // Main function
  const runCoco = async () => {
    // 3. TODO - Load network
    const net = await cocossd.load();

    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // 4. TODO - Make Detections
      const obj = await net.detect(video);
      console.log(obj);

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");

      // 5. TODO - Update drawing utility
      // drawSomething(obj, ctx)
      drawRect(obj, ctx);
    }
  };

  useEffect(() => {
    runCoco();
  }, []);

  function swapCamera(e) {
    e.preventDefault();
    if (cameraFace === "user") {
      setCameraFace("environment");
    } else if (cameraFace === "environment") {
      setCameraFace("user");
    }
    console.log("camera swapped");
    console.log(cameraFace);
  }

  return (
    <div className="app">
      <header className="app-header">
        <h2>iSpy</h2>
      </header>
      <section>
        <div className="container">
          <Webcam
            ref={webcamRef}
            muted={true}
            videoConstraints={{ facingMode: { cameraFace } }}
            className="webcam"
          />
          <canvas ref={canvasRef} className="canvas" />
        </div>
      </section>
      <footer className="app-footer">
        <div className="camera-icon-container">
          <IoCameraReverse className="camera-icon" onClick={swapCamera} />
        </div>
        <div className="app-footer-text">
          <h3>made by Gino Swanepoel</h3>
        </div>
      </footer>
    </div>
  );
}

export default App;
