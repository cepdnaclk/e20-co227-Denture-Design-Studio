import React, { useState } from 'react';
import demo from "./demo.png";
import "./demo.css";

function Demo({ videoSrc }) {
    const [showVideo, setShowVideo] = useState(false);

    const handleMouseEnter = () => {
        setShowVideo(true);
    };

    const handleMouseLeave = () => {
        setShowVideo(false);
    };

    return (
        <>
            {/* Demo Button */}
            <button
                className="demobutton"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <img src={demo} alt="Demo" />
            </button>
       
            {showVideo && <div className="blur-overlay"></div>}

            {showVideo && (
                <video className="video-overlay" autoPlay muted loop>
                    <source src={videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}
        </>
    );
}

export default Demo;
