import { db } from '@/lib/firebase/config';
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  limit,
  startAfter,
  QueryConstraint
} from 'firebase/firestore';
import { Blog } from '@/types/Blog';

const BLOGS_COLLECTION = 'blogs';

export const blogService = {
  // Get blogs with pagination and filters
  async getBlogs(options: {
    locale?: string;
    page?: number;
    limit?: number;
    orderByField?: string;
  } = {}) {
    try {
      const {
        locale,
        page = 1,
        limit: pageSize = 10,
        orderByField = 'createdAt'
      } = options;

      // Temporary solution until index is ready
      const q = query(
        collection(db, BLOGS_COLLECTION),
        orderBy('createdAt', 'desc'),
        limit(pageSize)
      );

      const querySnapshot = await getDocs(q);
      let blogs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Blog[];

      // Client-side filtering for locale if specified
      if (locale) {
        blogs = blogs.filter(blog => blog.locale === locale);
      }
      
      return {
        blogs,
        lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1],
        total: blogs.length
      };
    } catch (error) {
      console.error('Error fetching blogs:', error);
      throw error;
    }
  },

  // Get a single blog by ID
  async getBlogById(id: string) {
    try {
      const docRef = doc(db, BLOGS_COLLECTION, id);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        return null;
      }

      return {
        id: docSnap.id,
        ...docSnap.data()
      } as Blog;
    } catch (error) {
      console.error('Error fetching blog by ID:', error);
      throw error;
    }
  },

  // Create a new blog
  async createBlog(blogData: Omit<Blog, 'id'>) {
    try {
      const docRef = await addDoc(collection(db, BLOGS_COLLECTION), {
        ...blogData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });

      return docRef.id;
    } catch (error) {
      console.error('Error creating blog:', error);
      throw error;
    }
  },

  // Update an existing blog
  async updateBlog(id: string, blogData: Partial<Blog>) {
    try {
      const docRef = doc(db, BLOGS_COLLECTION, id);
      await updateDoc(docRef, {
        ...blogData,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating blog:', error);
      throw error;
    }
  },

  // Delete a blog
  async deleteBlog(id: string) {
    try {
      await deleteDoc(doc(db, BLOGS_COLLECTION, id));
    } catch (error) {
      console.error('Error deleting blog:', error);
      throw error;
    }
  }
}; 