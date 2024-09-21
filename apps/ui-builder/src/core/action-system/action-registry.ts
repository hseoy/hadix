import { CallbackAction } from './actions/callback-action';
import { CustomAction, CustomActionParams } from './actions/custom-action';
import { EmptyAction } from './actions/empty-action';
import { Action, ActionContext, ActionDefinition } from './types';

export class ActionRegistry {
  private actions: Map<string, Action> = new Map();

  factory(action: ActionDefinition): Action {
    if (action.type === 'custom') {
      const newAction = new CustomAction(
        action.id,
        action.params as CustomActionParams,
      );
      return newAction;
    }

    if (action.type === 'callback') {
      const newAction = new CallbackAction(action.id, action.callback);
      return newAction;
    }

    console.warn(`Action type ${action.type} not found`);
    const emptyAction = new EmptyAction(action.id);
    return emptyAction;
  }

  register(actionDefinition: ActionDefinition): void {
    const action = this.factory(actionDefinition);
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
