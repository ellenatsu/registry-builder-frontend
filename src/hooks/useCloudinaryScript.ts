//load scripts for cloudinary script to use image uploader
import { useEffect, useState } from 'react';

const useCloudinaryScript = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const existingScript = document.getElementById('cloudinary-script');

    if (!existingScript)  {
      const script = document.createElement('script');
      script.id = 'cloudinary-script';
      script.src = 'https://upload-widget.cloudinary.com/global/all.js';
      script.async = true;

      script.onload = () => {
        setIsLoading(false); // Update state after the script is fully loaded
        console.log('Cloudinary script loaded');
      };
      document.body.appendChild(script);
      
    } else {
        setIsLoading(false); // Script already loaded
      }
  }, []);
  return isLoading;
};

export default useCloudinaryScript;
