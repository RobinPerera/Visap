import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { FaTimes, FaVideo, FaStopCircle } from "react-icons/fa";
import Recorder from '../Recorder';



function Publisher() {

    const [isRecording, setIsRecording] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [isMediaDeviceEnabled, setIsMediaDeviceEnabled] = useState(true);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const navigate = useNavigate();

    const [isRecorderLoaded, setIsRecorderLoaded] = useState(false);
    const [sessionDetails, setSessionDetails] = useState({});
    const hasFetched = useRef(false);

    useEffect(() => {
        const initialize = async () => {
            try {
                await initCamera({ video: true, audio: true });

                const getSessionDetails = async () => {
                    if (hasFetched.current) return; // If already called, skip
                    hasFetched.current = true;

                    const details = await Recorder(); // Call Recorder to get the session details
                    setSessionDetails(details); // Store the session details in state
                };

                getSessionDetails();
            } catch (error) {
                console.error("Error during initialization:", error);
            }
        };
        initialize();
    }, []);
    //this effect for recording timer


    useEffect(() => {
        let interval;
        if (isRecording) {

            const { sessionId, token } = sessionDetails;

            interval = setInterval(() => {
                setElapsedTime(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRecording]);

    // Recording control
    const handleRecording = async () => {
        if (!isRecording) {
            // Start recording logic
            console.log("Recording started");
            setIsRecording(true);
        } else {
            // Stop recording logic
            console.log("Recording stopped");
            setIsRecording(false);
            navigate('/home'); // Redirect to home page
        }
    };

    // Close handler
    const handleClose = () => {
        navigate('/home'); // Redirect to home page
    };

    if (!isVisible) return null;

    const initCamera = async (config) => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia(config);
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            setIsMediaDeviceEnabled(true);
            analyzeVideo();
        } catch (error) {
            console.error("Error accessing camera: ", error);
            setIsMediaDeviceEnabled(false);
        }
    };

    const analyzeVideo = () => {
        const videoElement = videoRef.current;
        const canvas = canvasRef.current;
        if (!canvas || !videoElement) return;

        const context = canvas.getContext("2d");
        let isBlocked = false;
        let blockStartTime = null;

        const checkFrame = () => {
            if (!videoElement.videoWidth || !videoElement.videoHeight) {
                requestAnimationFrame(checkFrame);
                return;
            }

            canvas.width = videoElement.videoWidth;
            canvas.height = videoElement.videoHeight;
            context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

            const frameData = context.getImageData(0, 0, canvas.width, canvas.height);
            const isCurrentlyBlocked = analyzeFrame(frameData);

            if (isCurrentlyBlocked) {
                if (!isBlocked) {
                    isBlocked = true;
                    blockStartTime = Date.now();
                } else if (blockStartTime && Date.now() - blockStartTime >= 5000) {
                    alert("Your camera seems to be blocked! Please check your camera feed.");
                    blockStartTime = null;
                }
            } else {
                isBlocked = false;
                blockStartTime = null;
            }
            setTimeout(checkFrame, 1000);
        };
        checkFrame();
    };

    const analyzeFrame = (frameData) => {
        const { data } = frameData;
        const colorThreshold = 100;
        const specificBlockedColor = { r: 1, g: 11, b: 19, a: 255 };
        const blackThreshold = 4;

        let isSolid = true;
        let isBlack = true;
        let isIcon = false;
        const referencePixel = { r: data[0], g: data[1], b: data[2], a: data[3] };

        for (let i = 0; i < data.length; i += 4) {
            const currentPixel = { r: data[i], g: data[i + 1], b: data[i + 2], a: data[i + 3] };

            if (JSON.stringify(currentPixel) === JSON.stringify(specificBlockedColor)) {
                isIcon = true;
            }

            if (currentPixel.r > blackThreshold || currentPixel.g > blackThreshold || currentPixel.b > blackThreshold) {
                isBlack = false;
            }

            if (
                Math.abs(currentPixel.r - referencePixel.r) > colorThreshold ||
                Math.abs(currentPixel.g - referencePixel.g) > colorThreshold ||
                Math.abs(currentPixel.b - referencePixel.b) > colorThreshold
            ) {
                isSolid = false;
            }

            if (!isBlack && !isSolid && !isIcon) {
                return false;
            }
        }
        return isSolid || isBlack || isIcon;
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl relative">
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors z-50"
                    aria-label="Close recorder"
                >
                    <FaTimes className="w-6 h-6" />
                </button>

                {/* Video Preview Container */}
                <div className="relative bg-gray-800 rounded-lg overflow-hidden aspect-video mb-4">
                    {isMediaDeviceEnabled ? (
                        <>
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                className="w-full h-full object-cover"
                                aria-label="Camera preview"
                            />
                            <canvas ref={canvasRef} className="hidden" />

                            {/* Recording Status */}
                            <div className="absolute top-4 left-4 flex items-center space-x-3">
                                {isRecording && (
                                    <>
                                        <span className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></span>
                                        <span className="text-red-500 text-lg font-semibold">
                                            Recording - {String(Math.floor(elapsedTime / 60)).padStart(2, '0')}:
                                            {String(elapsedTime % 60).padStart(2, '0')}
                                        </span>
                                    </>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-white text-lg">
                            <p>Camera access required for recording</p>
                        </div>
                    )}
                </div>

                {/* Controls Container */}
                <div className="flex flex-col items-center space-y-4">
                    {/* Recording Button */}
                    <button
                        onClick={handleRecording}
                        className={`flex items-center justify-center w-20 h-20 rounded-full transition-all ${isRecording
                            ? "bg-red-500 hover:bg-red-600"
                            : "bg-blue-500 hover:bg-blue-600"
                            } text-white text-lg font-semibold`}
                        aria-label={isRecording ? "Stop recording" : "Start recording"}
                    >
                        {isRecording ? (
                            <FaStopCircle className="w-10 h-10" />
                        ) : (
                            <FaVideo className="w-10 h-10" />
                        )}
                    </button>

                    {/* Status Messages */}
                    <div aria-live="polite" className="sr-only">
                        {isRecording ? "Recording started" : "Recording stopped"}
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                            className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                            style={{ width: `${(elapsedTime % 100) * 1}%` }} // Adjust this based on your needs
                        ></div>
                    </div>

                    {/* Help Text */}
                    <p className="text-gray-600 text-center text-lg">
                        {isRecording
                            ? "Recording in progress. Click stop button when finished."
                            : "Click the button above to start recording"}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Publisher