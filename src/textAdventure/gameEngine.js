/**
 * Text Adventure Game Engine - Multiple Choice System
 * Core game logic and state management with choice-based interactions
 */

export class GameEngine {
  constructor(gameData) {
    this.gameData = gameData;
    this.currentRoom = gameData.startingRoom;
    this.inventory = [];
    this.gameHistory = [];
    this.unlockedRooms = new Set();
  }

  getCurrentRoom() {
    return this.gameData.rooms[this.currentRoom];
  }

  getRoomDescription() {
    const room = this.getCurrentRoom();
    let description = room.description;
    
    if (room.items && room.items.length > 0) {
      const itemNames = room.items.map(itemId => this.gameData.items[itemId].name);
      description += `\n\nYou can see: ${itemNames.join(', ')}`;
    }
    
    return description;
  }

  /**
   * Get available choices for the current game state
   * Returns an array of choice objects with id, text, and type
   */
  getAvailableChoices() {
    const choices = [];
    const room = this.getCurrentRoom();
    
    // Movement choices
    Object.keys(room.exits).forEach(direction => {
      const nextRoomId = room.exits[direction];
      const nextRoom = this.gameData.rooms[nextRoomId];
      
      // Check if room is locked
      if (nextRoom.locked && !this.unlockedRooms.has(nextRoomId)) {
        choices.push({
          id: `move_${direction}`,
          text: `Try to go ${direction} (door is locked)`,
          type: 'move',
          direction: direction,
          locked: true
        });
      } else {
        choices.push({
          id: `move_${direction}`,
          text: `Go ${direction}`,
          type: 'move',
          direction: direction,
          locked: false
        });
      }
    });
    
    // Item interaction choices
    room.items.forEach(itemId => {
      const item = this.gameData.items[itemId];
      
      // Examine choice
      choices.push({
        id: `examine_${itemId}`,
        text: `Examine ${item.name}`,
        type: 'examine',
        itemId: itemId
      });
      
      // Take choice
      if (item.takeable) {
        choices.push({
          id: `take_${itemId}`,
          text: `Take ${item.name}`,
          type: 'take',
          itemId: itemId
        });
      }
    });
    
    // Inventory choices
    this.inventory.forEach(itemId => {
      const item = this.gameData.items[itemId];
      choices.push({
        id: `examine_inv_${itemId}`,
        text: `Examine ${item.name} (in inventory)`,
        type: 'examine',
        itemId: itemId
      });
    });
    
    // Always available choices
    choices.push({
      id: 'look',
      text: 'Look around',
      type: 'look'
    });
    
    if (this.inventory.length > 0) {
      choices.push({
        id: 'inventory',
        text: 'Check inventory',
        type: 'inventory'
      });
    }
    
    return choices;
  }

  /**
   * Execute a choice and return the result
   */
  executeChoice(choice) {
    switch (choice.type) {
      case 'move':
        return this.move(choice.direction);
      case 'take':
        return this.take(choice.itemId);
      case 'examine':
        return this.examine(choice.itemId);
      case 'look':
        return this.look();
      case 'inventory':
        return this.showInventory();
      default:
        return { success: false, message: 'Unknown action.' };
    }
  }

  move(direction) {
    const room = this.getCurrentRoom();
    const nextRoomId = room.exits[direction];
    const nextRoom = this.gameData.rooms[nextRoomId];
    
    // Check if room is locked
    if (nextRoom.locked && !this.unlockedRooms.has(nextRoomId)) {
      // Check if player has key
      if (this.inventory.includes('key')) {
        this.unlockedRooms.add(nextRoomId);
        this.currentRoom = nextRoomId;
        nextRoom.visited = true;
        return { 
          success: true, 
          message: 'You use the rusty key to unlock the door. It opens with a loud creak!\n\n' + this.getRoomDescription(),
          roomChanged: true
        };
      } else {
        return { success: false, message: 'The door is locked. You need a key to open it.' };
      }
    }
    
    this.currentRoom = nextRoomId;
    nextRoom.visited = true;
    return { 
      success: true, 
      message: this.getRoomDescription(),
      roomChanged: true
    };
  }

  take(itemId) {
    const room = this.getCurrentRoom();
    
    if (!room.items.includes(itemId)) {
      return { success: false, message: `There is no ${itemId} here.` };
    }
    
    const item = this.gameData.items[itemId];
    
    room.items = room.items.filter(id => id !== itemId);
    this.inventory.push(itemId);
    
    return { success: true, message: `You take the ${item.name} and put it in your inventory.` };
  }

  examine(itemId) {
    // Check inventory first
    if (this.inventory.includes(itemId)) {
      const item = this.gameData.items[itemId];
      return { success: true, message: item.description };
    }
    
    // Check current room
    const room = this.getCurrentRoom();
    if (room.items.includes(itemId)) {
      const item = this.gameData.items[itemId];
      return { success: true, message: item.description };
    }
    
    return { success: false, message: `You don't see a ${itemId} here.` };
  }

  showInventory() {
    if (this.inventory.length === 0) {
      return { success: true, message: 'Your inventory is empty.' };
    }
    
    const itemNames = this.inventory.map(itemId => this.gameData.items[itemId].name);
    return { 
      success: true, 
      message: `You are carrying: ${itemNames.join(', ')}` 
    };
  }

  look() {
    return { success: true, message: this.getRoomDescription() };
  }

  reset() {
    this.currentRoom = this.gameData.startingRoom;
    this.inventory = [];
    this.gameHistory = [];
    this.unlockedRooms.clear();
    
    // Reset visited flags
    Object.values(this.gameData.rooms).forEach(room => {
      room.visited = false;
    });
  }

  getGameState() {
    return {
      currentRoom: this.currentRoom,
      roomName: this.getCurrentRoom().name,
      inventory: this.inventory,
      inventoryCount: this.inventory.length
    };
  }
}
