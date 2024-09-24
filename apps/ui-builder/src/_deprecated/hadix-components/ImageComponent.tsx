import { BaseUIComponent } from '@/_deprecated/core/component-system/base-ui-component';
import { EventSystem } from '@/_deprecated/core/event-system';

export class ImageComponent extends BaseUIComponent {
  src: string;
  alt: string;
  width?: number;
  height?: number;

  constructor(id: string, eventSystem: EventSystem) {
    super(id, 'Image', eventSystem);
    this.src = '';
    this.alt = '';
    this.width = undefined;
    this.height = undefined;
  }

  render(): JSX.Element {
    return (
      <img
        id={this._id}
        key={this.key}
        src={this.src}
        alt={this.alt}
        style={{
          ...this.getCSSProperties(),
          width: this.width,
          height: this.height,
        }}
      />
    );
  }
}
