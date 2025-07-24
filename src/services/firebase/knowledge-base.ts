import { collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, query, where, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { KnowledgeBaseCategory, KnowledgeBaseArticle } from '@/types/KnowledgeBase';

// Kategori servisleri
export const categoryService = {
  // Tüm kategorileri getir
  getCategories: async (lang: string) => {
    const q = query(
      collection(db, 'knowledge-base-categories'),
      where('lang', '==', lang),
      orderBy('order', 'asc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as KnowledgeBaseCategory[];
  },

  // Kategori detayı getir
  getCategory: async (id: string) => {
    const docRef = doc(db, 'knowledge-base-categories', id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    return { id: docSnap.id, ...docSnap.data() } as KnowledgeBaseCategory;
  },

  // Yeni kategori oluştur
  createCategory: async (data: Omit<KnowledgeBaseCategory, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const categoryData = {
      ...data,
      createdAt: now,
      updatedAt: now
    };
    const docRef = await addDoc(collection(db, 'knowledge-base-categories'), categoryData);
    return { id: docRef.id, ...categoryData };
  },

  // Kategori güncelle
  updateCategory: async (id: string, data: Partial<KnowledgeBaseCategory>) => {
    const docRef = doc(db, 'knowledge-base-categories', id);
    const updateData = {
      ...data,
      updatedAt: new Date().toISOString()
    };
    await updateDoc(docRef, updateData);
    return { id, ...updateData };
  },

  // Kategori sil
  deleteCategory: async (id: string) => {
    await deleteDoc(doc(db, 'knowledge-base-categories', id));
  }
};

// Makale servisleri
export const articleService = {
  // Tüm makaleleri getir
  getArticles: async (lang: string) => {
    const q = query(
      collection(db, 'knowledge-base-articles'),
      where('lang', '==', lang),
      orderBy('order', 'asc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as KnowledgeBaseArticle[];
  },

  // Kategori bazlı makaleleri getir
  getArticlesByCategory: async (categoryId: string, lang: string) => {
    const q = query(
      collection(db, 'knowledge-base-articles'),
      where('categoryId', '==', categoryId),
      where('lang', '==', lang),
      orderBy('order', 'asc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as KnowledgeBaseArticle[];
  },

  // Makale detayı getir
  getArticle: async (id: string) => {
    const docRef = doc(db, 'knowledge-base-articles', id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    return { id: docSnap.id, ...docSnap.data() } as KnowledgeBaseArticle;
  },

  // Yeni makale oluştur
  createArticle: async (data: Omit<KnowledgeBaseArticle, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const articleData = {
      ...data,
      createdAt: now,
      updatedAt: now
    };
    const docRef = await addDoc(collection(db, 'knowledge-base-articles'), articleData);
    return { id: docRef.id, ...articleData };
  },

  // Makale güncelle
  updateArticle: async (id: string, data: Partial<KnowledgeBaseArticle>) => {
    const docRef = doc(db, 'knowledge-base-articles', id);
    const updateData = {
      ...data,
      updatedAt: new Date().toISOString()
    };
    await updateDoc(docRef, updateData);
    return { id, ...updateData };
  },

  // Makale sil
  deleteArticle: async (id: string) => {
    await deleteDoc(doc(db, 'knowledge-base-articles', id));
  }
}; 