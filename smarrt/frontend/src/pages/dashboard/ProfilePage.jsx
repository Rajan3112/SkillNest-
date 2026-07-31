import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FaUser, FaEnvelope, FaPhone, FaEdit, FaSave } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { name: user?.name, phone: user?.phone || '', bio: user?.bio || '' },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await updateProfile(data);
      toast.success('Profile updated!');
      setEditing(false);
    } catch (error) {
      toast.error('Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-6 text-center">
        <img
          src={user?.avatar?.includes('ui-avatars.com') ? user.avatar + user?.name : user?.avatar}
          alt={user?.name}
          className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-primary-100"
          onError={(e) => { e.target.src = `https://ui-avatars.com/api/?background=4F46E5&color=fff&name=${user?.name}&size=96`; }}
        />
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">{user?.name}</h2>
        <p className="text-gray-500 dark:text-gray-400">{user?.email}</p>
        <span className="inline-block mt-2 px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-medium rounded-full capitalize">{user?.role}</span>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">Profile Information</h3>
          <button onClick={() => setEditing(!editing)} className="flex items-center gap-2 text-primary-500 hover:text-primary-600 text-sm font-medium">
            {editing ? <><FaSave /> Save</> : <><FaEdit /> Edit</>}
          </button>
        </div>

        {editing ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
              <input type="text" className="input-field" {...register('name', { required: 'Name is required' })} />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
              <input type="text" className="input-field" {...register('phone')} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
              <textarea className="input-field" rows="3" {...register('bio', { maxLength: { value: 500, message: 'Max 500 chars' } })} />
            </div>
            <button type="submit" disabled={loading} className="btn-primary disabled:opacity-50">
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <FaUser className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium text-gray-800 dark:text-white">{user?.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-800 dark:text-white">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FaPhone className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium text-gray-800 dark:text-white">{user?.phone || 'Not set'}</p>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
              <p className="text-sm text-gray-500 mb-1">Bio</p>
              <p className="text-gray-800 dark:text-white">{user?.bio || 'No bio yet.'}</p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ProfilePage;
