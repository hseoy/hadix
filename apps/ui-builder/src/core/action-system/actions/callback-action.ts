import { BaseAction, BaseActionParams } from '@/core/action-system/base-action';
import { ActionCallback, ActionContext } from '@/core/action-system/types';

export class CallbackAction extends BaseAction<'callback'> {
  constructor(id: string, callback?: ActionCallback) {
    super(id, 'callback', undefined, callback);
  }

  execute(context: ActionContext): void {
    this.callback?.(context);
  }
}
