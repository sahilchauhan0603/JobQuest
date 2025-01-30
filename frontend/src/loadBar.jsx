import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // Import the nprogress CSS
import './loadBar.css'; // Custom CSS for the progress bar (if needed)

const ProgressBar = () => {
  const location = useLocation();

  useEffect(() => {
    // Trigger NProgress when route changes
    NProgress.start();
    NProgress.done();
  }, [location]);

  return null; // This component doesn't need to render anything
};

export default ProgressBar;
