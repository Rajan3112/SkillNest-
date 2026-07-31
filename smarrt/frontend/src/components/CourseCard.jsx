import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaClock, FaUser, FaArrowRight } from 'react-icons/fa';

const CourseCard = ({ course, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card overflow-hidden group"
    >
      <div className="relative overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-primary-600 dark:text-primary-400 text-xs font-semibold rounded-full">
            {course.category}
          </span>
        </div>
        {course.featured && (
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 bg-accent-500 text-white text-xs font-semibold rounded-full">
              Featured
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-bold text-gray-800 dark:text-gray-100 text-lg mb-2 line-clamp-2 group-hover:text-primary-500 transition-colors">
          {course.title}
        </h3>

        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
          <FaUser className="text-xs" />
          <span>{course.instructor}</span>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
          <span className="flex items-center gap-1">
            <FaClock className="text-xs text-accent-500" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <FaStar className="text-xs text-yellow-400" />
            {course.rating}
          </span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
          <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
            ₹{course.price.toLocaleString()}
          </span>
          <Link
            to={`/courses/${course._id}`}
            className="flex items-center gap-1 text-sm font-medium text-primary-500 hover:text-primary-600 transition-colors group/link"
          >
            Enroll <FaArrowRight className="text-xs group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
