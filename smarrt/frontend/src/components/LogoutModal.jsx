import { motion, AnimatePresence } from 'framer-motion';
import { FaExclamationTriangle } from 'react-icons/fa';

const LogoutModal = ({ isOpen, onConfirm, onCancel }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[9998] backdrop-blur-sm"
            onClick={onCancel}
          />
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center relative"
                >
                  <div className="w-16 h-16 mx-auto bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-5">
                    <FaExclamationTriangle className="text-red-500 text-2xl" />
                  </div>
                  <h3 className="text-red-500 font-bold text-xl mb-2">
                    Are you sure to logout?
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
                    You will need to sign in again to access your account.
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={onCancel}
                      className="flex-1 py-3 px-6 rounded-xl border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
                    >
                      No
                    </button>
                    <button
                      onClick={onConfirm}
                      className="flex-1 py-3 px-6 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/25"
                    >
                      Yes
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LogoutModal;
