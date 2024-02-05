import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import LoadingSpinner from './../components/LoadingSpinner';
import { Button } from 'flowbite-react';
import CTA from '../components/CTA';
import Comment from '../components/Comment';
import PostCard from '../components/PostCard';

const Post = () => {
  const { postSlug } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await fetch(`/api/post/getPosts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setLoading(false);
          setError(true);
          return;
        } else {
          setLoading(false);
          setPost(data.posts[0]);
          setError(false);
        }
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(`/api/post/getPosts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchRecentPosts();
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <section className='p-3 flex flex-col max-w-6xl mx-auto'>
      <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>
        {post?.title}
      </h1>

      <Link
        to={`/search?category=${post?.category}`}
        className='self-center mt-5'
      >
        <Button color='gray' pill size={'xs'}>
          {post?.category}
        </Button>
      </Link>

      <img
        src={post?.image}
        alt={post?.title}
        className='mt-10 p-3 max-h-[600px] w-full object-cover'
      />

      <div className='flex justify-between items-center p-3 border-b border-b-slate-500 mx-auto w-full max-w-2xl text-xs'>
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className='italic'>
          {post && (post?.content?.length / 1000).toFixed(0)} mins read
        </span>
      </div>

      <div
        className='p-3 max-w-2xl w-full mx-auto post-content'
        dangerouslySetInnerHTML={{ __html: post && post?.content }}
      />

      {/* CTA */}
      <div className='max-w-4xl mx-auto w-full'>
        <CTA />
      </div>

      {/* comment */}
      <Comment postId={post?._id} />

      {/* recent articles */}
      <div className='flex flex-col justify-center items-center my-10'>
        <h1 className='text-xl sm:text-3xl mt-5'>Recent Articles</h1>

        <div className='flex flex-wrap gap-5 mt-5 justify-center'>
          {recentPosts &&
            recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </div>
    </section>
  );
};

export default Post;
