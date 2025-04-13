import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "../../utils/googleAnalytics"; 

const AnalyticsTracker = () => {
    const location = useLocation();

    useEffect(() => {
        trackPageView(location.pathname + location.search);
    }, [location]);

    return null; // This component doesn't render anything
};

export default AnalyticsTracker;
