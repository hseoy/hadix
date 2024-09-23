import { ActionDefinition } from '../action-system/types';
import { ComponentDefinition } from '../component-system/types';
import { validateHadixApplicationConfig } from './validator';

export class HadixApplicationConfig {
  version: string | null;
  actions: ActionDefinition[];
  layout: ComponentDefinition | null;

  constructor(
    version: string | null = null,
    actions: ActionDefinition[] = [],
    layout: ComponentDefinition | null = null,
  ) {
    this.version = version;
    this.actions = actions;
    this.layout = layout;
  }

  loadFromJSON(jsonConfig: string) {
    const parsed = validateHadixApplicationConfig(JSON.parse(jsonConfig));
    this.version = parsed.version;
    this.actions = parsed.actions;
    this.layout = parsed.layout;
  }

  toJSON() {
    return JSON.stringify(
      { version: this.version, actions: this.actions, layout: this.layout },
      null,
      2,
    );
  }
}
