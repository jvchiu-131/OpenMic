'use client'; // if using Next.js App Router

import { useState } from 'react';
import uploadImage from '@/lib/services/image';
import Image from 'next/image';

interface ImageUploaderProps {
  folder: string; // Cloudinary folder name
  onUpload?: (url: string) => void; // callback after successful upload
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ folder, onUpload }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const imageUrl = await uploadImage(file, folder);
      setPreview(imageUrl);
      onUpload?.(imageUrl);
    } catch (err) {
      console.error('Image upload failed', err);
      alert('Image upload failed.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <label className="cursor-pointer">
        <span className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          {uploading ? 'Uploading...' : 'Choose Image'}
        </span>
        <input type="file" accept="image/*" onChange={handleChange} className="hidden" />
      </label>

      {preview && (
        <Image
          src={preview}
          alt="Uploaded"
          className="mt-2 max-w-xs rounded shadow-md border border-gray-300"
          width={128}
          height={128}
        />
      )}
    </div>
  );
};

export default ImageUploader;
