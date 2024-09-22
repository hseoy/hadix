import { z } from 'zod';
import { DefaultActionDefinitionSchema } from '../action-system/validator';
import { ComponentDefinitionSchema } from '../component-system/validator';

const HadixApplicationConfigSchema = z.object({
  actions: z.array(DefaultActionDefinitionSchema),
  layout: ComponentDefinitionSchema,
});

export type HadixApplicationConfigDefinition = z.infer<
  typeof HadixApplicationConfigSchema
>;

export const validateHadixApplicationConfig = (
  data: unknown,
): HadixApplicationConfigDefinition => {
  return HadixApplicationConfigSchema.parse(data);
};
