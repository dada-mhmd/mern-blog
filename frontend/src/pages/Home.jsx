import { Link } from 'react-router-dom';
import CTA from './../components/CTA';
import { useEffect, useState } from 'react';
import PostCard from './../components/PostCard';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/post/getPosts');
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <div className='flex flex-col gap-6 px-3 p-28 max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to my Blog</h1>
        <p className='text-gray-500 text-xs sm:text-sm'>
          This is a blog website where you can learn more about web development,
          programming languages and share your thoughts
        </p>

        <Link
          to={'/search'}
          className='text-xs sm:text-sm text-teal-500 font-bold hover:underline'
        >
          View all posts
        </Link>
      </div>

      {/* call to action */}
      <div className='p-3 bg-amber-100 dark:bg-slate-700'>
        <CTA />
      </div>

      {/*  */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='flex flex-wrap gap-4'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>

            <Link
              to={`/search`}
              className='text-lg text-teal-500 hover:underline text-center dark:text-white'
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
