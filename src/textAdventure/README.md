# Text Adventure - Minimal Boilerplate

A bare-bones, multiple-choice text adventure framework. Define everything in JSON with text and choices that can lead to other states and/or execute code.

## What This Is

This is the **absolute minimum** needed for a choice-based text adventure:
- States with text
- Choices that can:
  - Lead to other states
  - Execute custom code
  - Do both

**No built-in assumptions about game mechanics** - you define everything!

## Files

- `gameData.js` - Your game content (states, choices, actions)
- `gameEngine.js` - Minimal engine (~70 lines)
- `TextAdventure.jsx` - Simple React UI
- `index.js` - Module exports

## How It Works

### Basic Structure (JSON-like)

```javascript
export const gameData = {
  startingState: 'start',
  
  states: {
    start: {
      text: 'Some text here',
      choices: [
        // Choice that leads to another state
        { text: 'Go somewhere', nextState: 'somewhere' },
        
        // Choice that executes code
        { text: 'Do something', action: 'doSomething' },
        
        // Choice that does both
        { text: 'Do both', action: 'doSomething', nextState: 'somewhere' }
      ]
    }
  },
  
  actions: {
    doSomething: (engine) => {
      // Your code here
      return 'Something happened!';
    }
  }
}
```

### Choice Properties

- `text` - What the button says (required)
- `nextState` - Go to another state (optional)
- `action` - Execute a function (optional)

You can use one or both!

## Examples

### Example 1: Pure Navigation

```javascript
{
  text: 'You are at a crossroads',
  choices: [
    { text: 'Go left', nextState: 'left' },
    { text: 'Go right', nextState: 'right' }
  ]
}
```

### Example 2: Execute Code

```javascript
{
  text: 'You see a button',
  choices: [
    { text: 'Press it', action: 'pressButton' }
  ]
}

// In actions:
actions: {
  pressButton: (engine) => {
    const count = engine.getData('presses') || 0;
    engine.setData('presses', count + 1);
    return `You pressed the button ${count + 1} times!`;
  }
}
```

### Example 3: Both (Execute Code + Navigate)

```javascript
{
  text: 'You find a treasure chest',
  choices: [
    { 
      text: 'Open it', 
      action: 'getTreasure',
      nextState: 'afterChest'
    }
  ]
}

// In actions:
actions: {
  getTreasure: (engine) => {
    engine.setData('gold', (engine.getData('gold') || 0) + 100);
    return 'You got 100 gold!';
  }
}
```

## Storing Data

Use `engine.setData()` and `engine.getData()` to store anything:

```javascript
actions: {
  myAction: (engine) => {
    // Store data
    engine.setData('inventory', ['sword', 'shield']);
    engine.setData('health', 100);
    engine.setData('anyObject', { foo: 'bar' });
    
    // Get data
    const health = engine.getData('health');
    
    return `Health: ${health}`;
  }
}
```

## What You Can Build

- Choose-your-own-adventure stories
- RPG dialogue systems
- Interactive fiction
- Educational games
- Puzzles
- Dating sims
- Mystery games
- Anything with choices!

## Current State

🚧 **Not integrated into the main site** - This is standalone boilerplate ready for customization.
