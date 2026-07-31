import { useTheme } from '../../context/ThemeContext';
import { FaMoon, FaSun, FaBell, FaShieldAlt, FaPalette } from 'react-icons/fa';

const SettingsPage = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Settings</h2>

      <div className="card p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2"><FaPalette /> Appearance</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-800 dark:text-white">Dark Mode</p>
            <p className="text-sm text-gray-500">Toggle dark theme</p>
          </div>
          <button onClick={toggleTheme} className={`relative w-14 h-7 rounded-full transition-colors ${darkMode ? 'bg-primary-500' : 'bg-gray-300'}`}>
            <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform ${darkMode ? 'translate-x-7' : 'translate-x-0.5'}`} />
          </button>
        </div>
      </div>

      <div className="card p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2"><FaBell /> Notifications</h3>
        {['Email Notifications', 'Course Updates', 'Promotional Emails'].map((item) => (
          <div key={item} className="flex items-center justify-between">
            <p className="text-gray-700 dark:text-gray-300">{item}</p>
            <label className="relative w-14 h-7 rounded-full bg-primary-500 cursor-pointer">
              <div className="absolute top-0.5 translate-x-7 w-6 h-6 bg-white rounded-full shadow" />
            </label>
          </div>
        ))}
      </div>

      <div className="card p-6 space-y-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2"><FaShieldAlt /> Security</h3>
        <div className="space-y-3">
          <button className="w-full text-left p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <p className="font-medium text-gray-800 dark:text-white">Change Password</p>
            <p className="text-sm text-gray-500">Update your password regularly for security</p>
          </button>
          <button className="w-full text-left p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <p className="font-medium text-gray-800 dark:text-white">Two-Factor Authentication</p>
            <p className="text-sm text-gray-500">Add an extra layer of security</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
