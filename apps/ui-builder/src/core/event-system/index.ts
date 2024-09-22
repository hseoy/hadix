import {
  EventDefinition,
  EventName,
  EventListener,
} from '@/core/event-system/types';
import { UIComponent } from '@/core/component-system/types';

// EventSystem.ts
export class EventSystem {
  private listeners: Map<UIComponent, Map<EventName, Set<EventListener>>> =
    new Map();

  addEventListener(
    component: UIComponent,
    eventType: string,
    listener: EventListener,
  ): void {
    const componentListeners = this.listeners.get(component) || new Map();
    if (!this.listeners.has(component)) {
      this.listeners.set(component, componentListeners);
    }
    const targetEventTypeListeners =
      componentListeners.get(eventType) || new Set();
    if (!componentListeners.has(eventType)) {
      componentListeners.set(eventType, targetEventTypeListeners);
    }
    targetEventTypeListeners.add(listener);
  }

  removeEventListener(
    component: UIComponent,
    type: string,
    listener: EventListener,
  ): void {
    const componentListeners = this.listeners.get(component);
    if (componentListeners) {
      const typeListeners = componentListeners.get(type);
      if (typeListeners) {
        typeListeners.delete(listener);
      }
    }
  }

  dispatchEvent(originalEvent: EventDefinition): boolean {
    let target: UIComponent | undefined = originalEvent.target;
    const path: UIComponent[] = [];

    // 캡처 단계를 위한 경로 구성
    while (target) {
      path.unshift(target);
      target = target.getParent();
    }

    const event: EventDefinition = {
      ...originalEvent,
      currentTarget: originalEvent.target,
      eventPhase: 'capture',
      propagationStopped: false,
      defaultPrevented: false,
      preventDefault: function () {
        if (this.cancelable) {
          this.defaultPrevented = true;
        }
      },
      stopPropagation: function () {
        this.propagationStopped = true;
      },
    };

    // 캡처 단계
    event.eventPhase = 'capture';
    for (let i = 0; i < path.length - 1; i++) {
      if (event.propagationStopped) break;
      event.currentTarget = path[i];
      this.invokeListeners(path[i], event);
    }

    // 타겟 단계
    if (!event.propagationStopped) {
      event.eventPhase = 'target';
      event.currentTarget = event.target;
      this.invokeListeners(event.target, event);
    }

    // 버블링 단계
    if (event.bubbles && !event.propagationStopped) {
      event.eventPhase = 'bubble';
      for (let i = path.length - 2; i >= 0; i--) {
        if (event.propagationStopped) break;
        event.currentTarget = path[i];
        this.invokeListeners(path[i], event);
      }
    }

    return !event.defaultPrevented;
  }

  private invokeListeners(
    component: UIComponent,
    event: EventDefinition,
  ): void {
    const componentListeners = this.listeners.get(component);
    if (componentListeners) {
      const typeListeners = componentListeners.get(event.type);
      if (typeListeners) {
        const listeners = Array.from(typeListeners);
        for (const listener of listeners) {
          if (event.propagationStopped) break;
          // Event Copy
          const copiedEvent = Object.assign({}, event);
          listener(copiedEvent);
        }
      }
    }
  }
}
