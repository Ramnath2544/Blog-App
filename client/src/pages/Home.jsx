import { Link } from 'react-router-dom';
import CallToAction3D from '../components/CallToAction3D';
import Hero3D from '../components/Hero3D';
import { useEffect, useState } from 'react';
import PostCard3D from '../components/PostCard3D';
import { motion } from 'framer-motion';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section with 3D */}
      <Hero3D />

      {/* Call to Action Section */}
      <div className='max-w-7xl mx-auto px-6 py-16'>
        <CallToAction3D />
      </div>

      {/* Recent Posts Section */}
      <div className='max-w-7xl mx-auto px-6 py-16'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-12'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center space-y-4"
            >
              <h2 className='text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500'>
                Latest Articles
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                Explore our most recent insights, tutorials, and stories from the world of technology
              </p>
            </motion.div>

            <div className='flex flex-wrap justify-center gap-8'>
              {posts.map((post, index) => (
                <PostCard3D key={post._id} post={post} index={index} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Link to={'/search'}>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(6, 182, 212, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className='px-10 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300'
                >
                  View All Posts →
                </motion.button>
              </Link>
            </motion.div>
          </div>
        )}
      </div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 py-16"
      >
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: "🎨", title: "Beautiful Design", desc: "Modern and clean interface with smooth animations" },
            { icon: "⚡", title: "Lightning Fast", desc: "Optimized performance for the best user experience" },
            { icon: "🔒", title: "Secure & Safe", desc: "Your data is protected with enterprise-grade security" }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              whileHover={{ y: -10, scale: 1.03 }}
              className="p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
