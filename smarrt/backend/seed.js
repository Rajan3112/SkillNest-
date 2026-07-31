const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Course = require('./models/Course');
const Category = require('./models/Category');

dotenv.config();

const categories = [
  { name: 'Web Development', description: 'Learn modern web technologies', icon: 'FaCode', color: '#4F46E5' },
  { name: 'Data Science', description: 'Master data analysis and ML', icon: 'FaChartBar', color: '#7C3AED' },
  { name: 'Design', description: 'UI/UX and graphic design', icon: 'FaPalette', color: '#06B6D4' },
  { name: 'Marketing', description: 'Digital marketing strategies', icon: 'FaBullhorn', color: '#F59E0B' },
  { name: 'Business', description: 'Entrepreneurship and management', icon: 'FaBriefcase', color: '#10B981' },
  { name: 'Photography', description: 'Professional photography skills', icon: 'FaCamera', color: '#EF4444' },
];

const courses = [
  {
    title: 'Complete React Developer Bootcamp 2024',
    description: 'Master React from scratch. Build real-world projects with Redux, Hooks, Context API, and modern best practices. This comprehensive course covers everything from basic components to advanced patterns, testing, and deployment strategies.',
    price: 4999,
    category: 'Web Development',
    duration: '42 hours',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    instructor: 'Sarah Johnson',
    rating: 4.8,
    studentsEnrolled: 2340,
    level: 'Beginner',
    featured: true,
    learningOutcomes: ['Build 10+ React projects', 'Master Hooks and Context', 'State management with Redux', 'Testing with Jest', 'Deploy to production'],
    curriculum: [
      { title: 'Introduction to React', duration: '2h 30m', type: 'video' },
      { title: 'Components and Props', duration: '3h 15m', type: 'video' },
      { title: 'State and Lifecycle', duration: '4h 00m', type: 'video' },
      { title: 'React Hooks Deep Dive', duration: '3h 45m', type: 'video' },
      { title: 'Redux Toolkit', duration: '3h 00m', type: 'video' },
      { title: 'React Quiz', duration: '30m', type: 'quiz' },
      { title: 'Final Project', duration: '5h 00m', type: 'assignment' },
    ],
  },
  {
    title: 'Python for Data Science & Machine Learning',
    description: 'Learn Python, Pandas, NumPy, Matplotlib, Scikit-Learn, and TensorFlow. Complete data science pipeline from data wrangling to deploying ML models. Perfect for beginners and intermediate programmers.',
    price: 5999,
    category: 'Data Science',
    duration: '56 hours',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=400&fit=crop',
    instructor: 'Dr. Michael Chen',
    rating: 4.9,
    studentsEnrolled: 3120,
    level: 'Intermediate',
    featured: true,
    learningOutcomes: ['Python programming mastery', 'Data analysis with Pandas', 'Machine learning models', 'Neural networks with TensorFlow', 'Real-world data projects'],
    curriculum: [
      { title: 'Python Fundamentals', duration: '4h 00m', type: 'video' },
      { title: 'NumPy and Pandas', duration: '5h 30m', type: 'video' },
      { title: 'Data Visualization', duration: '3h 00m', type: 'video' },
      { title: 'Machine Learning Basics', duration: '6h 00m', type: 'video' },
      { title: 'Deep Learning', duration: '5h 00m', type: 'video' },
      { title: 'ML Assessment', duration: '45m', type: 'quiz' },
      { title: 'Capstone Project', duration: '8h 00m', type: 'assignment' },
    ],
  },
  {
    title: 'UI/UX Design Masterclass: From Zero to Hero',
    description: 'Design beautiful interfaces and delightful user experiences. Learn Figma, design systems, user research, wireframing, prototyping, and build a professional portfolio that gets you hired.',
    price: 3999,
    category: 'Design',
    duration: '38 hours',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
    instructor: 'Emily Rodriguez',
    rating: 4.7,
    studentsEnrolled: 1890,
    level: 'Beginner',
    featured: true,
    learningOutcomes: ['Master Figma tools', 'Design system creation', 'User research methods', 'Interactive prototyping', 'Portfolio building'],
    curriculum: [
      { title: 'Design Principles', duration: '3h 00m', type: 'video' },
      { title: 'Figma Masterclass', duration: '5h 00m', type: 'video' },
      { title: 'User Research', duration: '3h 30m', type: 'video' },
      { title: 'Wireframing', duration: '4h 00m', type: 'video' },
      { title: 'Prototyping', duration: '3h 00m', type: 'video' },
      { title: 'Design Quiz', duration: '30m', type: 'quiz' },
      { title: 'Portfolio Project', duration: '6h 00m', type: 'assignment' },
    ],
  },
  {
    title: 'Digital Marketing Strategy & Social Media',
    description: 'Master digital marketing from SEO to social media marketing. Learn Google Ads, Facebook Ads, content marketing, email marketing, and analytics to grow any business online.',
    price: 3499,
    category: 'Marketing',
    duration: '32 hours',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    instructor: 'James Wilson',
    rating: 4.6,
    studentsEnrolled: 2780,
    level: 'Beginner',
    featured: true,
    learningOutcomes: ['SEO optimization', 'Social media strategy', 'Google Ads mastery', 'Email marketing', 'Analytics and reporting'],
    curriculum: [
      { title: 'Marketing Fundamentals', duration: '2h 30m', type: 'video' },
      { title: 'SEO Strategies', duration: '4h 00m', type: 'video' },
      { title: 'Social Media Marketing', duration: '5h 00m', type: 'video' },
      { title: 'Google Ads', duration: '4h 30m', type: 'video' },
      { title: 'Email Marketing', duration: '3h 00m', type: 'video' },
      { title: 'Marketing Quiz', duration: '30m', type: 'quiz' },
      { title: 'Campaign Project', duration: '5h 00m', type: 'assignment' },
    ],
  },
  {
    title: 'Node.js & Express: Backend Development',
    description: 'Build scalable backend applications with Node.js and Express. Learn REST APIs, authentication, database integration with MongoDB, file uploads, real-time with Socket.io, and deployment.',
    price: 4499,
    category: 'Web Development',
    duration: '45 hours',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop',
    instructor: 'Alex Thompson',
    rating: 4.7,
    studentsEnrolled: 1650,
    level: 'Intermediate',
    featured: true,
    learningOutcomes: ['RESTful API design', 'JWT authentication', 'MongoDB integration', 'File upload handling', 'Real-time applications'],
    curriculum: [
      { title: 'Node.js Fundamentals', duration: '3h 30m', type: 'video' },
      { title: 'Express Framework', duration: '4h 00m', type: 'video' },
      { title: 'MongoDB & Mongoose', duration: '4h 30m', type: 'video' },
      { title: 'Authentication & Security', duration: '5h 00m', type: 'video' },
      { title: 'API Design Patterns', duration: '3h 30m', type: 'video' },
      { title: 'Backend Quiz', duration: '30m', type: 'quiz' },
      { title: 'API Project', duration: '7h 00m', type: 'assignment' },
    ],
  },
  {
    title: 'Business Strategy & Entrepreneurship',
    description: 'Learn how to start, run, and scale a business. Covers business planning, financial management, marketing strategy, leadership skills, and fundraising from industry experts.',
    price: 4999,
    category: 'Business',
    duration: '36 hours',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    instructor: 'Robert Chang',
    rating: 4.5,
    studentsEnrolled: 1420,
    level: 'Beginner',
    featured: true,
    learningOutcomes: ['Business planning', 'Financial management', 'Leadership skills', 'Marketing strategy', 'Fundraising techniques'],
    curriculum: [
      { title: 'Business Fundamentals', duration: '3h 00m', type: 'video' },
      { title: 'Business Planning', duration: '4h 00m', type: 'video' },
      { title: 'Financial Management', duration: '5h 00m', type: 'video' },
      { title: 'Leadership', duration: '4h 00m', type: 'video' },
      { title: 'Growth Strategy', duration: '3h 30m', type: 'video' },
      { title: 'Business Quiz', duration: '30m', type: 'quiz' },
      { title: 'Business Plan Project', duration: '6h 00m', type: 'assignment' },
    ],
  },
  {
    title: 'Advanced CSS & Tailwind Masterclass',
    description: 'Master modern CSS including Grid, Flexbox, animations, and Tailwind CSS. Build stunning responsive websites with professional-grade design techniques and utility-first methodology.',
    price: 2999,
    category: 'Web Development',
    duration: '28 hours',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop',
    instructor: 'Lisa Park',
    rating: 4.8,
    studentsEnrolled: 2100,
    level: 'Intermediate',
    featured: false,
    learningOutcomes: ['CSS Grid & Flexbox mastery', 'Advanced animations', 'Tailwind CSS expertise', 'Responsive design patterns', 'Component architecture'],
    curriculum: [
      { title: 'Modern CSS Basics', duration: '3h 00m', type: 'video' },
      { title: 'Flexbox Deep Dive', duration: '3h 30m', type: 'video' },
      { title: 'CSS Grid', duration: '4h 00m', type: 'video' },
      { title: 'Tailwind CSS', duration: '5h 00m', type: 'video' },
      { title: 'Animations', duration: '3h 00m', type: 'video' },
      { title: 'CSS Quiz', duration: '30m', type: 'quiz' },
      { title: 'Responsive Website', duration: '5h 00m', type: 'assignment' },
    ],
  },
  {
    title: 'Professional Photography: Complete Guide',
    description: 'From camera basics to advanced composition techniques. Learn portrait, landscape, product, and street photography. Master Lightroom and Photoshop for professional editing.',
    price: 3499,
    category: 'Photography',
    duration: '30 hours',
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=400&fit=crop',
    instructor: 'Maria Santos',
    rating: 4.6,
    studentsEnrolled: 980,
    level: 'Beginner',
    featured: false,
    learningOutcomes: ['Camera settings mastery', 'Composition techniques', 'Lightroom editing', 'Photoshop retouching', 'Portfolio creation'],
    curriculum: [
      { title: 'Camera Fundamentals', duration: '3h 00m', type: 'video' },
      { title: 'Composition Rules', duration: '3h 30m', type: 'video' },
      { title: 'Lighting Techniques', duration: '4h 00m', type: 'video' },
      { title: 'Lightroom Editing', duration: '4h 00m', type: 'video' },
      { title: 'Photoshop Basics', duration: '3h 30m', type: 'video' },
      { title: 'Photo Quiz', duration: '30m', type: 'quiz' },
      { title: 'Photo Series Project', duration: '5h 00m', type: 'assignment' },
    ],
  },
  {
    title: 'Flutter & Dart: Complete Mobile Development',
    description: 'Build beautiful cross-platform mobile apps with Flutter and Dart. Learn state management, API integration, Firebase, and publish apps to both App Store and Google Play.',
    price: 5499,
    category: 'Web Development',
    duration: '50 hours',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=400&fit=crop',
    instructor: 'David Kim',
    rating: 4.7,
    studentsEnrolled: 1870,
    level: 'Intermediate',
    featured: false,
    learningOutcomes: ['Dart programming', 'Flutter widgets', 'State management', 'Firebase integration', 'App deployment'],
    curriculum: [
      { title: 'Dart Programming', duration: '5h 00m', type: 'video' },
      { title: 'Flutter Widgets', duration: '6h 00m', type: 'video' },
      { title: 'State Management', duration: '5h 00m', type: 'video' },
      { title: 'API Integration', duration: '4h 00m', type: 'video' },
      { title: 'Firebase', duration: '4h 30m', type: 'video' },
      { title: 'Flutter Quiz', duration: '30m', type: 'quiz' },
      { title: 'Mobile App Project', duration: '8h 00m', type: 'assignment' },
    ],
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await User.deleteMany({});
    await Course.deleteMany({});
    await Category.deleteMany({});

    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@gmail.com',
      password: 'Admin@123',
      role: 'admin',
    });

    const student = await User.create({
      name: 'Student User',
      email: 'student@gmail.com',
      password: 'Student@123',
      role: 'student',
    });

    await Category.insertMany(categories);
    await Course.insertMany(courses);

    console.log('Database seeded successfully!');
    console.log('Admin: admin@gmail.com / Admin@123');
    console.log('Student: student@gmail.com / Student@123');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedDatabase();
