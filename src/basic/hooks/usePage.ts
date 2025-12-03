import { ComponentType, useState } from 'react';

export interface PageItem<T = unknown> {
  id: string;
  name: string;
  component: ComponentType<T>;
}

export const usePage = <T = unknown>(
  pages: PageItem<T>[],
  initialPageId?: string
) => {
  const initialPage = initialPageId
    ? pages.find((page) => page.id === initialPageId) || pages[0]
    : pages[0];

  const [currentPage, setCurrentPage] = useState<PageItem<T>>(initialPage);

  const goPage = (id: string) => {
    const targetPage = pages.find((page) => page.id === id);
    if (targetPage) {
      setCurrentPage(targetPage);
    }
  };

  return {
    currentPage,
    goPage,
    PageComponent: currentPage.component,
  };
};
