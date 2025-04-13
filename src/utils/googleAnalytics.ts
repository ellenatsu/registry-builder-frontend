import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID; 


export const initGA = () => {
    if (!GA_MEASUREMENT_ID) {
        console.warn("Google Analytics ID is missing!");
        return;
    }

    ReactGA.initialize(GA_MEASUREMENT_ID);
    console.log("Google Analytics initialized.");
};

export const trackPageView = (path: string) => {
    if (!GA_MEASUREMENT_ID) return;
    ReactGA.send({ hitType: "pageview", page: path });
    console.log(`Tracked pageview: ${path}`);
};
