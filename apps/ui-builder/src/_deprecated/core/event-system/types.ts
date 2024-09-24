import { UIComponent } from '@/_deprecated/core/component-system/types';

export interface EventDefinition {
  type: string;
  target: UIComponent;
  currentTarget: UIComponent;
  bubbles: boolean;
  cancelable: boolean;
  defaultPrevented: boolean;
  propagationStopped: boolean;
  eventPhase: 'capture' | 'target' | 'bubble';
  preventDefault(): void;
  stopPropagation(): void;
  value?: string | number | boolean | object | null;
}

export type EventName = string;
export type EventListener = (event: EventDefinition) => void;
