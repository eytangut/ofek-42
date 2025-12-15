/**
 * Minimal Text Adventure Game Engine
 * Supports state transitions and code execution
 */

export class GameEngine {
  constructor(gameData) {
    this.gameData = gameData;
    this.currentState = gameData.startingState;
    this.history = [];
    this.customData = {};
  }

  getCurrentState() {
    return this.gameData.states[this.currentState];
  }

  getText() {
    const state = this.getCurrentState();
    return state.text;
  }

  getChoices() {
    const state = this.getCurrentState();
    return state.choices || [];
  }

  /**
   * Execute a choice - can do state transition and/or run code
   */
  makeChoice(choice) {
    this.history.push({
      state: this.currentState,
      choice: choice
    });
    
    let actionResult = null;
    
    // Execute action if specified
    if (choice.action) {
      const actionFn = this.gameData.actions[choice.action];
      if (actionFn) {
        actionResult = actionFn(this);
      }
    }
    
    // Transition to new state if specified
    if (choice.nextState) {
      this.currentState = choice.nextState;
    }
    
    return {
      text: this.getText(),
      choices: this.getChoices(),
      actionResult: actionResult
    };
  }

  reset() {
    this.currentState = this.gameData.startingState;
    this.history = [];
    this.customData = {};
  }

  setData(key, value) {
    this.customData[key] = value;
  }

  getData(key) {
    return this.customData[key];
  }
}
