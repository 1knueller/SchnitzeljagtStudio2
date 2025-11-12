
import React, { useState } from 'react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import OutputDisplay from './components/OutputDisplay';
import { generateSchnitzeljagt } from './services/geminiService';

export default function App() {
  const [theme, setTheme] = useState('');
  const [story, setStory] = useState('');
  const [details, setDetails] = useState('');
  const [suggestions, setSuggestions] = useState('');
  
  const [generatedHunt, setGeneratedHunt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!theme.trim()) {
      setError('A theme is required to generate a Schnitzeljagt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedHunt('');

    try {
      const result = await generateSchnitzeljagt({ theme, story, details, suggestions });
      setGeneratedHunt(result);
    } catch (err) {
      console.error(err);
      setError('An error occurred while generating the Schnitzeljagt. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
          
          <div className="lg:pr-4">
            <InputForm
              theme={theme}
              setTheme={setTheme}
              story={story}
              setStory={setStory}
              details={details}
              setDetails={setDetails}
              suggestions={suggestions}
              setSuggestions={setSuggestions}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>
          
          <div className="mt-8 lg:mt-0 lg:pl-4">
            <OutputDisplay
              markdownContent={generatedHunt}
              isLoading={isLoading}
              error={error}
            />
          </div>

        </div>
      </main>
      <footer className="text-center p-4 text-slate-500 text-sm">
        <p>Powered by Gemini & React</p>
      </footer>
    </div>
  );
}
