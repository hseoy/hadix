import { AppHeader, Layout } from './modules/layout';

export const App = () => {
  return (
    <Layout>
      <AppHeader appName="Playground" />
      <h2>World</h2>
    </Layout>
  );
};
