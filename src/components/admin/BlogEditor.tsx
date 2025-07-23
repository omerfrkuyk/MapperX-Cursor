import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';
import { storage } from '@/lib/firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface BlogEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export default function BlogEditor({ content, onChange }: BlogEditorProps) {
  const editorRef = useRef<any>(null);

  // Görsel yükleme işleyicisi
  const handleImageUpload = async (blobInfo: any) => {
    try {
      const file = blobInfo.blob();
      const fileName = `blog-images/${Date.now()}-${blobInfo.filename()}`;
      const storageRef = ref(storage, fileName);
      
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      return downloadURL;
    } catch (error) {
      console.error('Image upload error:', error);
      throw new Error('Image upload failed');
    }
  };

  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
      onInit={(evt, editor) => editorRef.current = editor}
      value={content}
      onEditorChange={onChange}
      init={{
        height: 600,
        menubar: true,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'help', 'wordcount', 'image code',
          'quickbars', 'codesample'
        ],
        toolbar: 'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | image media | help',
        images_upload_handler: handleImageUpload,
        image_advtab: true, // Gelişmiş görsel seçeneklerini aktifleştir
        image_dimensions: true, // Boyut değiştirme özelliğini aktifleştir
        image_class_list: [ // Görsel sınıfları
          { title: 'Responsive', value: 'img-fluid' },
          { title: 'Full Width', value: 'img-full' },
          { title: 'Left Aligned', value: 'img-left' },
          { title: 'Right Aligned', value: 'img-right' },
          { title: 'Center Aligned', value: 'img-center' }
        ],
        image_caption: true, // Görsel altı yazı özelliğini aktifleştir
        automatic_uploads: true,
        file_picker_types: 'image',
        quickbars_insert_toolbar: 'image media',
        quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote',
        contextmenu: 'link image table',
        // Görsel araç çubuğu ayarları
        image_toolbar: 'alignleft aligncenter alignright | rotateleft rotateright | imageoptions',
        // Varsayılan görsel stilleri ve genel içerik stili
        content_style: `
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; font-size: 16px; line-height: 1.75; }
          .img-fluid { max-width: 100%; height: auto; }
          .img-full { width: 100%; height: auto; margin: 1rem 0; }
          .img-left { float: left; margin: 0 1rem 1rem 0; max-width: 50%; }
          .img-right { float: right; margin: 0 0 1rem 1rem; max-width: 50%; }
          .img-center { display: block; margin: 1rem auto; max-width: 100%; }
          figure { margin: 1rem 0; }
          figure figcaption { text-align: center; font-size: 0.875rem; color: #666; margin-top: 0.5rem; }
        `,
        // Görsel yükleme ayarları
        images_upload_url: 'postAcceptor.php',
        images_reuse_filename: true,
        images_upload_base_path: '/uploads',
        images_upload_credentials: true,
        // Görsel boyutlandırma için constrain proportions varsayılan olarak açık
        image_dimensions_default_constrain: true,
      }}
    />
  );
} 