import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaBookOpen, FaDollarSign, FaClipboardList, FaArrowUp } from 'react-icons/fa';
import API from '../../services/api';
import LoadingSkeleton from '../../components/LoadingSkeleton';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalCourses: 0, totalEnrollments: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await API.get('/stats');
        setStats(data.stats || {});
      } catch (error) { /* empty */ }
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  const cards = [
    { label: 'Total Users', value: stats.totalUsers, icon: FaUsers, color: 'from-primary-500 to-primary-600', change: '+12%' },
    { label: 'Total Courses', value: stats.totalCourses, icon: FaBookOpen, color: 'from-secondary-500 to-secondary-600', change: '+8%' },
    { label: 'Revenue', value: `₹${(stats.revenue || 0).toLocaleString()}`, icon: FaDollarSign, color: 'from-green-500 to-green-600', change: '+23%' },
    { label: 'Enrollments', value: stats.totalEnrollments, icon: FaClipboardList, color: 'from-accent-500 to-accent-600', change: '+15%' },
  ];

  if (loading) return <LoadingSkeleton type="stat" />;

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-2xl p-6 md:p-8 text-white">
        <h2 className="text-2xl font-bold mb-2">Admin Dashboard</h2>
        <p className="text-white/80">Overview of your platform performance and analytics.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center`}>
                <card.icon className="text-white text-xl" />
              </div>
              <span className="flex items-center gap-1 text-green-500 text-xs font-medium">
                <FaArrowUp className="text-xs" /> {card.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{card.value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{card.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {['New student registered', 'Course updated: React Bootcamp', 'New enrollment in Data Science', 'Payment received: ₹4,999', 'Course completed by student'].map((activity, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div className="w-2 h-2 bg-primary-500 rounded-full" />
                <p className="text-sm text-gray-600 dark:text-gray-300">{activity}</p>
                <span className="ml-auto text-xs text-gray-400">{i + 1}h ago</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Top Categories</h3>
          <div className="space-y-4">
            {[{ name: 'Web Development', count: 4, pct: 45 }, { name: 'Data Science', count: 2, pct: 30 }, { name: 'Design', count: 1, pct: 15 }, { name: 'Marketing', count: 1, pct: 10 }].map((cat, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{cat.name}</span>
                  <span className="text-gray-500">{cat.count} courses</span>
                </div>
                <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                  <div className="h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full" style={{ width: `${cat.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
