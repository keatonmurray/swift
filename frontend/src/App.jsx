import { useState, useEffect } from "react";

import MobileView from "./pages/Mobile/MobileView";
import DesktopView from "./pages/Desktop/DesktopView";
import Footer from "./components/Footer";


const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    console.log(isMobile)

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return (
      <div className="page-wrapper">
        <MobileView />
        <Footer />
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