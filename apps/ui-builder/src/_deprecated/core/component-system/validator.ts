import { z } from 'zod';
import { ComponentDefinition, EventBindingDefinition } from './types';

// EventBindingDefinition에 대한 Zod 스키마
export const EventBindingDefinitionSchema = z.object({
  eventName: z.string(),
  actionId: z.string(),
});

// ComponentDefinition에 대한 Zod 스키마 (재귀적 정의)
export const ComponentDefinitionSchema: z.ZodType<ComponentDefinition> = z.lazy(
  () =>
    z.object({
      id: z.string(),
      type: z.string(),
      key: z.string().optional(),
      children: z.array(ComponentDefinitionSchema).optional(),
      props: z.record(z.unknown()).optional(),
      events: z.array(EventBindingDefinitionSchema).optional(),
    }),
);

export const validateEventBindingDefinition = (
  data: unknown,
): EventBindingDefinition => {
  return EventBindingDefinitionSchema.parse(data);
};

export const validateComponentDefinition = (
  data: unknown,
): ComponentDefinition => {
  return ComponentDefinitionSchema.parse(data);
};
