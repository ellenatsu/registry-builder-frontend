/**
 * NOTE:
 * this component revised from JS version from Cloudinary tutorial video sample code by colbyfayock
 */

import { useEffect, useRef } from 'react';

declare global {
    interface Window {
      cloudinary: any;
    }
  }
let cloudinary: any;

interface CloudinaryUploaderProps {
  onUpload: (error: any, result: any, widget: React.MutableRefObject<any>) => void;
  children: (args: { open: () => void }) => JSX.Element;
}

const CloudinaryUploader: React.FC<CloudinaryUploaderProps> = ({ children, onUpload }) => {
  const widget = useRef<any>(null);

  useEffect(() => {
    // Store the Cloudinary window instance to a ref when the page renders
    if (!cloudinary) {
      cloudinary = window.cloudinary;
    }

    // Use requestIdleCallback to improve load time or fallback to setTimeout
    function onIdle() {
      if (!widget.current) {
        widget.current = createWidget();
      }
    }

    'requestIdleCallback' in window
      ? requestIdleCallback(onIdle)
      : setTimeout(onIdle, 1);

    return () => {
      widget.current?.destroy();
      widget.current = undefined;
    };
    // eslint-disable-next-line
  }, []);

  /**
   * createWidget
   * Creates a new instance of the Cloudinary widget
   */
  const createWidget = () => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOADPRESET;

    if (!cloudName || !uploadPreset) {
      console.warn(
        `Ensure you have the cloudName and uploadPreset set up in your .env file.`
      );
    }

    const options = {
      cloudName, 
      uploadPreset, 
    };

    return cloudinary?.createUploadWidget(options, (error: any, result: any) => {
      if (
        (error || result.event === 'success') &&
        typeof onUpload === 'function'
      ) {
        onUpload(error, result, widget);
      }
    });
  }

  /**
   * open
   * Uses the current widget instance to open the upload modal
   */
  const open = () => {
    if (!widget.current) {
      widget.current = createWidget();
    }
    widget.current && widget.current.open();
  }

  return children({ open });
};

export default CloudinaryUploader;
