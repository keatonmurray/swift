import { useEffect, useState } from "react";

import MobileView from "./pages/Mobile/MobileView";
import DesktopView from "./pages/Desktop/DesktopView";

const App = () => {
  const getIsMobile = () => window.innerWidth <= 480;

  const [isMobile, setIsMobile] = useState(getIsMobile);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 480px)");

    const handleChange = (e) => {
      window.location.reload();
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isMobile ? <MobileView /> : <DesktopView />;
};

export default App;