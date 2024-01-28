import { Alert, Button, Textarea } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import CommentComp from './CommentComp';
// eslint-disable-next-line react/prop-types
const Comment = ({ postId }) => {
  const { currentUser } = useSelector((state) => state.user);

  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [commentError, setCommentError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) return;

    if (comment.length === 0) {
      setCommentError('Comment cannot be empty');
      return;
    }

    try {
      setCommentError(null);
      const res = await fetch('/api/comment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment('');
        toast.success('Comment added successfully');
        setComments([data, ...comments]);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchComments();
  }, [postId]);

  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
      {currentUser ? (
        <div className='flex items-center gap-1 my-5 text-gray-500 text-sm'>
          <p>Signed in as:</p>
          <img
            className='h-5 w-5 object-cover rounded-full'
            src={currentUser?.profilePicture}
            alt={currentUser?.username}
          />
          <Link to={'/dashboard?tab=profile'} className='text-xs text-cyan-600'>
            @{currentUser?.username}
          </Link>
        </div>
      ) : (
        <div className='text-sm my-5'>
          You must be signed in to comment.
          <Link to={'/login'} className='text-teal-600 ml-2'>
            Sign in
          </Link>
        </div>
      )}

      {/* comment section */}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className='border border-teal-500 rounded-md p-3'
        >
          <Textarea
            rows={3}
            maxLength={200}
            placeholder='Add a comment'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className='flex justify-between items-center mt-5'>
            <p className='text-gray-500 text-sm'>
              {200 - comment.length} characters left
            </p>
            <Button outline gradientDuoTone={'purpleToPink'} type='submit'>
              Submit
            </Button>
          </div>

          {commentError && (
            <Alert color='failure' className='mt-5 font-semibold'>
              {commentError}!
            </Alert>
          )}
        </form>
      )}

      {/* comments */}
      {comments.length === 0 ? (
        <p className='text-sm my-5'>No comments yet!</p>
      ) : (
        <>
          <div className='text-sm my-5 flex items-center gap-1'>
            <p>Comments</p>
            <div className='border border-gray-400 py-1 px-2 rounded-sm'>
              <p>{comments?.length}</p>
            </div>
          </div>

          {/* actual comments */}
          {comments?.map((comment) => (
            <CommentComp key={comment._id} comment={comment} />
          ))}
        </>
      )}
    </div>
  );
};

export default Comment;