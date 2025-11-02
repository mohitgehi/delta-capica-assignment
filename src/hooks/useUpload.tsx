import { useState } from "react";

const useUpload = () => {
  const [uploading, setUploading] = useState(false);
  const mockUpload = async (file: File) => {
    setUploading(true);
    try {
      const response = await fetch('/api/sign', {
        method: 'POST',
        body: file,
      });

      if (!response.ok) {
        throw new Error('Signing failed');
      }

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      return { objectUrl };
    } finally {
      setUploading(false);
    }
  };
  return { upload: mockUpload, uploading };
};
export default useUpload;
