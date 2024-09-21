import { BaseAction } from '@/core/action-system/base-action';
import { ActionContext } from '@/core/action-system/types';

export class EmptyAction extends BaseAction<'empty'> {
  constructor(id: string) {
    super(id, 'empty', {});
  }

  execute(_context: ActionContext): void {
    // Do nothing
  }
}
