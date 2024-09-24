import { CallbackAction } from './actions/callback-action';
import { CustomAction, CustomActionParams } from './actions/custom-action';
import { EmptyAction } from './actions/empty-action';
import { ActionDefinition, Action } from './types';

export class ActionFactory {
  static factory(action: ActionDefinition): Action {
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
}
