import { isDynamicParam } from '@/core/action-system/type-guards';
import {
  Action,
  ActionCallback,
  ActionContext,
  ParamDefinition,
  ParamValue,
} from '@/core/action-system/types';

export type BaseActionParams = Record<string, ParamDefinition>;
export type ResolvedBaseActionParams = Record<string, ParamValue>;

export abstract class BaseAction<
  TypeT extends string,
  ParamsT extends BaseActionParams = Record<string, never>,
  ResolvedParamsT extends ResolvedBaseActionParams = ParamsT extends ResolvedBaseActionParams
    ? ParamsT
    : Record<string, never>,
> implements Action<ParamsT>
{
  id: string;
  type: TypeT;
  params?: ParamsT;
  callback?: ActionCallback;

  constructor(
    id: string,
    type: TypeT,
    params?: ParamsT,
    callback?: ActionCallback,
  ) {
    this.id = id;
    this.type = type;
    this.params = params;
    this.callback = callback;
  }

  protected async resolveParams(
    params: ParamsT | undefined,
    context: ActionContext,
  ): Promise<ResolvedParamsT> {
    const resolvedParams: Record<string, ParamValue> = {};

    const paramEntries = Object.entries(params || {});
    for (const [key, value] of paramEntries) {
      if (isDynamicParam(value)) {
        resolvedParams[key] = await this.evaluateExpression(
          value.expression,
          context,
        );
      } else {
        resolvedParams[key] = value;
      }
    }

    return resolvedParams as ResolvedParamsT;
  }

  protected evaluateExpression(expression: string, context: ActionContext) {
    // 여기서 표현식을 안전하게 평가합니다.
    // 실제 구현에서는 보안을 고려한 방식으로 구현해야 합니다.
    return new Function('context', `with(context) { return ${expression} }`)(
      context,
    );
  }

  protected abstract executeAction(
    context: ActionContext,
    resolvedParams: ResolvedParamsT,
  ): Promise<void>;

  async execute(context: ActionContext): Promise<void> {
    const resolvedParams = await this.resolveParams(this.params, context);
    await this.executeAction(context, resolvedParams);
  }
}
