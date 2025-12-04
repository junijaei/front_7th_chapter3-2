import { Notifications } from '@/components/ui/Notifications';
import { PAGES } from '@/constants/pages';
import { PageItem, usePage } from '@/hooks/usePage';

const App = () => {
  const { PageComponent, currentPage, goPage } = usePage<{
    currentPage: PageItem;
    goPage: (id: string) => void;
  }>(PAGES, 'products');

  return (
    <div className="min-h-screen bg-gray-50">
      <Notifications />
      <PageComponent currentPage={currentPage} goPage={goPage} />
    </div>
  );
};

export default App;
