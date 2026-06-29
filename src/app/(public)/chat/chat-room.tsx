"use client";

import { useEffect, useRef } from "react";

export default function ChatRoom() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Load the Chattable library script
    const script = document.createElement("script");
    script.src = "https://iframe.chat/scripts/main.min.js";
    script.async = true;
    script.onload = () => {
      // Initialize the chat after the library loads
      if (window.chattable) {
        window.chattable.initialize({
          // Option 1: Use a custom CSS file
          // stylesheet: "/styles/chattable.css",
          // Option 2: Use a prebuilt theme
          theme: "pastel pink", // Replace with your preferred theme
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup: remove the script if the component unmounts
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <iframe
      ref={iframeRef}
      id="chattable" // Critical: must have this ID
      src="https://iframe.chat/embed?chat=mavenwifey"
      className="h-screen-header w-full"
      title="Chattable Chat"
    />
  );
}
