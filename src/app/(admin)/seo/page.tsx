'use client';

import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

interface SEOSettings {
  globalMetaTitle: string;
  globalMetaDescription: string;
  globalOgTitle: string;
  globalOgDescription: string;
  globalOgImage: string;
  globalTwitterTitle: string;
  globalTwitterDescription: string;
  globalTwitterImage: string;
  robotsTxt: string;
  sitemapXml: string;
  customSchemaMarkup: string;
}

const defaultSEOSettings: SEOSettings = {
  globalMetaTitle: '',
  globalMetaDescription: '',
  globalOgTitle: '',
  globalOgDescription: '',
  globalOgImage: '',
  globalTwitterTitle: '',
  globalTwitterDescription: '',
  globalTwitterImage: '',
  robotsTxt: `User-agent: *
Allow: /
Disallow: /admin/
Sitemap: https://mapperx.com/sitemap.xml`,
  sitemapXml: '',
  customSchemaMarkup: '',
};

export default function SEOPage() {
  const [settings, setSettings] = useState<SEOSettings>(defaultSEOSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchSEOSettings();
  }, []);

  const fetchSEOSettings = async () => {
    try {
      const docRef = doc(db, 'settings', 'seo');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setSettings(docSnap.data() as SEOSettings);
      }
    } catch (error) {
      console.error('Error fetching SEO settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMessage('');

    try {
      await setDoc(doc(db, 'settings', 'seo'), settings);
      setSuccessMessage('SEO settings saved successfully!');
      
      // Update robots.txt
      const robotsResponse = await fetch('/api/seo/robots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: settings.robotsTxt }),
      });

      if (!robotsResponse.ok) {
        throw new Error('Failed to update robots.txt');
      }

      // Update sitemap.xml
      const sitemapResponse = await fetch('/api/seo/sitemap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: settings.sitemapXml }),
      });

      if (!sitemapResponse.ok) {
        throw new Error('Failed to update sitemap.xml');
      }
    } catch (error) {
      console.error('Error saving SEO settings:', error);
      setSuccessMessage('Error saving settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">SEO Settings</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Global Meta Tags</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="globalMetaTitle" className="block text-sm font-medium text-gray-700">
                Default Meta Title
              </label>
              <input
                type="text"
                name="globalMetaTitle"
                id="globalMetaTitle"
                value={settings.globalMetaTitle}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="globalMetaDescription" className="block text-sm font-medium text-gray-700">
                Default Meta Description
              </label>
              <textarea
                name="globalMetaDescription"
                id="globalMetaDescription"
                rows={3}
                value={settings.globalMetaDescription}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Open Graph Settings</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="globalOgTitle" className="block text-sm font-medium text-gray-700">
                Default OG Title
              </label>
              <input
                type="text"
                name="globalOgTitle"
                id="globalOgTitle"
                value={settings.globalOgTitle}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="globalOgDescription" className="block text-sm font-medium text-gray-700">
                Default OG Description
              </label>
              <textarea
                name="globalOgDescription"
                id="globalOgDescription"
                rows={3}
                value={settings.globalOgDescription}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="globalOgImage" className="block text-sm font-medium text-gray-700">
                Default OG Image URL
              </label>
              <input
                type="url"
                name="globalOgImage"
                id="globalOgImage"
                value={settings.globalOgImage}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Twitter Card Settings</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="globalTwitterTitle" className="block text-sm font-medium text-gray-700">
                Default Twitter Title
              </label>
              <input
                type="text"
                name="globalTwitterTitle"
                id="globalTwitterTitle"
                value={settings.globalTwitterTitle}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="globalTwitterDescription" className="block text-sm font-medium text-gray-700">
                Default Twitter Description
              </label>
              <textarea
                name="globalTwitterDescription"
                id="globalTwitterDescription"
                rows={3}
                value={settings.globalTwitterDescription}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="globalTwitterImage" className="block text-sm font-medium text-gray-700">
                Default Twitter Image URL
              </label>
              <input
                type="url"
                name="globalTwitterImage"
                id="globalTwitterImage"
                value={settings.globalTwitterImage}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Technical SEO</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="robotsTxt" className="block text-sm font-medium text-gray-700">
                robots.txt Content
              </label>
              <textarea
                name="robotsTxt"
                id="robotsTxt"
                rows={6}
                value={settings.robotsTxt}
                onChange={handleInputChange}
                className="mt-1 block w-full font-mono text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="sitemapXml" className="block text-sm font-medium text-gray-700">
                sitemap.xml Content
              </label>
              <textarea
                name="sitemapXml"
                id="sitemapXml"
                rows={10}
                value={settings.sitemapXml}
                onChange={handleInputChange}
                className="mt-1 block w-full font-mono text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="customSchemaMarkup" className="block text-sm font-medium text-gray-700">
                Custom Schema Markup
              </label>
              <textarea
                name="customSchemaMarkup"
                id="customSchemaMarkup"
                rows={10}
                value={settings.customSchemaMarkup}
                onChange={handleInputChange}
                className="mt-1 block w-full font-mono text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <p className="mt-2 text-sm text-gray-500">
                Enter your custom JSON-LD schema markup here. This will be added to the global site header.
              </p>
            </div>
          </div>
        </div>

        {successMessage && (
          <div className={`rounded-md p-4 ${
            successMessage.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
          }`}>
            {successMessage}
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
} 