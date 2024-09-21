import { EventSystem } from '@/core/event-system';
import {
  ComponentConstructor,
  UIComponent,
} from '@/core/component-system/types';

export class ComponentRegistry {
  private components: Map<string, ComponentConstructor> = new Map();

  register(type: string, componentConstructor: ComponentConstructor): void {
    if (this.components.has(type)) {
      console.warn(
        `Component type '${type}' is already registered. It will be overwritten.`,
      );
    }
    this.components.set(type, componentConstructor);
  }

  get(type: string): ComponentConstructor | undefined {
    return this.components.get(type);
  }

  create(type: string, id: string, eventSystem: EventSystem): UIComponent {
    const Constructor = this.get(type);
    if (!Constructor) {
      throw new Error(`No component registered for type '${type}'`);
    }
    return new Constructor(id, eventSystem);
  }

  getRegisteredTypes(): string[] {
    return Array.from(this.components.keys());
  }

  isRegistered(type: string): boolean {
    return this.components.has(type);
  }
}
