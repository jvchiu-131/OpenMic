'use client';

interface StepThreeProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  onChange: (field: 'firstName' | 'lastName' | 'profilePic' | 'genres' | 'instruments' | 'contact', value: string | string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const StepThree = ({ data, onChange, onNext, onBack }: StepThreeProps) => {
  return (
    <div>
      <h2>Step 3: Contact Information</h2>

      <input
        type="number"
        placeholder="Contact Number"
        value={data.contact || ''}
        onChange={(e) => onChange('contact', e.target.value)}
        className="block w-full p-2 border rounded mb-4"
      />

      <div className="flex gap-4">
        <button onClick={onBack}>Back</button>
        <button onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

export default StepThree;
