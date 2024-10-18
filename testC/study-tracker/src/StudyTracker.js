import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Play, Pause, AlertCircle, CheckCircle, List, Focus, Mic, Settings as SettingsIcon } from 'lucide-react';

const StudyTracker = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [studySession, setStudySession] = useState({
    isActive: false,
    timeElapsed: 0,
    focusModeActive: false,
    aiChatbotActive: false
  });
  const [assignments, setAssignments] = useState([
    { id: 1, title: 'Math homework', dueDate: '2 days', progress: 30 },
    { id: 2, title: 'History essay', dueDate: '5 days', progress: 10 },
    { id: 3, title: 'Science project', dueDate: '1 week', progress: 50 }
  ]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const NavBar = () => (
    <nav className="bg-white/10 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">Study Tracker</h1>
          </div>
          <div className="flex">
            {['dashboard', 'study', 'assignments', 'settings'].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/20"
              >
                {page.charAt(0).toUpperCase() + page.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );

  const Dashboard = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
          <h3 className="text-xl font-semibold mb-4">Study Overview</h3>
          <p>Total study time: 14h 30m</p>
          <p>Sessions this week: 5</p>
          <p>Most studied subject: Mathematics</p>
        </div>
        <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
          <h3 className="text-xl font-semibold mb-4">Upcoming Assignments</h3>
          <ul className="list-disc list-inside">
            {assignments.map(assignment => (
              <li key={assignment.id}>{assignment.title} - Due in {assignment.dueDate}</li>
            ))}
          </ul>
        </div>
        <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
          <h3 className="text-xl font-semibold mb-4">Study Streak</h3>
          <p className="text-4xl font-bold">7 days</p>
          <p>Keep it up!</p>
        </div>
      </div>
    </motion.div>
  );

  const StudySession = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold">Study Session</h2>
      <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
        <div className="text-center mb-4">
          <Clock className="inline-block mr-2" size={32} />
          <span className="text-3xl font-bold">{formatTime(studySession.timeElapsed)}</span>
        </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setStudySession(prev => ({ ...prev, isActive: !prev.isActive }))}
            className="px-4 py-2 bg-yellow-400 text-indigo-900 rounded-full font-bold"
          >
            {studySession.isActive ? 'Pause' : 'Start'} Session
          </button>
          <button
            onClick={() => setStudySession(prev => ({ ...prev, focusModeActive: !prev.focusModeActive }))}
            className={`px-4 py-2 ${studySession.focusModeActive ? 'bg-red-500' : 'bg-green-500'} text-white rounded-full font-bold`}
          >
            {studySession.focusModeActive ? 'Disable' : 'Enable'} Focus Mode
          </button>
          <button
            onClick={() => setStudySession(prev => ({ ...prev, aiChatbotActive: !prev.aiChatbotActive }))}
            className={`px-4 py-2 ${studySession.aiChatbotActive ? 'bg-red-500' : 'bg-green-500'} text-white rounded-full font-bold`}
          >
            {studySession.aiChatbotActive ? 'Disable' : 'Enable'} AI Chatbot
          </button>
        </div>
      </div>
    </motion.div>
  );

  const Assignments = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold">Assignments</h2>
      <div className="space-y-4">
        {assignments.map(assignment => (
          <div key={assignment.id} className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
            <h3 className="text-xl font-semibold">{assignment.title}</h3>
            <p>Due in: {assignment.dueDate}</p>
            <div className="mt-2">
              <div className="bg-white/20 rounded-full h-2 w-full">
                <div 
                  className="bg-green-500 rounded-full h-2" 
                  style={{ width: `${assignment.progress}%` }}
                ></div>
              </div>
              <p className="text-sm mt-1">{assignment.progress}% complete</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );

  const Settings = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold">Settings</h2>
      <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
        <h3 className="text-xl font-semibold mb-4">Preferences</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Enable notifications
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Dark mode
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Sound effects
          </label>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
      <NavBar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {currentPage === 'dashboard' && <Dashboard key="dashboard" />}
          {currentPage === 'study' && <StudySession key="study" />}
          {currentPage === 'assignments' && <Assignments key="assignments" />}
          {currentPage === 'settings' && <Settings key="settings" />}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default StudyTracker;