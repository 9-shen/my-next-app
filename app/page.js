'use client';
import { useState, useRef } from 'react';
import { Cropper } from 'react-cropper';
import 'cropperjs/dist/cropper.css';

export default function Home() {
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const cropperRef = useRef(null);

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file.');
    }
  };

  // Handle crop and retrieve cropped image
  const handleCrop = () => {
    if (cropperRef.current) {
      const cropper = cropperRef.current.cropper;
      const croppedDataURL = cropper.getCroppedCanvas({
        width: 1920,
        height: 1080,
      }).toDataURL();
      setCroppedImage(croppedDataURL);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Image Upload & Crop Tool</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        <div className="flex flex-col items-center">
          <label htmlFor="file-input" className="cursor-pointer mb-4">
            <div className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              Select Image
            </div>
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {image && (
            <div className="w-full mt-4">
              <Cropper
                src={image}
                style={{ height: 400, width: '100%' }}
                initialAspectRatio={16 / 9}
                aspectRatio={16 / 9}
                guides={true}
                ref={cropperRef}
                viewMode={2}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false}
              />
              <button
                onClick={handleCrop}
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
              >
                Crop Image
              </button>
            </div>
          )}
        </div>

        {croppedImage && (
          <div className="flex flex-col items-center mt-6 md:mt-0">
            <h2 className="text-lg font-semibold mb-2">Cropped Image Preview</h2>
            <img
              src={croppedImage}
              alt="Cropped"
              className="border border-gray-300 rounded shadow-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
}
