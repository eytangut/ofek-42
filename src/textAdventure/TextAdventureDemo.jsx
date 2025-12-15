import React from 'react';
import ReactDOM from 'react-dom/client';
import TextAdventure from './TextAdventure';
import '../index.css';

/**
 * Standalone demo page for the Text Adventure game
 * This can be used for testing without integrating into the main app
 */
function TextAdventureDemo() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <TextAdventure />
    </div>
  );
}

export default TextAdventureDemo;

// Only run this if the file is loaded directly
if (typeof window !== 'undefined' && window.location.pathname.includes('text-adventure')) {
  const root = document.getElementById('root');
  if (root) {
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <TextAdventureDemo />
      </React.StrictMode>
    );
  }
}
