


interface StepOneProps {
  data: any; 
  onChange: (field: string, value: any) => void; 
  onNext: () => void;
}

const StepOne = ({ data, onChange, onNext }: StepOneProps) => {
	return (
        <div>
      <h2>Step 1: Basic Info</h2>
      <input
        type="text"
        placeholder="First Name"
        value={data.firstName}
        onChange={(e) => onChange('firstName', e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={data.lastName}
        onChange={(e) => onChange('lastName', e.target.value)}
      />
      <button onClick={onNext}>Next</button>
    </div>
    )
}

export default StepOne;