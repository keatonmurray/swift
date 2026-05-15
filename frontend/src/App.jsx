import { useState, useEffect } from "react";

import MobileView from "./pages/Mobile/MobileView";
import DesktopView from "./pages/Desktop/DesktopView";


const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return (
      <div className="page-wrapper">
        <MobileView />
      </div>
    );
  } else {
    return (
      <div className="desktop-wrapper">
        <DesktopView />
      </div>
    );
  }
};

export default App;