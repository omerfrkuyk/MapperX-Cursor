import { db } from '@/lib/firebase/config';
import {
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';

export interface SiteSettings {
  robots: {
    content: string;
    lastModified: string;
  };
  sitemap: {
    content: string;
    lastModified: string;
  };
  defaultMetaTags: {
    [locale: string]: {
      title: string;
      description: string;
      keywords: string;
      ogTitle: string;
      ogDescription: string;
      ogImage: string;
      twitterCard: string;
      twitterTitle: string;
      twitterDescription: string;
      twitterImage: string;
    };
  };
}

const SETTINGS_DOC = 'site_settings';

export const seoService = {
  // Get site settings
  async getSiteSettings(): Promise<SiteSettings | null> {
    try {
      const docRef = doc(db, 'settings', SETTINGS_DOC);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        return null;
      }

      return docSnap.data() as SiteSettings;
    } catch (error) {
      console.error('Error fetching site settings:', error);
      throw error;
    }
  },

  // Update robots.txt
  async updateRobots(content: string): Promise<void> {
    try {
      const docRef = doc(db, 'settings', SETTINGS_DOC);
      const docSnap = await getDoc(docRef);
      const currentData = docSnap.exists() ? docSnap.data() as SiteSettings : {};

      await setDoc(docRef, {
        ...currentData,
        robots: {
          content,
          lastModified: new Date().toISOString()
        }
      }, { merge: true });
    } catch (error) {
      console.error('Error updating robots.txt:', error);
      throw error;
    }
  },

  // Update sitemap.xml
  async updateSitemap(content: string): Promise<void> {
    try {
      const docRef = doc(db, 'settings', SETTINGS_DOC);
      const docSnap = await getDoc(docRef);
      const currentData = docSnap.exists() ? docSnap.data() as SiteSettings : {};

      await setDoc(docRef, {
        ...currentData,
        sitemap: {
          content,
          lastModified: new Date().toISOString()
        }
      }, { merge: true });
    } catch (error) {
      console.error('Error updating sitemap.xml:', error);
      throw error;
    }
  },

  // Update default meta tags for a specific locale
  async updateDefaultMetaTags(locale: string, metaTags: SiteSettings['defaultMetaTags'][string]): Promise<void> {
    try {
      const docRef = doc(db, 'settings', SETTINGS_DOC);
      const docSnap = await getDoc(docRef);
      const currentData = docSnap.exists() ? docSnap.data() as SiteSettings : { defaultMetaTags: {} };

      await setDoc(docRef, {
        ...currentData,
        defaultMetaTags: {
          ...currentData.defaultMetaTags,
          [locale]: {
            ...metaTags,
            lastModified: new Date().toISOString()
          }
        }
      }, { merge: true });
    } catch (error) {
      console.error('Error updating default meta tags:', error);
      throw error;
    }
  }
}; 