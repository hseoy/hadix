import React from 'react';
import { BaseUIComponent } from '@/core/component-system/base-ui-component';
import { EventSystem } from '@/core/event-system';

export class InputComponent extends BaseUIComponent {
  placeholder: string;

  constructor(id: string, eventSystem: EventSystem) {
    super(id, 'Input', eventSystem);
    this.placeholder = '';
  }

  render(): React.ReactElement {
    return (
      <input
        id={this.id}
        key={this.key}
        type="text"
        placeholder={this.placeholder}
        onChange={e => {
          this.setState({ ...this.state, value: e.target.value });
        }}
      />
    );
  }
}
