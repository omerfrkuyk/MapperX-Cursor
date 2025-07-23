'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { Blog } from '@/types/Blog';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Calendar, User, ArrowLeft, List } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { use } from 'react';
import styles from './BlogDetail.module.css';
import Head from 'next/head';

// İçindekiler tablosunu oluşturan yardımcı fonksiyon
const extractTableOfContents = (content: string) => {
  const headings: { id: string; text: string; level: number }[] = [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  const h2Elements = doc.querySelectorAll('h2');
  const h3Elements = doc.querySelectorAll('h3');

  h2Elements.forEach((h2, index) => {
    const id = `heading-${index}`;
    h2.id = id;
    headings.push({ id, text: h2.textContent || '', level: 2 });
  });

  h3Elements.forEach((h3, index) => {
    const id = `subheading-${index}`;
    h3.id = id;
    headings.push({ id, text: h3.textContent || '', level: 3 });
  });

  return headings;
};

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string, lang: string }> }) {
  const resolvedParams = use(params);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showToc, setShowToc] = useState(true);
  const { translate } = useLanguage();
  const [tableOfContents, setTableOfContents] = useState<{ id: string; text: string; level: number }[]>([]);

  useEffect(() => {
    fetchBlog();
  }, [resolvedParams.slug]);

  useEffect(() => {
    if (blog?.content) {
      const toc = extractTableOfContents(blog.content);
      setTableOfContents(toc);
    }
  }, [blog?.content]);

  const fetchBlog = async () => {
    try {
      const blogsCollection = collection(db, 'blogs');
      const q = query(
        blogsCollection,
        where('slug', '==', resolvedParams.slug),
        where('lang', '==', resolvedParams.lang)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        setError('Blog yazısı bulunamadı');
        return;
      }

      const blogData = {
        id: querySnapshot.docs[0].id,
        ...querySnapshot.docs[0].data()
      } as Blog;

      setBlog(blogData);
    } catch (error) {
      console.error('Error fetching blog:', error);
      setError('Blog yazısı yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.loadingTitle}></div>
          <div className={styles.loadingImage}></div>
          <div className={styles.loadingContent}>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          {error || 'Blog yazısı bulunamadı'}
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{blog.seoTitle || blog.title}</title>
        <meta name="description" content={blog.seoDescription || blog.excerpt} />
        <meta name="keywords" content={blog.seoKeywords || blog.tags?.join(', ')} />
        <meta property="og:title" content={blog.seoTitle || blog.title} />
        <meta property="og:description" content={blog.seoDescription || blog.excerpt} />
        {blog.featuredImage && <meta property="og:image" content={blog.featuredImage} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.seoTitle || blog.title} />
        <meta name="twitter:description" content={blog.seoDescription || blog.excerpt} />
        {blog.featuredImage && <meta name="twitter:image" content={blog.featuredImage} />}
      </Head>

      <article className={styles.article}>
        <div className={styles.container}>
          {/* Geri Dön Butonu */}
          <Link href={`/${resolvedParams.lang}/blog`} className={styles.backButton}>
            <ArrowLeft className={styles.icon} />
            {translate('blog.backToList')}
          </Link>

          {/* Blog Başlığı */}
          <h1 className={styles.title}>{blog.title}</h1>

          {/* Meta Bilgileri */}
          <div className={styles.meta}>
            <div className={styles.metaItem}>
              <Calendar className={styles.icon} />
              {new Date(blog.date).toLocaleDateString(resolvedParams.lang === 'en' ? 'en-US' : resolvedParams.lang)}
            </div>
            <div className={styles.metaItem}>
              <User className={styles.icon} />
              {blog.author}
            </div>
          </div>

          {/* İçindekiler Tablosu */}
          {tableOfContents.length > 0 && (
            <div className={styles.tocContainer}>
              <button 
                className={styles.tocToggle}
                onClick={() => setShowToc(!showToc)}
              >
                <List className={styles.icon} />
                {translate('blog.tableOfContents')}
              </button>
              
              {showToc && (
                <div className={styles.toc}>
                  <div className={styles.tocTitle}>
                    {translate('blog.tableOfContents')}
                  </div>
                  <div className={styles.tocList}>
                    {tableOfContents.map((heading, index) => (
                      <a
                        key={index}
                        href={`#${heading.id}`}
                        className={`${styles.tocLink} ${heading.level === 3 ? styles.tocLinkSub : ''}`}
                      >
                        {heading.text}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Öne Çıkan Görsel */}
          {blog.featuredImage && (
            <div className={styles.featuredImage}>
              <Image
                src={blog.featuredImage}
                alt={blog.title}
                fill
                className={styles.image}
                priority
              />
            </div>
          )}

          {/* Blog İçeriği */}
          <div 
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Etiketler */}
          {blog.tags && blog.tags.length > 0 && (
            <div className={styles.tags}>
              {blog.tags.map((tag, index) => (
                <span key={index} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Kategoriler */}
          {blog.categories && blog.categories.length > 0 && (
            <div className={styles.categories}>
              {blog.categories.map((category, index) => (
                <Link 
                  key={index}
                  href={`/${resolvedParams.lang}/blog/category/${category}`}
                  className={styles.category}
                >
                  {category}
                </Link>
              ))}
            </div>
          )}
        </div>
      </article>
    </>
  );
} 