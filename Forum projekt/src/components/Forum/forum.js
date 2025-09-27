import React, { useEffect } from "react";
import "../../post.css";

export function Forum() {
  useEffect(() => {
    // Add the Giscus script dynamically
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "kubaskorupa4/strona-projekt");
    script.setAttribute("data-repo-id", "R_kgDOKt4PBA");
    script.setAttribute("data-category", "General");
    script.setAttribute("data-category-id", "DIC_kwDOKt4PBM4Ca-2P");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", "preferred_color_scheme");
    script.setAttribute("data-lang", "pl");
    script.crossOrigin = "anonymous";
    script.async = true;

    // Append the script to the document
    document.head.appendChild(script);

    // Clean up the script when the component is unmounted
    return () => {
      document.head.removeChild(script);
    };
  }, []); // Empty dependency array ensures this effect runs once after the initial render

  return (
    <div>
      <div className="App">
        <div className="Content">
          <div className="post"></div>
        </div>
      </div>

      {/* This is where the comments will appear */}
      <div
        className="giscus"
        style={{ maxWidth: "1200px", margin: "0 auto" }}
      ></div>
      <div className="giscus"></div>
    </div>
  );
}
