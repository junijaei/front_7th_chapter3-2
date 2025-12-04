import { PAGES } from '@/constants/pages';
import { usePage } from '@/shared/hooks';
import { Notifications, PageLayout } from '@/shared/ui';
import { NotificationProvider, useNotification } from '@/shared/contexts';

const AppContent = () => {
  const { PageComponent, goPage } = usePage<{
    goPage: (id: string) => void;
  }>(PAGES, 'products');

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
    <NotificationProvider>
      <AppContent />
    </NotificationProvider>
  );
};

export default App;
