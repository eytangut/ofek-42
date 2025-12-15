# Text Adventure Game

A multiple-choice based text adventure game built with React.

## Features

- **Multiple Choice Interface**: Players interact by clicking on available choices, not typing commands
- **Room-based Navigation**: Explore different rooms with unique descriptions
- **Inventory System**: Collect and examine items
- **Locked Doors**: Find keys to unlock new areas
- **Visual Feedback**: Color-coded choices for different action types

## Architecture

### Files

- `gameData.js` - Game world data (rooms, items, descriptions)
- `gameEngine.js` - Core game logic and state management
- `TextAdventure.jsx` - Main React component with UI
- `TextAdventureDemo.jsx` - Standalone demo page
- `index.js` - Module exports

### Game Engine

The `GameEngine` class manages:
- Current room and navigation
- Player inventory
- Room unlock states
- Available choices based on game state
- Action execution

### Choice Types

- **Move** (🚪) - Navigate between rooms
- **Take** (✋) - Pick up items
- **Examine** (🔍) - Look at items closely
- **Look** (👀) - Survey the current room
- **Inventory** (🎒) - Check what you're carrying

## Usage

### As a Standalone Component

```jsx
import { TextAdventure } from './textAdventure';

function App() {
  return <TextAdventure />;
}
```

### Customizing Game Data

Edit `gameData.js` to add:
- New rooms with descriptions and exits
- New items with properties
- Different starting locations
- More complex room connections

### Extending the Game Engine

The `GameEngine` class can be extended to add:
- NPCs and dialogue
- Combat systems
- Puzzles and mini-games
- Save/load functionality
- Achievement tracking

## Current State

🚧 **This game is currently in development and not integrated into the main site.**

The boilerplate code is complete and functional, but it is kept separate from the main application until ready for deployment.

## Testing

To test the game locally, you can temporarily import it in your main app or create a test route for it.

## Future Enhancements

- More rooms and items
- Story progression and endings
- Character stats and attributes
- Quest system
- Sound effects and music
- Save/load game state
- Multiple storylines
