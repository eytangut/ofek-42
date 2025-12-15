import React, { useState, useEffect } from 'react';
import { GameEngine } from './gameEngine';
import { gameData } from './gameData';

/**
 * Minimal Text Adventure Component
 * Displays text and clickable choices
 */
function TextAdventure() {
  const [gameEngine] = useState(() => new GameEngine(gameData));
  const [currentText, setCurrentText] = useState('');
  const [choices, setChoices] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const text = gameEngine.getText();
    const choices = gameEngine.getChoices();
    setCurrentText(text);
    setChoices(choices);
    setHistory([{ text, isChoice: false }]);
  };

  const handleChoice = (choice) => {
    // Add choice to history
    setHistory(prev => [...prev, 
      { text: choice.text, isChoice: true },
    ]);

    // Make the choice and get new state
    const result = gameEngine.makeChoice(choice);
    
    // Add action result if there was one
    if (result.actionResult) {
      setHistory(prev => [...prev,
        { text: result.actionResult, isChoice: false, isAction: true }
      ]);
    }
    
    // Add result text to history
    setHistory(prev => [...prev,
      { text: result.text, isChoice: false }
    ]);

    setCurrentText(result.text);
    setChoices(result.choices);
  };

  const handleReset = () => {
    gameEngine.reset();
    setHistory([]);
    initializeGame();
  };

  return (
    <div className="text-adventure-container max-w-3xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4">
          <h1 className="text-2xl font-bold">Text Adventure</h1>
        </div>

        {/* Game Display */}
        <div className="p-6">
          {/* History */}
          <div className="bg-gray-50 rounded p-4 mb-4 h-80 overflow-y-auto">
            {history.map((entry, index) => (
              <div 
                key={index} 
                className={`mb-3 ${
                  entry.isChoice 
                    ? 'text-blue-600 font-semibold' 
                    : entry.isAction
                    ? 'text-purple-600 italic'
                    : 'text-gray-800'
                }`}
              >
                {entry.isChoice && '> '}
                {entry.isAction && '→ '}
                {entry.text}
              </div>
            ))}
          </div>

          {/* Current Text */}
          <div className="bg-blue-50 rounded p-4 mb-4">
            <p className="text-gray-800">{currentText}</p>
          </div>

          {/* Choices */}
          {choices.length > 0 && (
            <div className="space-y-2">
              {choices.map((choice, index) => (
                <button
                  key={`${choice.text}-${index}`}
                  onClick={() => handleChoice(choice)}
                  className="w-full text-left p-3 rounded border-2 border-blue-300 bg-blue-50 hover:bg-blue-100 transition-colors"
                >
                  {choice.text}
                </button>
              ))}
            </div>
          )}

          {/* Reset */}
          <div className="mt-4 text-center">
            <button
              onClick={handleReset}
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TextAdventure;
