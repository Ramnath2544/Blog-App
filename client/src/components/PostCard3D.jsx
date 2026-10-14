import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function PostCard3D({ post, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.3 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative w-full sm:w-[350px] lg:w-[400px]"
    >
      <div className="relative h-[450px] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform-gpu perspective-1000">
        {/* Gradient Border Effect */}
        <motion.div
          animate={isHovered ? {
            background: [
              'linear-gradient(45deg, #06b6d4, #8b5cf6)',
              'linear-gradient(90deg, #8b5cf6, #ec4899)',
              'linear-gradient(135deg, #ec4899, #06b6d4)',
              'linear-gradient(45deg, #06b6d4, #8b5cf6)'
            ]
          } : {}}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 p-[2px] rounded-2xl"
        >
          <div className="h-full w-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden">
            {/* Image Container with Parallax Effect */}
            <Link to={`/post/${post.slug}`}>
              <motion.div 
                className="relative h-[280px] overflow-hidden"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={post.image}
                  alt='post cover'
                  className='w-full h-full object-cover'
                />
                
                {/* Overlay Gradient */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                />

                {/* Category Badge */}
                <motion.div
                  initial={{ x: -100 }}
                  animate={{ x: 0 }}
                  className="absolute top-4 left-4"
                >
                  <span className="px-4 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500 shadow-lg">
                    {post.category}
                  </span>
                </motion.div>

                {/* Reading Time Badge */}
                <motion.div
                  initial={{ x: 100 }}
                  animate={{ x: 0 }}
                  className="absolute top-4 right-4"
                >
                  <span className="px-3 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-xs font-semibold shadow-lg">
                    📚 5 min read
                  </span>
                </motion.div>
              </motion.div>
            </Link>

            {/* Content Section */}
            <div className="p-6 space-y-3">
              <motion.h3
                className="text-xl font-bold line-clamp-2 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 min-h-[56px]"
              >
                {post.title}
              </motion.h3>

              {/* Author Info (if available) */}
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                  {post.author?.charAt(0) || 'B'}
                </div>
                <div>
                  <p className="font-medium">{post.author || 'Blogify Team'}</p>
                  <p className="text-xs">{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                </div>
              </div>

              {/* Action Button */}
              <Link to={`/post/${post.slug}`}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-4 py-3 px-6 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>Read Article</span>
                  <motion.span
                    animate={{ x: isHovered ? 5 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    →
                  </motion.span>
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* 3D Shadow Effect */}
        <motion.div
          animate={isHovered ? {
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.05, 1],
          } : { opacity: 0.2 }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-[90%] h-8 bg-gradient-to-r from-cyan-500/50 to-purple-500/50 blur-2xl rounded-full"
        />
      </div>
    </motion.div>
  );
}
