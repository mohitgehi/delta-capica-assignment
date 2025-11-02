import useUpload from "@/hooks/useUpload";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";

const Upload = () => {
  const { upload, uploading } = useUpload();
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const response = await upload(selectedFile);
    setObjectUrl(response.objectUrl);
  };

  useEffect(() => {
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [objectUrl]);

  return (
    <div className="flex flex-col items-stretch justify-center p-8 h-full w-full">
      <div className="flex-1 flex flex-col gap-2 w-full ">
        <h1 className="text-2xl font-bold text-center">PDF Upload</h1>

        <div className="w-auto flex flex-wrap gap-1 items-center gap-2 justify-center">
          <label htmlFor="pdf-upload" className="text-sm font-medium">{uploading ? "Uploading..." : "Upload PDF"}</label>
          <Input
            id="pdf-upload"
            type="file"
            accept="application/pdf"
            className="w-auto cursor-pointer"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </div>
        {objectUrl && (
          <div className="flex-1 w-full">
            <div className="w-full flex justify-end pb-2">
              <a href={objectUrl} target="_blank" rel="noopener noreferrer" className="text-sm underline">
                Open in the browser
              </a>
            </div>
            <iframe
              src={objectUrl ?? ""}
              title="Uploaded PDF Preview"
              width="100%"
              height="100%"
              style={{ border: "1px solid black" }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
