import { Stack, Styled } from '~modules/common';

export const App = () => {
  return (
    <Stack _color="blue">
      <Styled _color="red" as="h1">
        Hello
      </Styled>
      <h2>World</h2>
    </Stack>
  );
};
