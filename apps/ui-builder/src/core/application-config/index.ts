import { ActionDefinition } from '../action-system/types';
import { ComponentDefinition } from '../component-system/types';
import { validateHadixApplicationConfig } from './validator';

export class HadixApplicationConfig {
  actions: ActionDefinition[];
  layout: ComponentDefinition | null;

  constructor() {
    this.actions = [];
    this.layout = null;
  }

  loadFromJSON(jsonConfig: string) {
    const parsed = validateHadixApplicationConfig(JSON.parse(jsonConfig));
    this.actions = parsed.actions;
    this.layout = parsed.layout;
  }
}
