import { ActionFactory } from './action-factory';
import { Action, ActionContext, ActionDefinition } from './types';

export class ActionRegistry {
  private actions: Map<string, Action> = new Map();

  register(actionDefinition: ActionDefinition): void {
    const action = ActionFactory.factory(actionDefinition);
    this.actions.set(action.id, action);
  }

  executeAction(id: string, context: ActionContext) {
    const targetAction = this.get(id);
    if (!targetAction) {
      console.warn(`Action type ${id} not found`);
    }
    return targetAction?.execute(context);
  }

  get(id: string): Action | undefined {
    return this.actions.get(id);
  }
}
