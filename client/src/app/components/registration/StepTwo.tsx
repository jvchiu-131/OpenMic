'use client';

import ImageUploader from '@/components/imageUploader';
import Image from 'next/image';

interface StepTwoProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  onChange: (field: 'firstName' | 'lastName' | 'profilePic' | 'genres' | 'instruments' | 'contact', value: string | string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const StepTwo = ({ data, onChange, onNext, onBack }: StepTwoProps) => {
  return (
    <div>
      <h2>Step 2: Profile Picture</h2>

      <ImageUploader
        folder="profilePics"
        onUpload={(url) => onChange('profilePic', url)}
      />

      {data.profileImage && (
        <div className="mt-4">
          <Image
            src={data.profileImage}
            alt="Profile"
            width={128}
            height={128}
            className="w-32 h-32 object-cover rounded-full"
          />
        </div>
      )}

      <button className="mt-4" onClick={onBack}>
        Back
      </button>

      <button className="mt-4" onClick={onNext}>
        Next
      </button>
    </div>
  );
};

export default StepTwo;
