import { EventSystem } from '@/core/event-system';
import {
  EventDefinition,
  EventListener,
  EventName,
} from '@/core/event-system/types';
import { UIComponent } from '@/core/component-system/types';

export abstract class BaseUIComponent implements UIComponent {
  id: string;
  type: string;
  key: string;

  protected state: Record<string, unknown> = {};
  private stateChangeCallback?: () => void;

  protected parent?: UIComponent;
  protected children: UIComponent[] = [];
  private eventSystem: EventSystem;

  constructor(
    id: string,
    type: string,
    eventSystem: EventSystem,
    key?: string,
  ) {
    this.id = id;
    this.type = type;
    this.eventSystem = eventSystem;
    this.key = key || id;
  }

  getKey(): string {
    return this.key;
  }

  getRoot(): UIComponent {
    let current: UIComponent = this;
    while (current.getParent()) {
      const parent = current.getParent();
      if (!parent) break;
      current = parent;
    }
    return current;
  }

  getParent(): UIComponent | undefined {
    return this.parent;
  }

  setParent(parent: UIComponent | undefined): void {
    this.parent = parent;
  }

  getChildren(): UIComponent[] {
    return [...this.children];
  }

  addChild(child: UIComponent): void {
    this.children.push(child);
    child.setParent(this);
  }

  removeChild(child: UIComponent): void {
    const index = this.children.indexOf(child);
    if (index !== -1) {
      this.children.splice(index, 1);
      child.setParent(undefined);
    }
  }

  addEventListener(eventName: string, handler: EventListener): void {
    this.eventSystem.addEventListener(this, eventName, handler);
  }

  removeEventListener(eventName: string, handler: EventListener): void {
    this.eventSystem.removeEventListener(this, eventName, handler);
  }

  dispatchEvent(event: EventDefinition): boolean {
    return this.eventSystem.dispatchEvent(event);
  }

  emit(eventName: EventName, options?: Partial<EventDefinition>) {
    const eventDefinition: EventDefinition = {
      type: eventName,
      target: this,
      currentTarget: this,
      bubbles: true,
      cancelable: true,
      defaultPrevented: false,
      propagationStopped: false,
      eventPhase: 'target',
      preventDefault: () => ({}),
      stopPropagation: () => ({}),
      ...(options || {}),
    };
    this.dispatchEvent(eventDefinition);
  }

  update(newState: Record<string, unknown>): void {
    let stateChanged = false;
    for (const key in newState) {
      if (this.state[key] !== newState[key]) {
        this.state[key] = newState[key];
        stateChanged = true;
      }
    }
    if (stateChanged && this.stateChangeCallback) {
      this.stateChangeCallback();
    }
  }

  setState(newState: Partial<typeof this.state>): void {
    this.update(newState);
  }

  getState(): typeof this.state {
    return { ...this.state };
  }

  setStateChangeCallback(callback: () => void): void {
    this.stateChangeCallback = callback;
  }

  abstract render(): JSX.Element;
}
