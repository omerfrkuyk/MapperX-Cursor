'use client';

import Sidebar from './Sidebar';
import MainContent from './MainContent';
import Breadcrumb from './Breadcrumb';

interface KnowledgeBasePageProps {
  category?: string;
  article?: string;
}

const KnowledgeBasePage = ({ category, article }: KnowledgeBasePageProps) => {
  // Breadcrumb öğelerini oluştur
  const breadcrumbItems = [];
  if (category) {
    breadcrumbItems.push({
      label: category,
      href: article ? `#${category}` : undefined,
    });
  }
  if (article) {
    breadcrumbItems.push({
      label: article,
    });
  }

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 ml-80">
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        <MainContent />
      </div>
    </div>
  );
};

export default KnowledgeBasePage; 