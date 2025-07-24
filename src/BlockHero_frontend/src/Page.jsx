import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Activity, User, File, Clock, Eye, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AnimatedBackground from './components/AnimatedBackground';
import GlassCard from './components/GlassCard';
import AnimatedButton from './components/AnimatedButton';

function Page({ logs }) {
    const navigate = useNavigate();

    const getActionIcon = (action) => {
        switch (action.toLowerCase()) {
            case 'uploaded':
                return <Upload className="w-4 h-4 text-blue-500" />;
            case 'read':
                return <Eye className="w-4 h-4 text-green-500" />;
            default:
                return <File className="w-4 h-4 text-gray-500" />;
        }
    };

    const getActionColor = (action) => {
        switch (action.toLowerCase()) {
            case 'uploaded':
                return 'from-blue-500 to-cyan-500';
            case 'read':
                return 'from-green-500 to-emerald-500';
            default:
                return 'from-gray-500 to-gray-600';
        }
    };

    return (
        <div className="min-h-screen p-4">
            <AnimatedBackground />
            
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <GlassCard className="p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: -5 }}
                                    className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                                >
                                    <Activity className="w-8 h-8 text-white" />
                                </motion.div>
                                <div>
                                    <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                        Activity Logs
                                    </h1>
                                    <p className="text-gray-600">Track all file operations and user activities</p>
                                </div>
                            </div>
                            <AnimatedButton
                                onClick={() => navigate('/')}
                                variant="outline"
                                className="flex items-center space-x-2"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                <span>Back to Dashboard</span>
                            </AnimatedButton>
                        </div>
                    </GlassCard>
                </motion.div>

                {/* Logs Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <GlassCard className="p-6">
                        {logs.length > 0 ? (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-semibold text-gray-800">Recent Activities</h2>
                                    <div className="text-sm text-gray-600 bg-white/20 px-3 py-1 rounded-full">
                                        {logs.length} {logs.length === 1 ? 'entry' : 'entries'}
                                    </div>
                                </div>
                                
                                <div className="space-y-3">
                                    {logs.map((log, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            whileHover={{ scale: 1.02 }}
                                            className="
                                                p-4 bg-white/10 backdrop-blur-sm rounded-xl
                                                border border-white/20 hover:border-white/40
                                                transition-all duration-300
                                            "
                                        >
                                            <div className="flex items-start space-x-4">
                                                <motion.div
                                                    whileHover={{ scale: 1.2 }}
                                                    className={`
                                                        p-2 rounded-lg bg-gradient-to-r ${getActionColor(log.action)}
                                                        flex-shrink-0
                                                    `}
                                                >
                                                    {getActionIcon(log.action)}
                                                </motion.div>
                                                
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center space-x-2 mb-2">
                                                        <User className="w-4 h-4 text-gray-500" />
                                                        <span className="font-semibold text-gray-800">{log.user}</span>
                                                        <span className="text-gray-600">
                                                            {log.action === 'uploaded' ? 'uploaded' : 'read'}
                                                        </span>
                                                        <File className="w-4 h-4 text-gray-500" />
                                                        <span className="font-medium text-gray-800 truncate">
                                                            {log.fileName}
                                                        </span>
                                                    </div>
                                                    
                                                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                                                        <Clock className="w-3 h-3" />
                                                        <span>{log.timestamp}</span>
                                                    </div>
                                                </div>
                                                
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className={`
                                                        px-2 py-1 rounded-full text-xs font-medium
                                                        ${log.action === 'uploaded' 
                                                            ? 'bg-blue-100 text-blue-800' 
                                                            : 'bg-green-100 text-green-800'
                                                        }
                                                    `}
                                                >
                                                    {log.action.toUpperCase()}
                                                </motion.div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-12"
                            >
                                <motion.div
                                    animate={{ 
                                        rotate: [0, 10, -10, 0],
                                        scale: [1, 1.1, 1]
                                    }}
                                    transition={{ 
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatType: "reverse"
                                    }}
                                    className="mb-4"
                                >
                                    <Activity className="w-16 h-16 mx-auto text-gray-400" />
                                </motion.div>
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Activity Yet</h3>
                                <p className="text-gray-600 mb-6">
                                    Start uploading and reading files to see activity logs here.
                                </p>
                                <AnimatedButton
                                    onClick={() => navigate('/')}
                                    className="inline-flex items-center space-x-2"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    <span>Go to Dashboard</span>
                                </AnimatedButton>
                            </motion.div>
                        )}
                    </GlassCard>
                </motion.div>
            </div>
        </div>
    );
}

export default Page;
