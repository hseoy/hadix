import React from 'react';
import { BaseUIComponent } from '@/core/component-system/base-ui-component';
import { EventSystem } from '@/core/event-system';

export class ContainerComponent extends BaseUIComponent {
  constructor(id: string, eventSystem: EventSystem) {
    super(id, 'Container', eventSystem);
  }

  render(): React.ReactElement {
    return (
      <div id={this.id} style={{ display: 'flex', flexDirection: 'column' }}>
        {this.children.map(child =>
          React.cloneElement(child.render(), { key: child.getKey() }),
        )}
      </div>
    );
  }
}
