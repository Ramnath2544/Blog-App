import { useSelector, useDispatch } from 'react-redux';
import { Button, TextInput, Alert } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { avatarUrl } from '../constants/defaultAvatarUrl';
import {
  updateStart,
  updateSuccess,
  updateFailure,
} from '../redux/user/userSlice';

export default function DashProfile() {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [formDataUpdate, setFormDataUpdate] = useState({});
  const [updateSuccessMsg, setUpdateSuccessMsg] = useState(null);

  const filePickerRef = useRef();
  const dispatch = useDispatch();

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
      setImageFileUploadError(null);
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
        // ADDED: Include the new image URL in the form data so it gets updated in the database
        setFormDataUpdate((prev) => ({
          ...prev,
          profilePicture: data.imageUrl,
        }));
        setIsUploading(false);
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

  const handleChange = (e) => {
    setFormDataUpdate({ ...formDataUpdate, [e.target.id]: e.target.value });
    // Clear previous success messages when the user starts typing again
    setUpdateSuccessMsg(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateSuccessMsg(null);

    // Prevent submission if nothing was changed (neither text fields nor image)
    if (Object.keys(formDataUpdate).length === 0) {
      dispatch(
        updateFailure(
          'No changes to update. Please edit at least one field or choose a new image.',
        ),
      );
      return;
    }

    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataUpdate),
      });

      const contentType = res.headers.get('content-type') || '';
      const data = contentType.includes('application/json')
        ? await res.json()
        : await res.text();

      // FIXED: Added missing closing brace and properly structured the if/else
      if (!res.ok) {
        dispatch(updateFailure(data?.message || data));
      } else {
        dispatch(updateSuccess(data));
        setUpdateSuccessMsg('User profile updated successfully');
        setFormDataUpdate({}); // Clear form update state after success
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  };

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='text-center font-semibold text-3xl my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
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
            src={imageFileUrl || avatarUrl(currentUser.profilePicture)}
            alt='user'
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${isUploading ? 'opacity-50' : ''}`}
          />
        </div>

        {imageFileUploadError && (
          <Alert color='failure'>{imageFileUploadError}</Alert>
        )}

        <TextInput
          type='text'
          id='username'
          placeholder='username'
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type='email'
          id='email'
          placeholder='email'
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type='password'
          id='password'
          placeholder='password'
          onChange={handleChange}
        />

        <Button
          type='submit'
          gradientduotone='purpleToBlue'
          outline
          disabled={loading || isUploading}
        >
          {loading
            ? 'Loading...'
            : isUploading
              ? 'Uploading Image...'
              : 'Update Profile'}
        </Button>
      </form>

      {updateSuccessMsg && (
        <Alert color='success' className='mt-5'>
          {updateSuccessMsg}
        </Alert>
      )}

      {error && (
        <Alert color='failure' className='mt-5'>
          {error}
        </Alert>
      )}

      <div className='text-red-500 flex justify-between mt-5'>
        <span className='cursor-pointer hover:underline'>Delete Account</span>
        <span className='cursor-pointer hover:underline'>Sign Out</span>
      </div>
    </div>
  );
}
