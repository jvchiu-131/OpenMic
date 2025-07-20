'use client';

interface StepFourProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  onChange: (field: 'firstName' | 'lastName' | 'profilePic' | 'genres' | 'instruments' | 'contact', value: string | string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

const genresList = ['Pop', 'Rock', 'Jazz', 'Classical', 'Hip-hop', 'EDM'];
const instrumentsList = ['Guitar', 'Piano', 'Drums', 'Violin', 'Bass', 'Vocals'];

const StepFour = ({ data, onChange, onNext, onBack }: StepFourProps) => {
  const toggleSelection = (field: 'genres' | 'instruments', value: string) => {
    const current = data[field] || [];
    if (current.includes(value)) {
      onChange(field, current.filter((v: string) => v !== value));
    } else {
      onChange(field, [...current, value]);
    }
  };

  return (
    <div>
      <h2>Step 4: Select Your Music Preferences</h2>

      <div className="mb-4">
        <p className="font-semibold">Genres</p>
        <div className="flex flex-wrap gap-2">
          {genresList.map((genre) => (
            <button
              key={genre}
              type="button"
              className={`px-3 py-1 rounded-full border ${
                data.genres?.includes(genre) ? 'bg-blue-500 text-white' : 'bg-white text-black'
              }`}
              onClick={() => toggleSelection('genres', genre)}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <p className="font-semibold">Instruments</p>
        <div className="flex flex-wrap gap-2">
          {instrumentsList.map((instrument) => (
            <button
              key={instrument}
              type="button"
              className={`px-3 py-1 rounded-full border ${
                data.instruments?.includes(instrument) ? 'bg-green-500 text-white' : 'bg-white text-black'
              }`}
              onClick={() => toggleSelection('instruments', instrument)}
            >
              {instrument}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-4 mt-6">
        <button onClick={onBack}>Back</button>
        <button onClick={onNext}>Next</button>
      </div>
    </div>
  );
};

export default StepFour;
