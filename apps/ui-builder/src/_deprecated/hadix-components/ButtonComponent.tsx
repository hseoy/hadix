import React from 'react';
import { BaseUIComponent } from '@/_deprecated/core/component-system/base-ui-component';
import { EventSystem } from '@/_deprecated/core/event-system';

export class ButtonComponent extends BaseUIComponent {
  constructor(id: string, eventSystem: EventSystem) {
    super(id, 'Button', eventSystem);
  }

  render(): JSX.Element {
    return (
      <button
        id={this._id}
        key={this.key}
        onClick={() => this.emit('click')}
        style={{ ...this.getCSSProperties() }}
      />
    );
  }
}
