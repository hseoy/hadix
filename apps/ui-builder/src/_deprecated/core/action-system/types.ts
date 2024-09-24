import { EventDefinition } from '@/_deprecated/core/event-system/types';
import { UIComponent } from '@/_deprecated/core/component-system/types';
import { StateManager } from '../state-system/state-manager';

export type ParamValue = string | number | boolean | object | null;

export interface DynamicParam {
  type: 'dynamic';
  expression: string;
}

export type ParamDefinition = ParamValue | DynamicParam;

export interface ActionDefinition<
  ParamsT extends Record<string, ParamDefinition> = Record<
    string,
    ParamDefinition
  >,
> {
  id: string;
  type: string;
  params?: ParamsT;
  callback?: ActionCallback;
}

export interface Action<
  ParamsT extends Record<string, ParamDefinition> = Record<
    string,
    ParamDefinition
  >,
> extends ActionDefinition<ParamsT> {
  execute(context: ActionContext): Promise<void>;
}

export interface ActionContext {
  $event: EventDefinition;
  $state: StateManager;
  $components: Record<string, UIComponent>;
}

export type ActionCallback = (context: ActionContext) => void;
