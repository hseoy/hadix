import { EventDefinition, EventListener } from '@/core/event-system/types';
import { EventSystem } from '@/core/event-system';

export interface UIComponent {
  id: string;
  type: string;
  key: string;
  getKey(): string;
  getParent(): UIComponent | undefined;
  setParent(parent: UIComponent | undefined): void;
  getChildren(): UIComponent[];
  addChild(child: UIComponent): void;
  removeChild(child: UIComponent): void;
  getRoot(): UIComponent;
  addEventListener(eventName: string, handler: EventListener): void;
  removeEventListener(eventName: string, handler: EventListener): void;
  dispatchEvent(event: EventDefinition): boolean;
  update(state: Record<string, unknown>): void;
  render(): JSX.Element;
}

export type ComponentConstructor = new (
  id: string,
  eventSystem: EventSystem,
) => UIComponent;
