import { BaseAction } from '@/core/action-system/base-action';
import { ActionCallback, ActionContext } from '@/core/action-system/types';

export class CallbackAction extends BaseAction<'callback'> {
  constructor(id: string, callback?: ActionCallback) {
    super(id, 'callback', undefined, callback);
  }

  async executeAction(context: ActionContext) {
    this.callback?.(context);
  }
}
