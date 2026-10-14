import { Button, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard3D from '../components/PostCard3D';
import { motion } from 'framer-motion';

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
    category: 'uncategorized',
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    const categoryFromUrl = urlParams.get('category');
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData((prev) => ({
        ...prev,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      }));
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === 'searchTerm') {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === 'sort') {
      const order = e.target.value || 'desc';
      setSidebarData({ ...sidebarData, sort: order });
    }
    if (e.target.id === 'category') {
      const category = e.target.value || 'uncategorized';
      setSidebarData({ ...sidebarData, category });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('sort', sidebarData.sort);
    urlParams.set('category', sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${searchQuery}`);
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setPosts([...posts, ...data.posts]);
      if (data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
      <div className='flex flex-col md:flex-row max-w-7xl mx-auto'>
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className='p-7 md:min-h-screen md:w-80'
        >
          <div className="sticky top-24 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-500">
              Search Filters
            </h2>
            
            <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
              <div className='flex flex-col gap-2'>
                <label className='font-semibold text-gray-700 dark:text-gray-300'>
                  Search Term
                </label>
                <TextInput
                  placeholder='Search posts...'
                  id='searchTerm'
                  type='text'
                  value={sidebarData.searchTerm}
                  onChange={handleChange}
                  className="border-2 focus:border-purple-500 transition-all"
                />
              </div>

              <div className='flex flex-col gap-2'>
                <label className='font-semibold text-gray-700 dark:text-gray-300'>
                  Sort By
                </label>
                <Select 
                  onChange={handleChange} 
                  value={sidebarData.sort} 
                  id='sort'
                  className="border-2 focus:border-purple-500 transition-all"
                >
                  <option value='desc'>Latest First</option>
                  <option value='asc'>Oldest First</option>
                </Select>
              </div>

              <div className='flex flex-col gap-2'>
                <label className='font-semibold text-gray-700 dark:text-gray-300'>
                  Category
                </label>
                <Select
                  onChange={handleChange}
                  value={sidebarData.category}
                  id='category'
                  className="border-2 focus:border-purple-500 transition-all"
                >
                  <option value='uncategorized'>All Categories</option>
                  <option value='reactjs'>React.js</option>
                  <option value='nextjs'>Next.js</option>
                  <option value='javascript'>JavaScript</option>
                </Select>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  type='submit' 
                  className='w-full bg-gradient-to-r from-cyan-500 to-purple-500 border-0 cursor-pointer'
                  gradientduotone='purpleToPink'
                >
                  Apply Filters
                </Button>
              </motion.div>
            </form>
          </div>
        </motion.div>

        {/* Results */}
        <div className='flex-1 p-7'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className='text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-purple-500 mb-2'>
              Search Results
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {!loading && posts.length > 0 && `Found ${posts.length} article${posts.length !== 1 ? 's' : ''}`}
            </p>
          </motion.div>

          <div className='flex flex-wrap justify-center gap-8'>
            {!loading && posts.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-20"
              >
                <div className="text-6xl mb-4">🔍</div>
                <p className='text-2xl text-gray-500 dark:text-gray-400 font-semibold'>No posts found</p>
                <p className="text-gray-400 dark:text-gray-500 mt-2">Try adjusting your search filters</p>
              </motion.div>
            )}

            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"
                />
                <p className='text-xl text-gray-500 dark:text-gray-400'>Loading amazing content...</p>
              </motion.div>
            )}

            {!loading && posts && posts.map((post, index) => (
              <PostCard3D key={post._id} post={post} index={index} />
            ))}
          </div>

          {showMore && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mt-12"
            >
              <motion.button
                onClick={handleShowMore}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='px-10 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300'
              >
                Load More Posts
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
