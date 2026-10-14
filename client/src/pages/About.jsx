import CallToAction3D from '../components/CallToAction3D';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from '@react-three/drei';

function AboutSphere() {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere args={[1, 100, 200]} scale={1.8}>
        <MeshDistortMaterial
          color="#ec4899"
          attach="material"
          distort={0.4}
          speed={1.5}
          roughness={0.3}
          metalness={0.7}
        />
      </Sphere>
    </Float>
  );
}

export default function About() {
  const features = [
    { emoji: '💻', title: 'Web Development', desc: 'Modern frameworks and best practices' },
    { emoji: '🚀', title: 'Software Engineering', desc: 'Scalable architecture patterns' },
    { emoji: '📚', title: 'Programming Languages', desc: 'Deep dives into JavaScript, Python & more' },
    { emoji: '🎨', title: 'UI/UX Design', desc: 'Creating beautiful user experiences' },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-b from-white via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900'>
      {/* Hero Section */}
      <div className="relative overflow-hidden py-20">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className='max-w-6xl mx-auto px-6 relative z-10'>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 leading-tight'
              >
                About Blogify
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className='text-lg text-gray-700 dark:text-gray-300 space-y-6 leading-relaxed'
              >
                <p>
                  Welcome to <span className="font-bold text-purple-600 dark:text-purple-400">Blogify</span>! This blog was created by Ramnath as a personal
                  project to share thoughts and ideas with the world. Ramnath is
                  a passionate developer who loves to write about technology,
                  coding, and everything in between.
                </p>

                <p>
                  On this blog, you'll find weekly articles and tutorials on topics
                  such as web development, software engineering, and programming
                  languages. We're always learning and exploring new
                  technologies, so be sure to check back often for new content!
                </p>

                <p>
                  We encourage you to leave comments on our posts and engage with
                  other readers. You can like other people's comments and reply to
                  them as well. We believe that a community of learners can help
                  each other grow and improve.
                </p>
              </motion.div>
            </motion.div>

            {/* Right 3D Canvas */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="h-[400px] hidden md:block"
            >
              <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ec4899" />
                <AboutSphere />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
              </Canvas>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500"
        >
          What We Cover
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-purple-100 dark:border-purple-900"
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: idx * 0.5,
                }}
                className="text-6xl mb-4"
              >
                {feature.emoji}
              </motion.div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '500+', label: 'Articles' },
            { value: '10K+', label: 'Readers' },
            { value: '50+', label: 'Topics' },
            { value: '100%', label: 'Free' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="text-center p-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-xl text-white"
            >
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm opacity-90">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className='max-w-6xl mx-auto px-6 py-16'>
        <CallToAction3D />
      </div>
    </div>
  );
}
