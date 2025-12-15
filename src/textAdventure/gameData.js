/**
 * Text Adventure Game Data
 * Minimal example showing the structure - customize this to create your own game
 */

export const gameData = {
  // Starting state/scene ID
  startingState: 'start',
  
  // States/scenes in your game
  // Each state has a text and choices leading to other states
  states: {
    start: {
      text: 'You wake up. What do you do?',
      choices: [
        { id: 'look', text: 'Look around', nextState: 'looked' },
        { id: 'sleep', text: 'Go back to sleep', nextState: 'sleep' }
      ]
    },
    looked: {
      text: 'You see a door.',
      choices: [
        { id: 'door', text: 'Open the door', nextState: 'outside' },
        { id: 'back', text: 'Go back to sleep', nextState: 'sleep' }
      ]
    },
    outside: {
      text: 'You are outside. The adventure begins!',
      choices: [
        { id: 'restart', text: 'Start over', nextState: 'start' }
      ]
    },
    sleep: {
      text: 'You sleep. Nothing happens.',
      choices: [
        { id: 'wake', text: 'Wake up', nextState: 'start' }
      ]
    }
  }
};
