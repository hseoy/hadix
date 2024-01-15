import { AppList } from './components/AppList/AppList';
import { AppListPageBody } from './components/AppListPageBody/AppListPageBody';
import { AppListPageContainer } from './components/AppListPageContainer/AppListPageContainer';
import { AppListPageHeader } from './components/AppListPageHeader/AppListPageHeader';

export const AppListPage = () => {
  return (
    <AppListPageContainer>
      <AppListPageHeader />
      <AppListPageBody>
        <AppList />
      </AppListPageBody>
    </AppListPageContainer>
  );
};
