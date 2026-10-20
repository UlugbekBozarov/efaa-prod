import { useEffect, useState, useCallback } from "react";
import { IconButton } from "@mui/material";

import { Fullscreen, FullscreenExit } from "@/assets";

const getFullscreenElement = () =>
  document.fullscreenElement ||
  (document as any).webkitFullscreenElement ||
  (document as any).mozFullScreenElement ||
  (document as any).msFullscreenElement;

const PrivateLayoutFullScreen = () => {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(
    !!getFullscreenElement()
  );

  const handleFullscreenChange = useCallback(() => {
    setIsFullScreen(!!getFullscreenElement());
  }, []);

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, [handleFullscreenChange]);

  const toggleFullscreen = async () => {
    const element = document.documentElement;

    try {
      if (getFullscreenElement()) {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          await element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
          await element.webkitRequestFullscreen();
        }
      }
    } catch (err) {
      console.error("Fullscreen error:", err);
    }
  };

  return (
    <IconButton onClick={toggleFullscreen} size="large">
      {isFullScreen ? <FullscreenExit /> : <Fullscreen />}
    </IconButton>
  );
};

export default PrivateLayoutFullScreen;
