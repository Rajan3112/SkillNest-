import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaSearch } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="relative mb-8">
          <h1 className="text-[150px] md:text-[200px] font-black gradient-text leading-none">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <FaSearch className="text-4xl text-gray-300 dark:text-gray-600 mt-12" />
          </div>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">Page Not Found</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/" className="btn-primary flex items-center gap-2">
            <FaHome /> Back to Home
          </Link>
          <Link to="/courses" className="btn-secondary">
            Browse Courses
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
