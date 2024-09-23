import { BaseUIComponent } from '@/core/component-system/base-ui-component';
import { EventSystem } from '@/core/event-system';

export class TextComponent extends BaseUIComponent {
  content: string;

  constructor(id: string, eventSystem: EventSystem) {
    super(id, 'Text', eventSystem);
    this.content = '';
    this.fontSize = '16px';
    this.fontWeight = 'normal';
  }

  render(): JSX.Element {
    return (
      <span id={this._id} key={this.key} style={{ ...this.getCSSProperties() }}>
        {this.content}
      </span>
    );
  }
}
