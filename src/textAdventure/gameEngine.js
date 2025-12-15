/**
 * Minimal Text Adventure Game Engine
 * Bare-bones state machine for choice-based games
 */

export class GameEngine {
  constructor(gameData) {
    this.gameData = gameData;
    this.currentState = gameData.startingState;
    this.history = [];
    // Store any custom data you want
    this.customData = {};
  }

  /**
   * Get the current state object
   */
  getCurrentState() {
    return this.gameData.states[this.currentState];
  }

  /**
   * Get the text for the current state
   */
  getText() {
    const state = this.getCurrentState();
    return state.text;
  }

  /**
   * Get available choices for current state
   */
  getChoices() {
    const state = this.getCurrentState();
    return state.choices || [];
  }

  /**
   * Execute a choice - transitions to a new state
   */
  makeChoice(choice) {
    this.history.push({
      state: this.currentState,
      choice: choice
    });
    
    this.currentState = choice.nextState;
    
    return {
      text: this.getText(),
      choices: this.getChoices()
    };
  }

  /**
   * Reset game to starting state
   */
  reset() {
    this.currentState = this.gameData.startingState;
    this.history = [];
    this.customData = {};
  }

  /**
   * Get/set custom data for your game mechanics
   */
  setData(key, value) {
    this.customData[key] = value;
  }

  getData(key) {
    return this.customData[key];
  }
}
