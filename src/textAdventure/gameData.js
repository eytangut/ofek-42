/**
 * Text Adventure Game Data - Multiple Choice System
 * This file contains the game world data with choice-based interactions
 */

export const gameData = {
  rooms: {
    start: {
      id: 'start',
      name: 'Starting Room',
      description: 'You are in a dimly lit room. There are doors to the north and east. You notice a rusty key on a small table.',
      exits: {
        north: 'hallway',
        east: 'library'
      },
      items: ['key'],
      visited: false
    },
    hallway: {
      id: 'hallway',
      name: 'Long Hallway',
      description: 'A long hallway stretches before you with flickering torches on the walls. You can go south back to where you came from, or west to a mysterious door.',
      exits: {
        south: 'start',
        west: 'treasury'
      },
      items: [],
      visited: false
    },
    library: {
      id: 'library',
      name: 'Ancient Library',
      description: 'Towering bookshelves surround you, filled with ancient tomes. Dust particles dance in the air. There is an old book on a pedestal and a candle burning nearby.',
      exits: {
        west: 'start'
      },
      items: ['book', 'candle'],
      visited: false
    },
    treasury: {
      id: 'treasury',
      name: 'Treasury Room',
      description: 'A magnificent room filled with treasures! Gold coins sparkle in piles, and a silver sword rests on a velvet cushion.',
      exits: {
        east: 'hallway'
      },
      items: ['gold', 'sword'],
      locked: true,
      visited: false
    }
  },
  items: {
    key: {
      id: 'key',
      name: 'Rusty Key',
      description: 'An old rusty key that might open something.',
      takeable: true
    },
    book: {
      id: 'book',
      name: 'Ancient Book',
      description: 'A leather-bound book with mysterious writing. It seems to contain ancient knowledge.',
      takeable: true
    },
    candle: {
      id: 'candle',
      name: 'Candle',
      description: 'A half-melted candle that provides some light.',
      takeable: true
    },
    gold: {
      id: 'gold',
      name: 'Gold Coins',
      description: 'A pouch of shining gold coins. You feel richer already!',
      takeable: true
    },
    sword: {
      id: 'sword',
      name: 'Silver Sword',
      description: 'A beautifully crafted silver sword with intricate engravings.',
      takeable: true
    }
  },
  startingRoom: 'start'
};
