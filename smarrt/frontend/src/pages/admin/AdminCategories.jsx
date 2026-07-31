import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTags, FaCode, FaChartBar, FaPalette, FaBullhorn, FaBriefcase, FaCamera } from 'react-icons/fa';

const categoriesData = [
  { name: 'Web Development', description: 'Learn modern web technologies', icon: FaCode, color: '#4F46E5', courses: 4 },
  { name: 'Data Science', description: 'Master data analysis and ML', icon: FaChartBar, color: '#7C3AED', courses: 2 },
  { name: 'Design', description: 'UI/UX and graphic design', icon: FaPalette, color: '#06B6D4', courses: 1 },
  { name: 'Marketing', description: 'Digital marketing strategies', icon: FaBullhorn, color: '#F59E0B', courses: 1 },
  { name: 'Business', description: 'Entrepreneurship and management', icon: FaBriefcase, color: '#10B981', courses: 1 },
  { name: 'Photography', description: 'Professional photography skills', icon: FaCamera, color: '#EF4444', courses: 1 },
];

const AdminCategories = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoriesData.map((cat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="card p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: cat.color + '20' }}>
                <cat.icon className="text-2xl" style={{ color: cat.color }} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 dark:text-white">{cat.name}</h3>
                <p className="text-sm text-gray-500">{cat.description}</p>
                <p className="text-xs text-primary-500 font-medium mt-1">{cat.courses} courses</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminCategories;
