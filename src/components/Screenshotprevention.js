import React, { useEffect } from 'react';

const ScreenshotProtection = ({ children }) => {
  useEffect(() => {
    // Prevent right-click context menu
    const handleContextMenu = (e) => e.preventDefault();

    // Detect PrintScreen and block it
    const handleKeyDown = (e) => {
      if (e.key === 'PrintScreen') {
        e.preventDefault();
        e.stopPropagation();

        // Blur the page temporarily
        document.body.style.filter = 'blur(20px)';
        alert('Screenshots are disabled on this website.');

        // Remove blur after a short delay
        setTimeout(() => {
          document.body.style.filter = 'none';
        }, 1000);
      }
    };

    // Prevent text selection
    const handleSelectStart = (e) => e.preventDefault();

    // Prevent image or content dragging
    const handleDragStart = (e) => e.preventDefault();

    // Add CSS to prevent user interactions
    const style = document.createElement('style');
    style.textContent = `
      * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
      }

      img, video {
        -webkit-user-drag: none !important;
        -khtml-user-drag: none !important;
        -moz-user-drag: none !important;
        -o-user-drag: none !important;
        user-drag: none !important;
        pointer-events: none !important;
      }

      body {
        -webkit-touch-callout: none !important;
        -webkit-tap-highlight-color: transparent !important;
      }
    `;
    document.head.appendChild(style);

    // Attach event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('dragstart', handleDragStart);

    // Cleanup event listeners and remove style on unmount
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('dragstart', handleDragStart);
      document.head.removeChild(style);
    };
  }, []);

  return <>{children}</>;
};

export default ScreenshotProtection;
