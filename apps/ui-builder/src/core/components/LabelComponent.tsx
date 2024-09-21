import React from 'react';
import { BaseUIComponent } from '@/core/component-system/base-ui-component';
import { EventSystem } from '@/core/event-system';

export class LabelComponent extends BaseUIComponent {
  private text = '';

  constructor(id: string, eventSystem: EventSystem) {
    super(id, 'Label', eventSystem);
  }

  setText(text: string): void {
    this.text = text;
  }

  render(): React.ReactElement {
    return (
      <label id={this.id} key={this.key}>
        {this.text}
      </label>
    );
  }

  update(state: any): void {
    if (state[this.id]) {
      this.setText(state[this.id]);
    }
  }
}
