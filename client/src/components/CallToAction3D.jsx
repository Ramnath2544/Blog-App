import { motion } from 'framer-motion';

export default function CallToAction3D() {

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden rounded-3xl"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 dark:from-cyan-600 dark:via-purple-700 dark:to-pink-600">
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.8) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.8) 0%, transparent 50%)',
            backgroundSize: '100% 100%',
          }}
        />
      </div>

      <div className="relative z-10 grid md:grid-cols-2 gap-8 p-8 md:p-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="space-y-6"
        >
          <motion.div
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Master JavaScript
              <br />
              <span className="text-yellow-300">with 100 Projects</span>
            </h2>
          </motion.div>

          <p className="text-lg text-white/90 leading-relaxed">
            Take your JavaScript skills to the next level with hands-on projects, practical tutorials, and real-world applications.
          </p>

          <div className="flex flex-wrap gap-4">
            <motion.a
              href='https://www.100jsprojects.com'
              target='_blank'
              rel='noopener noreferrer'
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-cyan-600 font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-2"
            >
              <span>Explore Projects</span>
              <span className="text-xl">🚀</span>
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white font-bold rounded-full hover:bg-white/20 transition-all duration-300"
            >
              Learn More
            </motion.button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-3 pt-4">
            {['Beginner Friendly', 'Step-by-Step', 'Source Code'].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium"
              >
                ✓ {feature}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="relative h-[400px] hidden md:block"
        >
          {/* Floating Code Blocks */}
          <div className="relative h-full">
            {[
              { code: '{ }', top: '10%', left: '20%', delay: 0 },
              { code: '< />', top: '60%', left: '10%', delay: 0.2 },
              { code: 'const', top: '30%', right: '10%', delay: 0.4 },
              { code: '=>', top: '70%', right: '25%', delay: 0.6 },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 3 + idx,
                  repeat: Infinity,
                  delay: item.delay,
                  ease: "easeInOut"
                }}
                className="absolute p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20"
                style={{ top: item.top, left: item.left, right: item.right }}
              >
                <code className="text-2xl font-mono font-bold text-yellow-300">
                  {item.code}
                </code>
              </motion.div>
            ))}

            {/* Center Image with Glow */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-3xl overflow-hidden shadow-2xl border-4 border-white/30"
            >
              <img 
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJA6UFV6kBwQkGnmhpKTjNlTnO2WTq9WdjxA&s'
                alt="JavaScript"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-purple-500/30" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-32 bg-gradient-to-t from-white/20 to-transparent blur-3xl" />
    </motion.div>
  );
}
