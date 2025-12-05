import { Provider as JotaiProvider } from 'jotai';
import { PAGES } from '@/constants/pages';
import { usePage } from '@/shared/hooks';
import { Notifications, PageLayout } from '@/shared/ui';
import { NotificationProvider, useNotification } from '@/shared/contexts';

const AppContent = () => {
  const { PageComponent, goPage } = usePage(PAGES, 'products');

  const { notifications, removeNotification } = useNotification();

  return (
    <PageLayout>
      <Notifications
        notifications={notifications}
        removeNotification={removeNotification}
      />
      <PageComponent goPage={goPage} />
    </PageLayout>
  );
};

const App = () => {
  return (
    <JotaiProvider>
      <NotificationProvider>
        <AppContent />
      </NotificationProvider>
    </JotaiProvider>
  );
};

export default App;
