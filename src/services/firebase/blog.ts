import { db, storage } from '@/lib/firebase/config';
import { collection, addDoc, updateDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Blog } from '@/types/Blog';

export const blogService = {
  // Blog oluşturma
  createBlog: async (blogData: Partial<Blog>) => {
    try {
      const docRef = await addDoc(collection(db, 'blogs'), {
        ...blogData,
        date: new Date().toISOString()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating blog:', error);
      throw error;
    }
  },

  // Blog güncelleme
  updateBlog: async (id: string, blogData: Partial<Blog>) => {
    try {
      const blogRef = doc(db, 'blogs', id);
      await updateDoc(blogRef, blogData);
    } catch (error) {
      console.error('Error updating blog:', error);
      throw error;
    }
  },

  // Blog getirme (slug'a göre)
  getBlogBySlug: async (slug: string, lang: string) => {
    try {
      const blogsCollection = collection(db, 'blogs');
      const q = query(
        blogsCollection,
        where('slug', '==', slug),
        where('lang', '==', lang)
      );
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        throw new Error('Blog not found');
      }

      const blogDoc = querySnapshot.docs[0];
      return { id: blogDoc.id, ...blogDoc.data() } as Blog;
    } catch (error) {
      console.error('Error fetching blog:', error);
      throw error;
    }
  },

  // Görsel yükleme
  uploadImage: async (file: File, type: 'featured' | 'content' = 'content'): Promise<string> => {
    try {
      const folder = type === 'featured' ? 'featured-images' : 'blog-content-images';
      const fileName = `${folder}/${Date.now()}-${file.name}`;
      const storageRef = ref(storage, fileName);
      
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },

  // TinyMCE için görsel yükleme işleyicisi
  handleEditorImageUpload: async (blobInfo: any): Promise<string> => {
    try {
      const file = blobInfo.blob();
      return await blogService.uploadImage(file, 'content');
    } catch (error) {
      console.error('Error uploading editor image:', error);
      throw error;
    }
  }
}; 