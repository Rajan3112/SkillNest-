import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaRocket, FaUserTie, FaClock, FaCertificate, FaDollarSign, FaStar, FaChevronDown, FaChevronUp, FaUsers, FaBookOpen, FaGraduationCap } from 'react-icons/fa';
import CourseCard from '../components/CourseCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import API from '../services/api';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await API.get('/courses?limit=6');
        setCourses(data.courses || []);
      } catch (error) {
        console.error('Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const features = [
    { icon: FaUserTie, title: 'Expert Mentors', description: 'Learn from industry professionals with years of real-world experience.', color: 'from-primary-500 to-primary-600' },
    { icon: FaClock, title: 'Flexible Learning', description: 'Study at your own pace with lifetime access to all course materials.', color: 'from-secondary-500 to-secondary-600' },
    { icon: FaCertificate, title: 'Certificates', description: 'Earn recognized certificates to boost your professional profile.', color: 'from-accent-500 to-accent-600' },
    { icon: FaDollarSign, title: 'Affordable Pricing', description: 'Quality education at prices that won\'t break the bank.', color: 'from-green-500 to-green-600' },
  ];

  const testimonials = [
    { name: 'Priya Sharma', role: 'Web Developer at Google', text: 'SkillNest transformed my career. The React course was comprehensive and practical. I landed my dream job within 3 months!', avatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=4F46E5&color=fff' },
    { name: 'Rahul Verma', role: 'Data Scientist at Amazon', text: 'The Data Science course exceeded my expectations. The instructor explained complex concepts in a simple, engaging way.', avatar: 'https://ui-avatars.com/api/?name=Rahul+Verma&background=7C3AED&color=fff' },
    { name: 'Anita Desai', role: 'UX Designer at Microsoft', text: 'Amazing platform with top-quality courses. The UI/UX design masterclass helped me build an incredible portfolio.', avatar: 'https://ui-avatars.com/api/?name=Anita+Desai&background=06B6D4&color=fff' },
  ];

  const faqs = [
    { q: 'How do I get started with SkillNest?', a: 'Simply create an account, browse our course catalog, and enroll in any course that interests you. You can start learning immediately after enrollment.' },
    { q: 'Are the certificates recognized?', a: 'Yes! Our certificates are recognized by top companies worldwide. They demonstrate your skills and commitment to continuous learning.' },
    { q: 'Can I access courses on mobile?', a: 'Absolutely! SkillNest is fully responsive and works seamlessly on all devices including phones, tablets, and desktops.' },
    { q: 'What if I\'m not satisfied with a course?', a: 'We offer a 30-day money-back guarantee on all courses. If you\'re not satisfied, contact our support team for a full refund.' },
    { q: 'Do I get lifetime access?', a: 'Yes, once you enroll in a course, you get lifetime access to all materials including future updates and additions.' },
  ];

  const stats = [
    { icon: FaUsers, value: '50K+', label: 'Active Students' },
    { icon: FaBookOpen, value: '200+', label: 'Expert Courses' },
    { icon: FaGraduationCap, value: '15K+', label: 'Graduates' },
    { icon: FaStar, value: '4.8', label: 'Average Rating' },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/30 dark:bg-primary-900/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-200/30 dark:bg-secondary-900/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-200/20 dark:bg-accent-900/10 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <FaRocket className="text-xs" /> #1 Learning Platform
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
                Learn New{' '}
                <span className="gradient-text">Skills</span>{' '}
                Faster
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-lg">
                Thousands of students are improving their careers with SkillNest. Join expert-led courses and workshops designed for the modern learner.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/courses" className="btn-primary text-lg py-4 px-8 inline-flex items-center gap-2">
                  Explore Courses <FaRocket />
                </Link>
                <Link to="/register" className="btn-secondary text-lg py-4 px-8">
                  Get Started Free
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-8">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <img key={i} src={`https://ui-avatars.com/api/?name=Student+${i}&background=${['4F46E5', '7C3AED', '06B6D4', '10B981'][i - 1]}&color=fff&size=40`} alt="" className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800" />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => <FaStar key={i} className="text-sm" />)}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">50K+ Happy Students</p>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-3xl transform rotate-3 scale-105 opacity-10" />
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=500&fit=crop"
                  alt="Students learning"
                  className="relative rounded-3xl shadow-2xl w-full object-cover"
                />
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 flex items-center gap-3"
                >
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                    <FaGraduationCap className="text-green-500 text-xl" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 dark:text-white">200+</p>
                    <p className="text-xs text-gray-500">Courses Available</p>
                  </div>
                </motion.div>
                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 flex items-center gap-3"
                >
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
                    <FaUsers className="text-primary-500 text-xl" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 dark:text-white">50K+</p>
                    <p className="text-xs text-gray-500">Active Learners</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-gray-800 border-y border-gray-100 dark:border-gray-700">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 mx-auto bg-primary-50 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mb-3">
                  <stat.icon className="text-primary-500 text-2xl" />
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-[#F8FAFC] dark:bg-gray-900">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-3">
              Everything You Need to <span className="gradient-text">Succeed</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
              Our platform provides all the tools and resources you need to accelerate your learning journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card p-6 text-center group hover:-translate-y-2"
              >
                <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="text-white text-2xl" />
                </div>
                <h3 className="font-bold text-gray-800 dark:text-white text-lg mb-3">{feature.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="section-padding bg-white dark:bg-gray-800">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">Our Courses</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-3">
              Popular <span className="gradient-text">Courses</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
              Explore our most popular courses chosen by thousands of students worldwide.
            </p>
          </motion.div>

          {loading ? (
            <LoadingSkeleton count={6} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course, i) => (
                <CourseCard key={course._id} course={course} index={i} />
              ))}
            </div>
          )}

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-12">
            <Link to="/courses" className="btn-primary inline-flex items-center gap-2 text-lg py-4 px-8">
              View All Courses <FaBookOpen />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-3">
              What Our <span className="gradient-text">Students Say</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="card p-6"
              >
                <div className="flex items-center gap-1 text-yellow-400 mb-4">
                  {[...Array(5)].map((_, j) => <FaStar key={j} className="text-sm" />)}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full" />
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-white dark:bg-gray-800">
        <div className="container-custom max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-primary-500 font-semibold text-sm uppercase tracking-wider">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-3">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="card overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-semibold text-gray-800 dark:text-white pr-4">{faq.q}</span>
                  {openFaq === i ? <FaChevronUp className="text-primary-500 flex-shrink-0" /> : <FaChevronDown className="text-gray-400 flex-shrink-0" />}
                </button>
                {openFaq === i && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="overflow-hidden">
                    <p className="px-5 pb-5 text-gray-500 dark:text-gray-400 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Start Your Learning Journey?</h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of students already learning on SkillNest. Start your first course today.
            </p>
            <Link to="/register" className="inline-flex items-center gap-2 bg-white text-primary-600 font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Get Started for Free <FaRocket />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
