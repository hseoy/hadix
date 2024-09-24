import { ActionRegistry } from '@/_deprecated/core/action-system/action-registry';
import {
  ActionCallback,
  ActionDefinition,
} from '@/_deprecated/core/action-system/types';
import { EventSystem } from '@/_deprecated/core/event-system';
import { ComponentRegistry } from '@/_deprecated/core/component-system/component-registry';
import {
  ComponentDefinition,
  EventBindingDefinition,
  UIComponent,
} from '@/_deprecated/core/component-system/types';
import { StateManager } from '@/_deprecated/core/state-system/state-manager';
import { ComponentConstructor } from '@/_deprecated/core/component-system/types';
import { ApplicationController } from './application-controller';
import { HadixApplicationConfig } from './application-config';

export class ApplicationBuilder {
  private eventSystem: EventSystem;
  private actionRegistry: ActionRegistry;
  private stateManager: StateManager;
  private componentRegistry: ComponentRegistry;
  private appConfig: HadixApplicationConfig;

  constructor(private rootElement: HTMLElement) {
    this.eventSystem = new EventSystem();
    this.actionRegistry = new ActionRegistry();
    this.stateManager = new StateManager();
    this.componentRegistry = new ComponentRegistry();
    this.appConfig = new HadixApplicationConfig();
  }

  loadConfig(jsonConfig: string | HadixApplicationConfig): ApplicationBuilder {
    if (typeof jsonConfig === 'string') {
      this.appConfig.loadFromJSON(jsonConfig);
    } else {
      this.appConfig = jsonConfig;
    }
    return this;
  }

  registerComponent(
    type: string,
    componentConstructor: ComponentConstructor,
  ): ApplicationBuilder {
    this.componentRegistry.register(type, componentConstructor);
    return this;
  }
  registerActions(actions: ActionDefinition[]): ApplicationBuilder {
    actions.forEach(action => this.actionRegistry.register(action));
    return this;
  }

  registerAction(
    actionId: string,
    callback: ActionCallback,
  ): ApplicationBuilder {
    this.actionRegistry.register({ id: actionId, type: 'callback', callback });
    return this;
  }

  setInitialState(state: Record<string, unknown>): ApplicationBuilder {
    this.stateManager.setState(state);
    return this;
  }

  build(): ApplicationController {
    if (!this.appConfig.layout) {
      throw new Error(
        'Application configuration not loaded. Call loadConfig() first.',
      );
    }

    this.registerActions(this.appConfig.actions || []);
    const rootComponent = this.buildComponentTree(this.appConfig.layout);

    return new ApplicationController(
      this.rootElement,
      this.eventSystem,
      this.actionRegistry,
      this.stateManager,
      rootComponent,
      this.componentRegistry,
    );
  }

  private buildComponentTree(
    config: ComponentDefinition,
    parent?: UIComponent,
  ): UIComponent {
    const componentClass = this.componentRegistry.get(config.type);
    if (!componentClass) {
      throw new Error(`Unknown component type: ${config.type}`);
    }

    const component = new componentClass(config.id, this.eventSystem);

    // Set properties
    Object.assign(component, config.props);

    if (parent) {
      parent.addChild(component);
    }

    // Set up event listeners
    config.events?.forEach((eventConfig: EventBindingDefinition) => {
      component.addEventListener(eventConfig.eventName, event => {
        this.actionRegistry.executeAction(eventConfig.actionId, {
          $event: event,
          $state: this.stateManager,
          $components: this.getComponentsMap(component.getRoot()),
        });
      });
    });

    // Recursively build children
    config.children?.forEach((childConfig: ComponentDefinition) => {
      this.buildComponentTree(childConfig, component);
    });

    return component;
  }

  private getComponentsMap(root: UIComponent): Record<string, UIComponent> {
    const map: Record<string, UIComponent> = {};
    const traverse = (component: UIComponent) => {
      map[component.id] = component;
      component.getChildren().forEach(traverse);
    };
    traverse(root);
    return map;
  }
}
