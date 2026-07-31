import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaSearch } from 'react-icons/fa';
import API from '../../services/api';
import LoadingSkeleton from '../../components/LoadingSkeleton';

const AdminStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await API.get('/auth/users');
        setStudents(data.users || []);
      } catch (error) { /* empty */ }
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  const filtered = students.filter((s) => s.name?.toLowerCase().includes(search.toLowerCase()) || s.email?.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <LoadingSkeleton count={5} />;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Students</h2>
      <div className="card p-4">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search students..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-field pl-11" />
        </div>
      </div>
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Student</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Email</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filtered.map((student) => (
                <tr key={student._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={`https://ui-avatars.com/api/?name=${student.name}&background=4F46E5&color=fff`} alt="" className="w-10 h-10 rounded-full" />
                      <span className="font-medium text-gray-800 dark:text-white text-sm">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{student.email}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{new Date(student.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <FaUsers className="text-4xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500">No students found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminStudents;
