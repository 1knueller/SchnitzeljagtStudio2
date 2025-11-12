
import React from 'react';
import { SparkleIcon } from './icons';

interface InputFormProps {
  theme: string;
  setTheme: (value: string) => void;
  story: string;
  setStory: (value: string) => void;
  details: string;
  setDetails: (value: string) => void;
  suggestions: string;
  setSuggestions: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const InputField: React.FC<{
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  rows?: number;
  helpText: string;
}> = ({ id, label, placeholder, value, onChange, required, rows = 3, helpText }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-slate-300 mb-1">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    <textarea
      id={id}
      rows={rows}
      className="block w-full bg-slate-800 border border-slate-700 rounded-md shadow-sm py-2 px-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm transition-colors"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
    <p className="mt-1 text-xs text-slate-500">{helpText}</p>
  </div>
);


const InputForm: React.FC<InputFormProps> = ({
  theme,
  setTheme,
  story,
  setStory,
  details,
  setDetails,
  suggestions,
  setSuggestions,
  onSubmit,
  isLoading,
}) => {
  return (
    <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700">
      <h2 className="text-xl font-semibold text-white mb-4">Create Your Schnitzeljagt</h2>
      <div className="space-y-6">
        <InputField
          id="theme"
          label="Theme"
          placeholder="e.g., Pirate Treasure, Space Adventure, Detective Mystery"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          required
          helpText="The central idea of your scavenger hunt. This is the only required field."
        />
        <InputField
          id="story"
          label="Story Elements (Optional)"
          placeholder="e.g., A pirate captain lost his treasure map..."
          value={story}
          onChange={(e) => setStory(e.target.value)}
          rows={4}
          helpText="Provide a plot, characters, or a beginning to the story."
        />
        <InputField
          id="details"
          label="Real-Life Details (Optional)"
          placeholder="e.g., Incorporate 'Uncle Bob', the 'old oak tree' in the backyard, and the 'red bicycle'."
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          rows={4}
          helpText="Names, places, or objects to be woven into the narrative and puzzles."
        />
        <InputField
          id="suggestions"
          label="Additional Suggestions (Optional)"
          placeholder="e.g., Make it suitable for 8-10 year olds. The hunt should last about an hour."
          value={suggestions}
          onChange={(e) => setSuggestions(e.target.value)}
          rows={4}
          helpText="Any other constraints, wishes, or special requirements."
        />
        
        <button
          onClick={onSubmit}
          disabled={isLoading || !theme.trim()}
          className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Authoring Adventure...
            </>
          ) : (
            <>
              <SparkleIcon className="h-5 w-5 mr-2" />
              Generate Schnitzeljagt
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default InputForm;
