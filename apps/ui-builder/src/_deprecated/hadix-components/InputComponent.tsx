import React from 'react';
import { BaseUIComponent } from '@/_deprecated/core/component-system/base-ui-component';
import { EventSystem } from '@/_deprecated/core/event-system';

export class InputComponent extends BaseUIComponent {
  placeholder: string;
  type: 'text' | 'number' | 'email' | 'password';

  constructor(id: string, eventSystem: EventSystem) {
    super(id, 'Input', eventSystem);
    this.placeholder = '';
    this.type = 'text';
  }

  render(): React.ReactElement {
    return (
      <input
        id={this._id}
        key={this.key}
        type={this.type}
        placeholder={this.placeholder}
        onChange={e => this.setState({ ...this.state, value: e.target.value })}
        style={{ ...this.getCSSProperties() }}
      />
    );
  }
}
