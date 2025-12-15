# Text Adventure - Minimal Boilerplate

A bare-bones, multiple-choice text adventure framework. No assumptions about game mechanics - just a state machine with text and choices.

## What This Is

This is the **absolute minimum** needed for a choice-based text adventure:
- States with text
- Choices that lead to other states
- Simple UI to display and interact

**No built-in assumptions about:**
- Inventory
- Rooms/locations
- Items
- Combat
- Stats
- Anything else

You can build whatever weird game mechanics you want on top of this!

## Files

- `gameData.js` - Your game content (states and choices)
- `gameEngine.js` - Minimal state machine (~60 lines)
- `TextAdventure.jsx` - Simple React UI
- `index.js` - Module exports

## How It Works

The game is just a **state machine**:

```javascript
{
  startingState: 'start',
  states: {
    start: {
      text: 'Some text here',
      choices: [
        { id: 'choice1', text: 'Do something', nextState: 'somewhere' }
      ]
    }
  }
}
```

Each choice leads to a new state. That's it!

## Usage

### Basic Setup

```jsx
import { TextAdventure } from './textAdventure';

function App() {
  return <TextAdventure />;
}
```

### Customize Your Game

Edit `gameData.js` to create your story. Just add states and choices.

### Add Custom Mechanics

The engine has `customData` for storing anything:

```javascript
// In your choice handler or extended engine:
gameEngine.setData('health', 100);
gameEngine.setData('hasKey', true);
const health = gameEngine.getData('health');
```

### Extend the Engine

Want inventory? Combat? Stats? Add them yourself:

```javascript
class MyGameEngine extends GameEngine {
  constructor(gameData) {
    super(gameData);
    this.inventory = [];
    this.stats = { health: 100 };
  }
  
  // Add your methods here
}
```

### Dynamic Choices

You can generate choices programmatically:

```javascript
// In gameData.js, use a function to return choices based on game state
states: {
  shop: {
    text: 'Welcome to the shop',
    choices: (engine) => {
      const hasGold = engine.getData('gold') > 0;
      return hasGold 
        ? [{ id: 'buy', text: 'Buy something', nextState: 'bought' }]
        : [{ id: 'leave', text: 'Leave', nextState: 'outside' }];
    }
  }
}
```

## Examples of What You Can Build

- Choose-your-own-adventure stories
- Puzzle games
- Dialogue systems
- Interactive fiction
- Dating sims
- RPG conversations
- Mystery games
- Horror games
- Comedy adventures
- Educational content
- Literally anything with choices

## Current State

🚧 **Not integrated into the main site** - This is standalone boilerplate code ready for you to customize and deploy when ready.
