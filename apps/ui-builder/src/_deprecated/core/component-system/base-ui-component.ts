import { EventSystem } from '@/_deprecated/core/event-system';
import {
  EventDefinition,
  EventListener,
  EventName,
} from '@/_deprecated/core/event-system/types';
import { UIComponent } from '@/_deprecated/core/component-system/types';
import { nanoid } from 'nanoid';

export abstract class BaseUIComponent implements UIComponent {
  _id: string;
  id: string;
  type: string;
  key: string;

  // CSS Properties
  margin?: React.CSSProperties['margin'];
  padding?: React.CSSProperties['padding'];
  border?: React.CSSProperties['border'];
  borderRadius?: React.CSSProperties['borderRadius'];
  backgroundColor?: React.CSSProperties['backgroundColor'];
  color?: React.CSSProperties['color'];
  fontSize?: React.CSSProperties['fontSize'];
  fontWeight?: React.CSSProperties['fontWeight'];
  textAlign?: React.CSSProperties['textAlign'];
  width?: React.CSSProperties['width'];
  height?: React.CSSProperties['height'];
  display?: React.CSSProperties['display'];
  position?: React.CSSProperties['position'];
  top?: React.CSSProperties['top'];
  left?: React.CSSProperties['left'];
  right?: React.CSSProperties['right'];
  bottom?: React.CSSProperties['bottom'];
  zIndex?: React.CSSProperties['zIndex'];
  opacity?: React.CSSProperties['opacity'];
  overflow?: React.CSSProperties['overflow'];
  cursor?: React.CSSProperties['cursor'];
  pointerEvents?: React.CSSProperties['pointerEvents'];
  visibility?: React.CSSProperties['visibility'];
  flex?: React.CSSProperties['flex'];
  flexDirection?: React.CSSProperties['flexDirection'];
  flexWrap?: React.CSSProperties['flexWrap'];
  justifyContent?: React.CSSProperties['justifyContent'];
  alignItems?: React.CSSProperties['alignItems'];
  alignContent?: React.CSSProperties['alignContent'];
  order?: React.CSSProperties['order'];
  flexGrow?: React.CSSProperties['flexGrow'];
  flexShrink?: React.CSSProperties['flexShrink'];
  flexBasis?: React.CSSProperties['flexBasis'];
  alignSelf?: React.CSSProperties['alignSelf'];
  transform?: React.CSSProperties['transform'];
  transition?: React.CSSProperties['transition'];
  animation?: React.CSSProperties['animation'];

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
    this._id = nanoid();
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

  protected getCSSProperties(): React.CSSProperties {
    return {
      margin: this.margin,
      padding: this.padding,
      border: this.border,
      borderRadius: this.borderRadius,
      backgroundColor: this.backgroundColor,
      color: this.color,
      fontSize: this.fontSize,
      fontWeight: this.fontWeight,
      textAlign: this.textAlign,
      width: this.width,
      height: this.height,
      display: this.display,
      position: this.position,
      top: this.top,
      left: this.left,
      right: this.right,
      bottom: this.bottom,
      zIndex: this.zIndex,
      opacity: this.opacity,
      overflow: this.overflow,
      cursor: this.cursor,
      pointerEvents: this.pointerEvents,
      visibility: this.visibility,
      flex: this.flex,
      flexDirection: this.flexDirection,
      flexWrap: this.flexWrap,
      justifyContent: this.justifyContent,
      alignItems: this.alignItems,
      alignContent: this.alignContent,
      order: this.order,
      flexGrow: this.flexGrow,
      flexShrink: this.flexShrink,
      flexBasis: this.flexBasis,
      alignSelf: this.alignSelf,
      transform: this.transform,
      transition: this.transition,
      animation: this.animation,
    };
  }

  abstract render(): JSX.Element;
}
