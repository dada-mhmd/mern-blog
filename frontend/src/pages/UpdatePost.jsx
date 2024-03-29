import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import { CircularProgressbar } from 'react-circular-progressbar';
import ReactQuill from 'react-quill';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';

import { app } from '../firebase';
import 'react-circular-progressbar/dist/styles.css';

import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const UpdatePost = () => {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);

  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const { postId } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        if (!res.ok) {
          toast.error(data.message);
          setPublishError(data.message);
        } else {
          setPublishError(null);
          setFormData(data.posts[0]);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchPosts();
  }, [postId]);

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }

      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '=' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Something went wrong');
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError(error.message);
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  //
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `/api/post/updatepost/${postId}/${currentUser._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        setPublishError(data.message);
        return;
      } else {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  return (
    <div className='p-3 max-w-3xl mx-auto'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Update Post</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Title'
            required
            id='title'
            className='flex-1'
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            id='category'
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value='uncategorized'>Select a category</option>
            <option value='html'>HTML</option>
            <option value='css'>CSS</option>
            <option value='javascript'>Javascript</option>
            <option value='reactjs'>React</option>
            <option value='nextjs'>Next js</option>
            <option value='nodejs'>Nodejs</option>
            <option value='expressjs'>Expressjs</option>
            <option value='mongodb'>MongoDB</option>
          </Select>
        </div>

        <div className='flex p-3 gap-4 items-center justify-between border-4 border-teal-500 border-dotted'>
          <FileInput
            accept='image/*'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type='button'
            gradientDuoTone='purpleToBlue'
            size='sm'
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={imageUploadProgress}
                  maxValue={100}
                  text={`${imageUploadProgress}%`}
                />
              </div>
            ) : (
              'Upload Image'
            )}
          </Button>
        </div>

        {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt='upload'
            className='w-full h-72 object-cover'
          />
        )}

        <ReactQuill
          theme='snow'
          placeholder='Write your post'
          className='h-72 mb-12 '
          required
          onChange={(value) => setFormData({ ...formData, content: value })}
          value={formData.content}
        />

        <Button type='submit' gradientDuoTone='purpleToPink'>
          Update post
        </Button>

        {publishError && <Alert color='failure'>{publishError}</Alert>}
      </form>
    </div>
  );
};

export default UpdatePost;
