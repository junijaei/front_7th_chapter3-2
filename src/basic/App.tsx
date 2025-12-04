import { Notifications } from '@/components/ui/Notifications';
import { PAGES } from '@/constants/pages';
import { useNotifications } from '@/hooks/useNotifications';
import { PageItem, usePage } from '@/hooks/usePage';
import { Notification } from '@/models/notification';

const App = () => {
  const { PageComponent, currentPage, goPage } = usePage<{
    currentPage: PageItem;
    goPage: (id: string) => void;
    addNotification: (message: string, type: Notification['type']) => void;
  }>(PAGES, 'products');

  const { notifications, addNotification, removeNotification } =
    useNotifications();

  return (
    <div className="min-h-screen bg-gray-50">
      <Notifications
        notifications={notifications}
        removeNotification={removeNotification}
      />
      <PageComponent
        currentPage={currentPage}
        goPage={goPage}
        addNotification={addNotification}
      />
    </div>
  );
};

export default App;
