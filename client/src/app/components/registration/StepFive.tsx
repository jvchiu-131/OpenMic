'use client';

interface StepFiveProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  onBack: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
}
import Image from "next/image";

const StepFive = ({ data, onBack, onSubmit }: StepFiveProps) => {

    console.log('StepFive data:', data);

  return (
    <form onSubmit={onSubmit}>
      <h2>Step 5: Review & Submit</h2>

      <div className="mb-4">
        <h3 className="font-bold">Review your information:</h3>
        <p><strong>First Name:</strong> {data.firstName}</p>
        <p><strong>Last Name:</strong> {data.lastName}</p>
        <p><strong>Contact Number:</strong> {data.contactNumber}</p>
        <p><strong>Genres:</strong> {data.genres?.join(', ')}</p>
        <p><strong>Instruments:</strong> {data.instruments?.join(', ')}</p>
         {data.profilePic && (
          <div className="mt-4">
            <p><strong>Profile Image:</strong></p>
            <Image
              src={data.profilePic}
              alt="Profile"
              width={128}
              height={128}
              className="w-32 h-32 object-cover rounded-full"
            />
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <button type="button" onClick={onBack}>Back</button>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default StepFive;
