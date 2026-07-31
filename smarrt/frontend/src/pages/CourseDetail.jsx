import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaClock, FaUser, FaUsers, FaPlay, FaCheckCircle, FaBookOpen, FaArrowLeft, FaCertificate } from 'react-icons/fa';
import { toast } from 'react-toastify';
import CourseCard from '../components/CourseCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const [{ data: courseData }, { data: allData }] = await Promise.all([
          API.get(`/courses/${id}`),
          API.get('/courses', { params: { limit: 3 } }),
        ]);
        setCourse(courseData.course);
        setRelated((allData.courses || []).filter((c) => c._id !== id && c.category === courseData.course?.category).slice(0, 3));
      } catch (error) {
        toast.error('Course not found');
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    if (!user) {
      toast.error('Please login to enroll');
      navigate('/login');
      return;
    }
    setEnrolling(true);
    try {
      await API.post('/enroll', { courseId: id });
      toast.success('Successfully enrolled!');
      navigate('/dashboard/courses');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Enrollment failed');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) return <div className="pt-20"><LoadingSkeleton type="spinner" /></div>;
  if (!course) return (
    <div className="pt-20 text-center py-20">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Course not found</h2>
      <Link to="/courses" className="text-primary-500 hover:underline mt-4 inline-block">Back to Courses</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Banner */}
      <div className="bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-700 py-16">
        <div className="container-custom">
          <Link to="/courses" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors">
            <FaArrowLeft /> Back to Courses
          </Link>
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <span className="inline-block px-3 py-1 bg-white/20 text-white text-sm font-medium rounded-full mb-4">
                  {course.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{course.title}</h1>
                <p className="text-white/80 text-lg mb-6">{course.description}</p>
                <div className="flex flex-wrap items-center gap-6 text-white/80">
                  <span className="flex items-center gap-2"><FaUser /> {course.instructor}</span>
                  <span className="flex items-center gap-2"><FaClock /> {course.duration}</span>
                  <span className="flex items-center gap-2"><FaStar className="text-yellow-400" /> {course.rating} Rating</span>
                  <span className="flex items-center gap-2"><FaUsers /> {course.studentsEnrolled.toLocaleString()} Students</span>
                </div>
              </motion.div>
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-6 bg-white dark:bg-gray-800">
              <img src={course.image} alt={course.title} className="w-full h-48 object-cover rounded-xl mb-4" />
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-4">₹{course.price.toLocaleString()}</div>
              <button onClick={handleEnroll} disabled={enrolling} className="btn-primary w-full text-center py-4 disabled:opacity-50">
                {enrolling ? 'Enrolling...' : 'Enroll Now'}
              </button>
              <div className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2"><FaBookOpen className="text-primary-500" /> {course.curriculum?.length || 0} Lessons</div>
                <div className="flex items-center gap-2"><FaClock className="text-primary-500" /> {course.duration}</div>
                <div className="flex items-center gap-2"><FaCertificate className="text-primary-500" /> Certificate of Completion</div>
                <div className="flex items-center gap-2"><FaUsers className="text-primary-500" /> {course.studentsEnrolled.toLocaleString()} Enrolled</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container-custom py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Learning Outcomes */}
            {course.learningOutcomes?.length > 0 && (
              <div className="card p-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">What You'll Learn</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {course.learningOutcomes.map((outcome, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Curriculum */}
            {course.curriculum?.length > 0 && (
              <div className="card p-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Course Curriculum</h2>
                <div className="space-y-3">
                  {course.curriculum.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.type === 'quiz' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600' : item.type === 'assignment' ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : 'bg-primary-100 dark:bg-primary-900/30 text-primary-600'}`}>
                          <FaPlay className="text-xs" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white text-sm">{item.title}</p>
                          <p className="text-xs text-gray-500 capitalize">{item.type}</p>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{item.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <div className="card p-6 sticky top-24">
              <h3 className="font-bold text-gray-800 dark:text-white mb-4">About the Instructor</h3>
              <div className="flex items-center gap-3 mb-4">
                <img src={`https://ui-avatars.com/api/?name=${course.instructor}&background=4F46E5&color=fff&size=60`} alt={course.instructor} className="w-14 h-14 rounded-full" />
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">{course.instructor}</p>
                  <p className="text-sm text-gray-500">Expert Instructor</p>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-medium rounded-full">{course.level}</span>
                <span className="px-3 py-1 bg-accent-50 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 text-xs font-medium rounded-full">{course.category}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Courses */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">Related Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((c, i) => <CourseCard key={c._id} course={c} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;
