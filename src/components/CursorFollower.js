"use client";
import { useEffect, useRef, useState } from "react";

const CursorFollower = () => {
  const cursor = useRef();
  const [cursorStyle, setCursorStyle] = useState({});
  const [cursorType, setCursorType] = useState("auto");

  useEffect(() => {
    const onMouseMove = (event) => {
      console.log();
      setCursorStyle({
        transform: `translate3d(${event.clientX}px, ${event.clientY}px, 0px)`,
      });
      const eventCursorType = window.getComputedStyle(event.target)["cursor"];
      setCursorType(eventCursorType);
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div
      ref={cursor}
      style={cursorStyle}
      className="pointer-events-none fixed left-0 top-0 z-50 block mix-blend-difference"
    >
      <div
        className={`
          [@media(hover:hover)]:-ml-[50%] [@media(hover:hover)]:-mt-[50%] [@media(hover:hover)]:block 
          [@media(hover:hover)]:rounded-full [@media(hover:hover)]:transition-all [@media(hover:hover)]:duration-300
          ${
            cursorType == "pointer"
              ? "[@media(hover:hover)]:h-16 [@media(hover:hover)]:w-16"
              : "[@media(hover:hover)]:h-11 [@media(hover:hover)]:w-11"
          }
          [@media(hover:hover)]:border [@media(hover:hover)]:border-gray-900 [@media(hover:hover)]:dark:border-white
          ${
            cursorType == "pointer"
              ? "[@media(hover:hover)]:bg-gray-900 [@media(hover:hover)]:dark:bg-white"
              : ""
          }
        `}
      ></div>
    </div>
  );
};
export default CursorFollower;
