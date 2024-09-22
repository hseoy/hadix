import {
  EventDefinition,
  EventListener,
  EventName,
} from '@/core/event-system/types';
import { EventSystem } from '@/core/event-system';

export interface EventBindingDefinition {
  eventName: string;
  actionId: string;
}
export interface ComponentDefinition {
  id: string;
  type: string;
  key?: string;
  children?: ComponentDefinition[];
  props?: Record<string, unknown>;
  events?: EventBindingDefinition[];
}

export interface UIComponent {
  id: string;
  type: string;
  key: string;
  getKey(): string;

  getRoot(): UIComponent;
  getParent(): UIComponent | undefined;
  setParent(parent: UIComponent | undefined): void;

  getChildren(): UIComponent[];
  addChild(child: UIComponent): void;
  removeChild(child: UIComponent): void;

  addEventListener(eventName: string, handler: EventListener): void;
  removeEventListener(eventName: string, handler: EventListener): void;
  dispatchEvent(event: EventDefinition): boolean;
  emit(eventName: EventName, options?: Partial<EventDefinition>): void;

  update(state: Record<string, unknown>): void;

  setState(newState: Partial<Record<string, unknown>>): void;
  getState(): Record<string, unknown>;
  setStateChangeCallback(callback: () => void): void;

  render(): JSX.Element;
}

export type ComponentConstructor = new (
  id: string,
  eventSystem: EventSystem,
) => UIComponent;
