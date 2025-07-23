import BlogList from '@/components/blog/BlogList';
import { getMessages } from '@/lib/i18n/getMessages';
import { NextIntlClientProvider } from 'next-intl';

export default async function BlogPage() {
  const messages = await getMessages('fr');
  
  return (
    <NextIntlClientProvider messages={messages} locale="fr">
      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Blog</h1>
          <BlogList locale="fr" />
        </div>
      </main>
    </NextIntlClientProvider>
  );
} 