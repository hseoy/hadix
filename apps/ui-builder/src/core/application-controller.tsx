import ReactDOM from 'react-dom';
import { ActionRegistry } from './action-system/action-registry';
import { ComponentRegistry } from './component-system/component-registry';
import { UIComponent } from './component-system/types';
import { EventSystem } from './event-system';
import { StateManager } from './state-system/state-manager';
import { BaseUIComponent } from './component-system/base-ui-component';
import React from 'react';
import { createRoot, Root } from 'react-dom/client';

export class ApplicationController {
  private componentsMap: Record<string, UIComponent>;
  private root: Root | null = null;

  constructor(
    private rootElement: HTMLElement,
    private eventSystem: EventSystem,
    private actionRegistry: ActionRegistry,
    private stateManager: StateManager,
    private rootComponent: UIComponent,
    private componentRegistry: ComponentRegistry,
  ) {
    this.componentsMap = this.buildComponentsMap(rootComponent);
    this.initializeEventListeners();
  }

  private initializeComponents(component: BaseUIComponent): void {
    component.setStateChangeCallback(() => this.rerender());
    // 자식 컴포넌트들에 대해서도 재귀적으로 호출
    if ('getChildren' in component) {
      (component as any).getChildren().forEach((child: BaseUIComponent) => {
        this.initializeComponents(child);
      });
    }
  }

  rerender(): void {
    if (this.root) {
      this.root.render(
        React.createElement(
          React.StrictMode,
          null,
          this.rootComponent.render(),
        ),
      );
    } else {
      console.warn('Application not initialized. Call initialize() first.');
    }
  }

  private buildComponentsMap(root: UIComponent): Record<string, UIComponent> {
    const map: Record<string, UIComponent> = {};
    const traverse = (component: UIComponent) => {
      map[component.id] = component;
      component.getChildren().forEach(traverse);
    };
    traverse(root);
    return map;
  }

  private initializeEventListeners(): void {
    this.stateManager.addListener(() => this.updateUI());
    // 여기에 필요한 글로벌 이벤트 리스너를 추가할 수 있습니다.
  }

  updateUI(): void {
    this.updateComponent(this.rootComponent);
    this.rerender();
  }

  private updateComponent(component: UIComponent): void {
    component.update(this.stateManager.getState());
    component.getChildren().forEach(child => this.updateComponent(child));
  }

  getComponent(id: string): UIComponent | undefined {
    return this.componentsMap[id];
  }

  executeAction(actionId: string, event: any): void {
    const context = {
      $event: event,
      $state: this.stateManager,
      $components: this.componentsMap,
    };
    this.actionRegistry.executeAction(actionId, context);
  }

  setState(updates: Record<string, any>): void {
    this.stateManager.setState(updates);
  }

  getState(): Record<string, any> {
    return this.stateManager.getState();
  }

  registerComponent(
    type: string,
    componentConstructor: new (
      id: string,
      eventSystem: EventSystem,
    ) => UIComponent,
  ): void {
    this.componentRegistry.register(type, componentConstructor);
  }

  createComponent(type: string, id: string): UIComponent {
    const component = this.componentRegistry.create(type, id, this.eventSystem);
    this.componentsMap[id] = component;
    return component;
  }

  removeComponent(id: string): void {
    const component = this.componentsMap[id];
    if (component) {
      const parent = component.getParent();
      if (parent) {
        parent.removeChild(component);
      }
      delete this.componentsMap[id];
    }
  }

  // 이벤트 시스템 관련 메서드
  addEventListener(
    componentId: string,
    eventName: string,
    handler: (event: any) => void,
  ): void {
    const component = this.getComponent(componentId);
    if (component) {
      component.addEventListener(eventName, handler);
    } else {
      console.warn(`Component with id ${componentId} not found`);
    }
  }

  removeEventListener(
    componentId: string,
    eventName: string,
    handler: (event: any) => void,
  ): void {
    const component = this.getComponent(componentId);
    if (component) {
      component.removeEventListener(eventName, handler);
    } else {
      console.warn(`Component with id ${componentId} not found`);
    }
  }

  // 애플리케이션 라이프사이클 메서드
  initialize(): void {
    if (this.rootElement) {
      this.root = createRoot(this.rootElement);
      this.rerender();
    } else {
      console.error('Root element not found');
    }
  }

  destroy(): void {
    // 정리 작업 수행
    this.root?.unmount();
    this.root = null;
    // 추가적인 정리 작업 (이벤트 리스너 제거, 타이머 해제 등)
  }
}
