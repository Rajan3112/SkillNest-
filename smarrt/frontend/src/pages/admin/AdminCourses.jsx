import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaTimes, FaSave } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import API from '../../services/api';
import LoadingSkeleton from '../../components/LoadingSkeleton';

const categories = ['Web Development', 'Data Science', 'Design', 'Marketing', 'Business', 'Photography'];
const levels = ['Beginner', 'Intermediate', 'Advanced'];

const emptyForm = { title: '', description: '', price: '', category: 'Web Development', duration: '', image: '', instructor: '', rating: '4.5', level: 'Beginner', featured: false };

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: emptyForm });

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 10 };
      if (search) params.search = search;
      const { data } = await API.get('/courses', { params });
      setCourses(data.courses || []);
      setTotalPages(data.pages || 1);
    } catch (error) { /* empty */ }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchCourses(); }, [page, search]);

  const onSubmit = async (formData) => {
    try {
      const payload = { ...formData, price: Number(formData.price), rating: Number(formData.rating) };
      if (editingId) {
        await API.put(`/courses/${editingId}`, payload);
        toast.success('Course updated!');
      } else {
        await API.post('/courses', payload);
        toast.success('Course created!');
      }
      setShowModal(false);
      setEditingId(null);
      reset(emptyForm);
      fetchCourses();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (course) => {
    setEditingId(course._id);
    reset({ ...course, price: String(course.price), rating: String(course.rating) });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    try {
      await API.delete(`/courses/${id}`);
      toast.success('Course deleted!');
      fetchCourses();
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Manage Courses</h2>
        <button onClick={() => { setEditingId(null); reset(emptyForm); setShowModal(true); }} className="btn-primary flex items-center gap-2 text-sm">
          <FaPlus /> Add Course
        </button>
      </div>

      <div className="card p-4">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search courses..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="input-field pl-11" />
        </div>
      </div>

      {loading ? <LoadingSkeleton count={5} /> : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Course</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Price</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Rating</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {courses.map((course) => (
                  <tr key={course._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={course.image} alt={course.title} className="w-12 h-12 rounded-lg object-cover" />
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white text-sm line-clamp-1">{course.title}</p>
                          <p className="text-xs text-gray-500">{course.instructor}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3"><span className="px-2 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs rounded-full">{course.category}</span></td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-white">₹{course.price.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{course.rating}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleEdit(course)} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"><FaEdit /></button>
                        <button onClick={() => handleDelete(course._id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"><FaTrash /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {courses.length === 0 && <p className="text-center py-8 text-gray-500">No courses found.</p>}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">{editingId ? 'Edit Course' : 'Create Course'}</h3>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"><FaTimes /></button>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                    <input className="input-field" {...register('title', { required: 'Required', minLength: 5 })} />
                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Instructor</label>
                    <input className="input-field" {...register('instructor', { required: 'Required' })} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                  <textarea className="input-field" rows="3" {...register('description', { required: 'Required', minLength: 20 })} />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price (₹)</label>
                    <input type="number" className="input-field" {...register('price', { required: 'Required', min: 0 })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Duration</label>
                    <input className="input-field" placeholder="e.g. 42 hours" {...register('duration', { required: 'Required' })} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                    <select className="input-field" {...register('category')}>
                      {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Level</label>
                    <select className="input-field" {...register('level')}>
                      {levels.map((l) => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rating</label>
                    <input type="number" step="0.1" min="0" max="5" className="input-field" {...register('rating')} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
                    <input className="input-field" {...register('image')} />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="featured" className="rounded text-primary-500" {...register('featured')} />
                  <label htmlFor="featured" className="text-sm text-gray-700 dark:text-gray-300">Featured Course</label>
                </div>
                <div className="flex gap-3 pt-4">
                  <button type="submit" className="btn-primary flex items-center gap-2"><FaSave /> {editingId ? 'Update' : 'Create'}</button>
                  <button type="button" onClick={() => setShowModal(false)} className="btn-secondary">Cancel</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminCourses;
