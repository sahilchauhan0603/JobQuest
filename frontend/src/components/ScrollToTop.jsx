import { useState, useEffect } from "react";
import { ArrowUpToLine } from "lucide-react";

const ScrollToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const buttonStyles = {
    position: "fixed",
    bottom: "75px",
    right: "23px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "50%",
    padding: "10px",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    opacity: "0.9",
    transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
  };

  const buttonHoverStyles = {
    transform: "scale(1.2)",
    opacity: "1",
  };

  const iconStyles = {
    width: "24px",
    height: "24px",
  };

  return (
    <>
      {showTopBtn && (
        <button
          onClick={goToTop}
          style={{
            ...buttonStyles,
            ":hover": buttonHoverStyles, // Hover styles are better implemented using CSS or a library like styled-components
          }}
        >
          <ArrowUpToLine style={iconStyles} />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
