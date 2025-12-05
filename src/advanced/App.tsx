import { Provider as JotaiProvider } from 'jotai';
import { PAGES } from '@/advanced/constants/pages';
import { usePage } from '@/advanced/shared/hooks/usePage';
import { Notifications } from '@/advanced/shared/ui/Notifications';
import { PageLayout } from '@/advanced/shared/ui/layout/PageLayout';
import {
  NotificationProvider,
  useNotification,
} from '@/advanced/shared/contexts';

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
