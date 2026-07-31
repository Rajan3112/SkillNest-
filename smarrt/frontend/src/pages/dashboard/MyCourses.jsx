import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBookOpen, FaClock, FaCheckCircle } from 'react-icons/fa';
import API from '../../services/api';
import LoadingSkeleton from '../../components/LoadingSkeleton';

const MyCourses = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await API.get('/enroll/mycourses');
        setEnrollments(data.enrollments || []);
      } catch (error) { /* empty */ }
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  if (loading) return <LoadingSkeleton count={4} />;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">My Courses</h2>
      {enrollments.length === 0 ? (
        <div className="card p-12 text-center">
          <FaBookOpen className="text-4xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400 mb-4">No courses enrolled yet.</p>
          <Link to="/courses" className="btn-primary inline-block">Explore Courses</Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {enrollments.map((enrollment, i) => (
            <motion.div key={enrollment._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="card p-4 flex flex-col md:flex-row gap-4 items-start">
              <img src={enrollment.course?.image} alt={enrollment.course?.title} className="w-full md:w-48 h-32 object-cover rounded-xl" />
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 dark:text-white text-lg mb-1">{enrollment.course?.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{enrollment.course?.instructor}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <span className="flex items-center gap-1 text-gray-500"><FaClock className="text-xs" /> {enrollment.course?.duration}</span>
                  <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${enrollment.status === 'completed' ? 'bg-green-100 text-green-600 dark:bg-green-900/30' : 'bg-primary-100 text-primary-600 dark:bg-primary-900/30'}`}>
                    {enrollment.status === 'completed' ? <FaCheckCircle className="text-xs" /> : null} {enrollment.status}
                  </span>
                </div>
              </div>
              <Link to={`/courses/${enrollment.course?._id}`} className="btn-primary text-sm py-2 px-4 whitespace-nowrap">Continue</Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
