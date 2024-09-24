type StateListener = (state: Record<string, unknown>) => void;

export class StateManager {
  private state: Record<string, unknown> = {};
  private listeners: Set<StateListener> = new Set();

  getState(): Record<string, unknown> {
    return { ...this.state };
  }

  setState(updates: Record<string, unknown>): void {
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
