import { useState } from 'react';

// components/UploadBox.js
export default function UploadBox() {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (event:any) => {
    const file = event.target.files[0];
    if (file) {
        console.log("Starting upload for:", file.name);
        setUploading(true);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:3000/api/image?key=lab', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log("Upload completed for:", file.name);
            } else {
                console.error("Upload failed:", await response.text());
            }
        } catch (error) {
            console.error("Upload error:", error);
        } finally {
            setUploading(false);
        }
    }
};


  return (
    <div className="w-72 h-72 flex flex-col items-center justify-center bg-white rounded-md shadow-lg hover:shadow-xl transition-shadow duration-300 border border-dashed border-gray-300">
      <label className="flex flex-col items-center justify-center space-y-2 cursor-pointer text-blue-600 hover:text-blue-700">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 17l4 4 4-4m-4-5v9M3 11l4-4 4 4M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        <span className="text-lg">
          {uploading ? "Uploading..." : "Click or Drag to Upload"}
        </span>
        <input type="file" className="hidden" onChange={handleFileChange} />
      </label>
    </div>
  );
}
