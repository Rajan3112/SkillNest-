import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBookOpen, FaCertificate, FaClock, FaTrophy, FaArrowRight } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import API from '../../services/api';
import LoadingSkeleton from '../../components/LoadingSkeleton';

const DashboardOverview = () => {
  const { user } = useAuth();
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

  const stats = [
    { label: 'Total Courses', value: enrollments.length, icon: FaBookOpen, color: 'from-primary-500 to-primary-600' },
    { label: 'Completed', value: enrollments.filter((e) => e.status === 'completed').length, icon: FaTrophy, color: 'from-green-500 to-green-600' },
    { label: 'In Progress', value: enrollments.filter((e) => e.status === 'active').length, icon: FaClock, color: 'from-accent-500 to-accent-600' },
    { label: 'Certificates', value: enrollments.filter((e) => e.status === 'completed').length, icon: FaCertificate, color: 'from-secondary-500 to-secondary-600' },
  ];

  if (loading) return <LoadingSkeleton type="stat" />;

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-6 md:p-8 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h2>
        <p className="text-white/80">Continue your learning journey. You have {enrollments.length} course{enrollments.length !== 1 ? 's' : ''} enrolled.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="card p-6">
            <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
              <stat.icon className="text-white text-xl" />
            </div>
            <p className="text-3xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">Recently Enrolled</h3>
          <Link to="/dashboard/courses" className="text-primary-500 hover:text-primary-600 text-sm font-medium flex items-center gap-1">
            View All <FaArrowRight className="text-xs" />
          </Link>
        </div>
        {enrollments.length === 0 ? (
          <div className="card p-12 text-center">
            <FaBookOpen className="text-4xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 mb-4">You haven't enrolled in any courses yet.</p>
            <Link to="/courses" className="btn-primary inline-block">Browse Courses</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {enrollments.slice(0, 3).map((enrollment, i) => (
              <motion.div key={enrollment._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="card overflow-hidden">
                <img src={enrollment.course?.image} alt={enrollment.course?.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h4 className="font-semibold text-gray-800 dark:text-white text-sm mb-2 line-clamp-2">{enrollment.course?.title}</h4>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${enrollment.status === 'completed' ? 'bg-green-100 text-green-600 dark:bg-green-900/30' : 'bg-primary-100 text-primary-600 dark:bg-primary-900/30'}`}>
                      {enrollment.status}
                    </span>
                    <Link to={`/courses/${enrollment.course?._id}`} className="text-primary-500 text-xs font-medium hover:underline">Continue</Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardOverview;
