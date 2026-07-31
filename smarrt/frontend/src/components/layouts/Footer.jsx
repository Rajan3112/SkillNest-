import { Link } from 'react-router-dom';
import { FaGraduationCap, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                <FaGraduationCap className="text-white text-xl" />
              </div>
              <span className="text-xl font-bold text-white">SkillNest</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Empowering students to learn new skills faster with expert-led courses and workshops.
            </p>
            <div className="flex gap-3">
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-gray-800 hover:bg-primary-500 rounded-lg flex items-center justify-center transition-all duration-300">
                  <Icon className="text-sm" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'Courses', 'About Us', 'Contact', 'Blog'].map((item) => (
                <li key={item}>
                  <Link to="/" className="hover:text-primary-400 transition-colors duration-300">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Categories</h3>
            <ul className="space-y-3">
              {['Web Development', 'Data Science', 'Design', 'Marketing', 'Business', 'Photography'].map((item) => (
                <li key={item}>
                  <Link to="/courses" className="hover:text-primary-400 transition-colors duration-300">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <FaPhone className="text-primary-400" />
                <span>+91-836-816-2544</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-primary-400" />
                <a href="mailto:contactus@smarrtifai.com" className="hover:text-primary-400 transition-colors">contactus@smarrtifai.com</a>
              </li>
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-primary-400 mt-1" />
                <span>www.smarrtifai.com</span>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="text-white font-medium mb-3">Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-xl text-sm focus:outline-none focus:border-primary-500"
                />
                <button className="px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-r-xl text-white text-sm font-medium transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} SkillNest. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
