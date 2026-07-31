import { useAuth } from '../../context/AuthContext';
import { FaUser, FaEnvelope, FaShieldAlt } from 'react-icons/fa';

const AdminProfile = () => {
  const { user } = useAuth();
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="card p-8 text-center">
        <img src={`https://ui-avatars.com/api/?name=${user?.name}&background=4F46E5&color=fff&size=96`} alt={user?.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-primary-100" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{user?.name}</h2>
        <p className="text-gray-500">{user?.email}</p>
        <span className="inline-block mt-2 px-4 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-medium rounded-full">Administrator</span>
      </div>
      <div className="card p-6 space-y-4">
        <h3 className="font-bold text-gray-800 dark:text-white">Account Details</h3>
        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl"><FaUser className="text-gray-400" /><div><p className="text-xs text-gray-500">Name</p><p className="font-medium text-gray-800 dark:text-white">{user?.name}</p></div></div>
        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl"><FaEnvelope className="text-gray-400" /><div><p className="text-xs text-gray-500">Email</p><p className="font-medium text-gray-800 dark:text-white">{user?.email}</p></div></div>
        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl"><FaShieldAlt className="text-gray-400" /><div><p className="text-xs text-gray-500">Role</p><p className="font-medium text-gray-800 dark:text-white capitalize">{user?.role}</p></div></div>
      </div>
    </div>
  );
};

export default AdminProfile;
