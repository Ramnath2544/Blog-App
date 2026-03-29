import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import { useRef, useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

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
        credentials: 'include', // Crucial for sending HTTP-only cookies to prevent 401 Unauthorized
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
      setFormData({ ...formData, image: data.imageUrl });
      setIsUploading(false);
    } catch (err) {
      setImageUploadError(
        err.message || 'Network error: Could not upload image',
      );
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Crucial for sending HTTP-only cookies to prevent 401 Unauthorized
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        setPublishError(
          data.message || 'Something went wrong while publishing.',
        );
        return;
      }

      if (res.ok) {
        setPublishError(null);
        // Redirect the user to the newly created post using its slug
        navigate(`/post/${data.slug}`);
      }
    } catch {
      setPublishError('Something went wrong while publishing.');
    }
  };

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-3xl font-semibold text-center my-7'>Create a post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Title'
            required
            id='title'
            className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            id='category'
            required
            className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
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
            gradientDuoTone='purpleToBlue'
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
          onChange={(value) => setFormData({ ...formData, content: value })}
        />

        <Button
          type='submit'
          gradientDuoTone='purpleToPink'
          className='cursor-pointer'
        >
          Publish
        </Button>

        {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
