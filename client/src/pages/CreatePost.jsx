import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import { useRef, useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

export default function CreatePost() {
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setImageUploadError(
        'Could not upload image (File must be less than 2MB)',
      );
      setImageFile(null);
      return;
    }

    setImageUploadError(null);
    setImageFile(file);
    setImageFileUrl(URL.createObjectURL(file));
  };

  const handleUploadImage = async () => {
    if (!imageFile) {
      setImageUploadError('Please choose an image first');
      return;
    }

    setIsUploading(true);
    setImageUploadError(null);

    try {
      const uploadData = new FormData();
      uploadData.append('image', imageFile);

      const res = await fetch('/api/upload-image', {
        method: 'POST',
        body: uploadData,
      });

      const contentType = res.headers.get('content-type') || '';
      const data = contentType.includes('application/json')
        ? await res.json()
        : await res.text();

      if (!res.ok) {
        setImageUploadError(
          data?.error || data?.message || 'Could not upload image',
        );
        setIsUploading(false);
        return;
      }

      setImageFileUrl(data.imageUrl);
      setIsUploading(false);
    } catch (err) {
      setImageUploadError(
        err.message || 'Network error: Could not upload image',
      );
      setIsUploading(false);
    }
  };

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-3xl font-semibold text-center my-7'>Create a post</h1>
      <form className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Title'
            required
            id='title'
            className='flex-3'
          />
          <Select id='category' required className='flex-1'>
            <option value='uncategorized'>Select a category</option>
            <option value='javascript'>JavaScript</option>
            <option value='reactjs'>React.js</option>
            <option value='nextjs'>Next.js</option>
          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput
            ref={fileInputRef}
            type='file'
            accept='image/*'
            onChange={handleImageChange}
            disabled={isUploading}
          />
          <Button
            className='p-6 cursor-pointer'
            type='button'
            gradientduotone='purpleToBlue'
            size='sm'
            outline
            onClick={handleUploadImage}
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Upload image'}
          </Button>
        </div>

        {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}

        {imageFileUrl && (
          <img
            src={imageFileUrl}
            alt='upload'
            className='w-full h-72 object-cover rounded-lg border border-gray-200 dark:border-gray-800'
          />
        )}

        <ReactQuill
          theme='snow'
          placeholder='Write something...'
          className='h-72 mb-12'
          required
        />
        <Button
          type='submit'
          gradientduotone='purpleToPink'
          className='cursor-pointer'
        >
          Publish
        </Button>
      </form>
    </div>
  );
}
