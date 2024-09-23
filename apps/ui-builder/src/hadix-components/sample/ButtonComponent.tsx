import React from 'react';
import { BaseUIComponent } from '@/core/component-system/base-ui-component';
import { EventSystem } from '@/core/event-system';

export class ButtonComponent extends BaseUIComponent {
  private onClick?: () => void;
  public label: string;

  constructor(id: string, eventSystem: EventSystem) {
    super(id, 'Button', eventSystem);
    this.label = '';
  }

  setOnClick(handler: () => void): void {
    this.onClick = handler;
  }

  render(): JSX.Element {
    return (
      <button
        id={this.id}
        key={this.key}
        onClick={() => {
          if (this.onClick) {
            this.onClick();
          }
          this.emit('click');
        }}
      >
        {this.label}
      </button>
    );
  }
}
