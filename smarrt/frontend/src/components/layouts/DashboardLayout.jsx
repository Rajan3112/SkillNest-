import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaBook, FaUser, FaCog, FaSignOutAlt, FaBars, FaTimes, FaGraduationCap, FaMoon, FaSun } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import LogoutModal from '../LogoutModal';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: FaHome },
    { name: 'My Courses', path: '/dashboard/courses', icon: FaBook },
    { name: 'Profile', path: '/dashboard/profile', icon: FaUser },
    { name: 'Settings', path: '/dashboard/settings', icon: FaCog },
  ];

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    logout();
    setShowLogoutModal(false);
    navigate('/');
  };

  return (
    <>
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center gap-2 p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
            <FaGraduationCap className="text-white text-xl" />
          </div>
          <span className="text-xl font-bold gradient-text">SkillNest</span>
        </div>

        <div className="p-4">
          <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-4 text-white">
            <img
              src={user?.avatar?.includes('ui-avatars.com') ? user.avatar + user?.name : user?.avatar}
              alt={user?.name}
              className="w-12 h-12 rounded-full mb-3 border-2 border-white/30"
              onError={(e) => { e.target.src = `https://ui-avatars.com/api/?background=4F46E5&color=fff&name=${user?.name}`; }}
            />
            <p className="font-semibold text-sm">{user?.name}</p>
            <p className="text-xs text-white/70">{user?.email}</p>
          </div>
        </div>

        <nav className="px-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-semibold'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }`}
              >
                <item.icon className="text-lg" />
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <button onClick={toggleTheme} className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 w-full transition-all">
            {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}
            <span className="text-sm">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 w-full transition-all">
            <FaSignOutAlt />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 lg:ml-64">
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700">
            <FaBars />
          </button>
          <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {menuItems.find((item) => item.path === location.pathname)?.name || 'Dashboard'}
          </h1>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-sm text-gray-500 hover:text-primary-500 transition-colors">
              Back to Home
            </Link>
          </div>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>

    <LogoutModal
      isOpen={showLogoutModal}
      onConfirm={confirmLogout}
      onCancel={() => setShowLogoutModal(false)}
    />
  </>
  );
};

export default DashboardLayout;
