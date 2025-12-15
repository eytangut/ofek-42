import React, { useState, useEffect } from 'react';
import { GameEngine } from './gameEngine';
import { gameData } from './gameData';

/**
 * Main Text Adventure Component
 * Multiple-choice based text adventure game
 */
function TextAdventure() {
  const [gameEngine] = useState(() => new GameEngine(gameData));
  const [currentMessage, setCurrentMessage] = useState('');
  const [choices, setChoices] = useState([]);
  const [gameState, setGameState] = useState(null);
  const [messageHistory, setMessageHistory] = useState([]);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const initialMessage = `Welcome to the Text Adventure!\n\n${gameEngine.getRoomDescription()}`;
    setCurrentMessage(initialMessage);
    setMessageHistory([{ text: initialMessage, type: 'system' }]);
    updateChoices();
    updateGameState();
  };

  const updateChoices = () => {
    const availableChoices = gameEngine.getAvailableChoices();
    setChoices(availableChoices);
  };

  const updateGameState = () => {
    setGameState(gameEngine.getGameState());
  };

  const handleChoice = (choice) => {
    // Add player's choice to history
    setMessageHistory(prev => [...prev, { 
      text: `> ${choice.text}`, 
      type: 'player' 
    }]);

    // Execute the choice
    const result = gameEngine.executeChoice(choice);
    
    // Add result to history
    setMessageHistory(prev => [...prev, { 
      text: result.message, 
      type: result.success ? 'system' : 'error' 
    }]);

    setCurrentMessage(result.message);
    updateChoices();
    updateGameState();
  };

  const handleReset = () => {
    gameEngine.reset();
    setMessageHistory([]);
    initializeGame();
  };

  return (
    <div className="text-adventure-container max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
          <h1 className="text-3xl font-bold mb-2">Text Adventure Game</h1>
          {gameState && (
            <div className="flex gap-4 text-sm">
              <span>📍 {gameState.roomName}</span>
              <span>🎒 Inventory: {gameState.inventoryCount} items</span>
            </div>
          )}
        </div>

        {/* Game Display */}
        <div className="p-6">
          {/* Message History */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6 h-96 overflow-y-auto border border-gray-200">
            {messageHistory.map((msg, index) => (
              <div 
                key={index} 
                className={`mb-3 ${
                  msg.type === 'player' 
                    ? 'text-blue-700 font-semibold' 
                    : msg.type === 'error'
                    ? 'text-red-600'
                    : 'text-gray-800'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>
              </div>
            ))}
          </div>

          {/* Current Status */}
          <div className="bg-blue-50 rounded-lg p-4 mb-4 border border-blue-200">
            <p className="text-gray-800 whitespace-pre-wrap">{currentMessage}</p>
          </div>

          {/* Choices */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">What do you want to do?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {choices.map((choice) => (
                <button
                  key={choice.id}
                  onClick={() => handleChoice(choice)}
                  className={`
                    text-left p-3 rounded-lg border-2 transition-all
                    ${choice.locked 
                      ? 'border-red-300 bg-red-50 hover:bg-red-100 text-red-700' 
                      : choice.type === 'move'
                      ? 'border-blue-300 bg-blue-50 hover:bg-blue-100 text-blue-700'
                      : choice.type === 'take'
                      ? 'border-green-300 bg-green-50 hover:bg-green-100 text-green-700'
                      : choice.type === 'examine'
                      ? 'border-purple-300 bg-purple-50 hover:bg-purple-100 text-purple-700'
                      : 'border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-700'
                    }
                    hover:shadow-md font-medium
                  `}
                >
                  <span className="mr-2">
                    {choice.type === 'move' && '🚪'}
                    {choice.type === 'take' && '✋'}
                    {choice.type === 'examine' && '🔍'}
                    {choice.type === 'look' && '👀'}
                    {choice.type === 'inventory' && '🎒'}
                  </span>
                  {choice.text}
                </button>
              ))}
            </div>
          </div>

          {/* Reset Button */}
          <div className="mt-6 text-center">
            <button
              onClick={handleReset}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              🔄 Reset Game
            </button>
          </div>
        </div>
      </div>

      {/* Development Note */}
      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          <strong>🚧 Development Mode:</strong> This text adventure game is in development and not yet integrated into the main site.
        </p>
      </div>
    </div>
  );
}

export default TextAdventure;
