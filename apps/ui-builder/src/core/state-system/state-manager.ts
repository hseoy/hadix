type StateListener = (state: Record<string, any>) => void;

export class StateManager {
  private state: Record<string, any> = {};
  private listeners: Set<StateListener> = new Set();

  getState(): Record<string, any> {
    return { ...this.state };
  }

  setState(updates: Record<string, any>): void {
    this.state = { ...this.state, ...updates };
    this.notifyListeners();
  }

  addListener(listener: StateListener): void {
    this.listeners.add(listener);
  }

  removeListener(listener: StateListener): void {
    this.listeners.delete(listener);
  }

  private notifyListeners(): void {
    const currentState = this.getState();
    this.listeners.forEach(listener => listener(currentState));
  }
}
