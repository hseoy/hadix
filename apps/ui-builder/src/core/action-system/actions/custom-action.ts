import { BaseAction, BaseActionParams } from '@/core/action-system/base-action';
import { ActionContext } from '@/core/action-system/types';

export interface CustomActionParams extends BaseActionParams {
  script: string;
}

export class CustomAction extends BaseAction<'custom', CustomActionParams> {
  constructor(id: string, params: CustomActionParams) {
    super(id, 'custom', params);
  }

  execute(context: ActionContext): void {
    if (this.params?.script) {
      this.evaluateExpression(this.params.script, context);
    }
  }
}
