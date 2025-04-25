import React, { useEffect, useRef } from "react";
import Stats from "./pages/Stats";
import { enterFullscreen, exitFullscreen } from "./fullscreenUtils";


function App() {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "f" && containerRef.current) {
        enterFullscreen(containerRef.current);
      } else if (e.key === "Escape") {
        exitFullscreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);


  return (
    <div className="w-screen h-screen bg-neutral-100 text-gray-800" ref={containerRef}>
      <Stats />
    </div>
  );
}

export default App;
