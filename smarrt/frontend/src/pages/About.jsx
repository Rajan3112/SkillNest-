import { motion } from 'framer-motion';
import { FaGraduationCap, FaUsers, FaBookOpen, FaGlobe, FaHeart, FaRocket } from 'react-icons/fa';

const About = () => {
  const team = [
    { name: 'Sarah Johnson', role: 'CEO & Founder', img: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=4F46E5&color=fff&size=200' },
    { name: 'Michael Chen', role: 'CTO', img: 'https://ui-avatars.com/api/?name=Michael+Chen&background=7C3AED&color=fff&size=200' },
    { name: 'Emily Rodriguez', role: 'Head of Design', img: 'https://ui-avatars.com/api/?name=Emily+Rodriguez&background=06B6D4&color=fff&size=200' },
    { name: 'James Wilson', role: 'Head of Marketing', img: 'https://ui-avatars.com/api/?name=James+Wilson&background=10B981&color=fff&size=200' },
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-primary-500 to-secondary-500 py-20">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About SkillNest</h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">Empowering learners worldwide with accessible, high-quality education.</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-white dark:bg-gray-800">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                SkillNest was founded with a simple yet powerful idea: everyone deserves access to quality education. We believe that learning should be accessible, engaging, and transformative.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                Our platform connects passionate instructors with eager learners, creating a community where knowledge flows freely and careers are built.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[{ icon: FaUsers, label: '50K+ Students' }, { icon: FaBookOpen, label: '200+ Courses' }, { icon: FaGlobe, label: 'Global Reach' }, { icon: FaHeart, label: '98% Satisfaction' }].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <item.icon className="text-primary-500 text-xl" />
                    <span className="font-medium text-gray-800 dark:text-white text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop" alt="Team" className="rounded-2xl shadow-xl w-full" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="card p-6 text-center">
                <img src={member.img} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
                <h3 className="font-bold text-gray-800 dark:text-white">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-to-r from-primary-500 to-secondary-500">
        <div className="container-custom text-center text-white">
          <FaRocket className="text-5xl mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">Join thousands of students who are already building their future with SkillNest.</p>
          <a href="/register" className="inline-flex items-center gap-2 bg-white text-primary-600 font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105">
            Get Started <FaRocket />
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
