import { z } from 'zod';
import { ActionDefinition } from './types';

export const ParamValueSchema = z.union([
  z.string(),
  z.number(),
  z.boolean(),
  z.object({}).passthrough(),
  z.null(),
]);

export const DynamicParamSchema = z.object({
  type: z.literal('dynamic'),
  expression: z.string(),
});

export const ParamDefinitionSchema = z.union([
  ParamValueSchema,
  DynamicParamSchema,
]);

const createActionDefinitionSchema = <
  ParamsT extends z.ZodType<
    Record<string, z.infer<typeof ParamDefinitionSchema>>
  >,
>(
  paramsSchema: ParamsT,
) => {
  return z.object({
    id: z.string(),
    type: z.string(),
    params: paramsSchema.optional(),
  });
};

export const DefaultActionDefinitionSchema = createActionDefinitionSchema(
  z.record(ParamDefinitionSchema),
);

export const validateActionDefinition = <
  ParamsT extends Record<string, z.infer<typeof ParamDefinitionSchema>>,
>(
  data: unknown,
  paramsSchema?: z.ZodType<ParamsT>,
): ActionDefinition<ParamsT> => {
  const schema = paramsSchema
    ? createActionDefinitionSchema(paramsSchema)
    : DefaultActionDefinitionSchema;
  return schema.parse(data) as ActionDefinition<ParamsT>;
};
