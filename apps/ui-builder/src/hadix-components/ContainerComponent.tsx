import React from 'react';
import { BaseUIComponent } from '@/core/component-system/base-ui-component';
import { EventSystem } from '@/core/event-system';

export class ContainerComponent extends BaseUIComponent {
  layout: 'vertical' | 'horizontal' | 'grid';

  constructor(id: string, eventSystem: EventSystem) {
    super(id, 'Container', eventSystem);
    this.layout = 'vertical';
  }

  private getLayoutStyle(): React.CSSProperties {
    if (this.layout === 'vertical') {
      return { display: 'flex', flexDirection: 'column' };
    } else if (this.layout === 'horizontal') {
      return { display: 'flex', flexDirection: 'row' };
    } else if (this.layout === 'grid') {
      return { display: 'grid' };
    }
    return {};
  }

  render(): React.ReactElement {
    return (
      <div
        id={this._id}
        key={this.key}
        style={{ ...this.getCSSProperties(), ...this.getLayoutStyle() }}
      >
        {this.children.map(child =>
          React.cloneElement(child.render(), { key: child.getKey() }),
        )}
      </div>
    );
  }
}
