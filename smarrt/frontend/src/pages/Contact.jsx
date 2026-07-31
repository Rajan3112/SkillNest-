import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaCheck } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Contact = () => {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    setTimeout(() => {
      setSent(true);
      setLoading(false);
      toast.success('Message sent successfully!');
      reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-primary-500 to-secondary-500 py-20">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
            <p className="text-white/80 text-lg">Have questions? We'd love to hear from you.</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="space-y-6">
              {[
                { icon: FaPhone, title: 'Phone', info: '+91-836-816-2544', sub: 'Mon-Fri 9am to 6pm' },
                { icon: FaEnvelope, title: 'Email', info: 'contactus@smarrtifai.com', sub: 'We reply within 24 hours' },
                { icon: FaMapMarkerAlt, title: 'Website', info: 'www.smarrtifai.com', sub: 'Visit our website' },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="card p-6 flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="text-primary-500 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-white">{item.title}</h3>
                    <p className="text-primary-500 font-medium">{item.info}</p>
                    <p className="text-sm text-gray-500">{item.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card p-8">
                {!sent ? (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                        <input className="input-field" placeholder="Your name" {...register('name', { required: 'Required' })} />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                        <input type="email" className="input-field" placeholder="Your email" {...register('email', { required: 'Required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })} />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                      <input className="input-field" placeholder="Subject" {...register('subject', { required: 'Required' })} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                      <textarea className="input-field" rows="5" placeholder="Your message..." {...register('message', { required: 'Required', minLength: { value: 10, message: 'Min 10 characters' } })} />
                      {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2 disabled:opacity-50">
                      {loading ? 'Sending...' : <><FaPaperPlane /> Send Message</>}
                    </button>
                  </form>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                      <FaCheck className="text-green-500 text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Message Sent!</h3>
                    <p className="text-gray-500 mb-4">We'll get back to you within 24 hours.</p>
                    <button onClick={() => setSent(false)} className="text-primary-500 hover:underline font-medium">Send another message</button>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
