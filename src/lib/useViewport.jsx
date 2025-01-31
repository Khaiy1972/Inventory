import React from "react";
import { useState, useEffect } from "react";

function useViewport() {
  const [viewport, setViewport] = useState({
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setViewport({
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return viewport;
}

export default useViewport;
