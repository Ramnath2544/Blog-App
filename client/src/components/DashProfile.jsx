import { useSelector } from 'react-redux';
import { Button, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const filePickerRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setImageFileUploadError(
          'Could not upload image (File must be less than 2MB)',
        );
        return;
      }
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
      setImageFileUploadError(null); //
    }
  };

  useEffect(() => {
    const uploadImage = async () => {
      setIsUploading(true);
      setImageFileUploadError(null);

      try {
        const formData = new FormData();
        formData.append('image', imageFile);

        const response = await fetch('/api/upload-image', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          setImageFileUploadError(data.error || 'Could not upload image');
          setIsUploading(false);
          return;
        }

        setImageFileUrl(data.imageUrl);
        setIsUploading(false);
        console.log('Cloudinary URL:', data.imageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);

        setImageFileUploadError('Network error: Could not upload image.');
        setIsUploading(false);
      }
    };

    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='text-center font-semibold text-3xl my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className='w-32 h-32 self-center cursor-pointer overflow-hidden rounded-full shadow-md'
          onClick={() => filePickerRef.current.click()}
        >
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt='user'
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${isUploading ? 'opacity-50' : ''}`}
          />
        </div>

        {imageFileUploadError && (
          <div className='text-red-500 text-sm text-center'>
            {imageFileUploadError}
          </div>
        )}

        <TextInput
          type='text'
          id='username'
          placeholder='username'
          defaultValue={currentUser.username}
        />
        <TextInput
          type='email'
          id='email'
          placeholder='email'
          defaultValue={currentUser.email}
        />
        <TextInput type='password' id='password' placeholder='password' />
        <Button
          type='submit'
          gradientduotone='purpleToBlue'
          outline
          disabled={isUploading}
        >
          {isUploading ? 'Uploading Image...' : 'Update Profile'}
        </Button>
      </form>
      <div className='text-red-500 flex justify-between mt-5'>
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
      </div>
    </div>
  );
}
