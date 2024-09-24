import {
  BaseAction,
  BaseActionParams,
} from '@/_deprecated/core/action-system/base-action';
import { ActionContext } from '@/_deprecated/core/action-system/types';

export interface CustomActionParams extends BaseActionParams {
  script: string;
}

export class CustomAction extends BaseAction<'custom', CustomActionParams> {
  constructor(id: string, params: CustomActionParams) {
    super(id, 'custom', params);
  }

  async executeAction(
    context: ActionContext,
    resolvedParams: CustomActionParams,
  ) {
    if (resolvedParams?.script) {
      this.evaluateExpression(resolvedParams.script, context);
    }
  }
}
