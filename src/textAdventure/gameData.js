/**
 * Text Adventure Game Data
 * 
 * Structure:
 * - text: What to display
 * - choices: Array of options
 *   - text: What the button says
 *   - nextState: (optional) Go to another state
 *   - action: (optional) Function to execute
 */

export const gameData = {
  startingState: 'start',
  
  states: {
    start: {
      text: 'You wake up. What do you do?',
      choices: [
        { 
          text: 'Look around', 
          nextState: 'looked' 
        },
        { 
          text: 'Go back to sleep', 
          nextState: 'sleep' 
        },
        { 
          text: 'Check the time',
          action: 'checkTime'
        }
      ]
    },
    looked: {
      text: 'You see a door.',
      choices: [
        { text: 'Open the door', nextState: 'outside' },
        { text: 'Go back to sleep', nextState: 'sleep' }
      ]
    },
    outside: {
      text: 'You are outside. The adventure begins!',
      choices: [
        { text: 'Start over', nextState: 'start' }
      ]
    },
    sleep: {
      text: 'You sleep. Nothing happens.',
      choices: [
        { text: 'Wake up', nextState: 'start' }
      ]
    }
  },
  
  // Define your custom actions here
  actions: {
    checkTime: (engine) => {
      const time = new Date().toLocaleTimeString();
      return `The time is ${time}. You feel disoriented.`;
    }
  }
};
