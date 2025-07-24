import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Upload, 
    FileText, 
    Search, 
    LogOut, 
    Activity, 
    Shield,
    File,
    Eye,
    CheckCircle,
    AlertCircle
} from 'lucide-react';
import { useUserId } from './UserContext';
import { useIdentity } from './IdentityContext';
import { uploadFile, readFile } from './api';
import { Principal } from "@dfinity/principal";
import AnimatedBackground from './components/AnimatedBackground';
import GlassCard from './components/GlassCard';
import AnimatedButton from './components/AnimatedButton';
import AnimatedInput from './components/AnimatedInput';

function Home({ onLogout, addLog }) {
    const { userId } = useUserId();
    const { identity } = useIdentity();
    const [fileTitle, setFileTitle] = useState('');
    const [fileContent, setFileContent] = useState('');
    const [fileAuthority, setFileAuthority] = useState(0);
    const [displayContent, setDisplayContent] = useState('');
    const [readTitle, setReadTitle] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [isReading, setIsReading] = useState(false);
    const [notification, setNotification] = useState(null);

    const navigate = useNavigate();

    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleUpload = async () => {
        if (fileTitle && fileContent) {
            setIsUploading(true);
            try {
                await uploadFile(fileTitle, fileContent, fileAuthority);
                addLog(fileTitle, 'uploaded');
                showNotification('File uploaded successfully!');
                setFileTitle('');
                setFileContent('');
                setFileAuthority(0);
            } catch (error) {
                showNotification('Failed to upload file', 'error');
            } finally {
                setIsUploading(false);
            }
        } else {
            showNotification('Please enter both title and content', 'error');
        }
    };

    const handleRead = async () => {
        if (readTitle) {
            setIsReading(true);
            try {
                const identityPrincipal = typeof identity === "string" ? Principal.fromText(identity) : identity;
                const content = await readFile(readTitle, identityPrincipal);
                if (content) {
                    setDisplayContent(content);
                    addLog(readTitle, 'read');
                    showNotification('File read successfully!');
                } else {
                    setDisplayContent("No file found or insufficient permissions.");
                    showNotification('File not found or access denied', 'error');
                }
            } catch (error) {
                setDisplayContent("Error reading file.");
                showNotification('Error reading file', 'error');
            } finally {
                setIsReading(false);
            }
        } else {
            showNotification('Please enter a file title', 'error');
        }
    };

    const goToPage = () => {
        navigate('/page');
    };

    const authorityLevels = [
        { value: 0, label: 'Public', color: 'from-green-500 to-emerald-500' },
        { value: 1, label: 'Internal', color: 'from-blue-500 to-cyan-500' },
        { value: 2, label: 'Confidential', color: 'from-orange-500 to-yellow-500' },
        { value: 3, label: 'Restricted', color: 'from-red-500 to-pink-500' },
    ];

    return (
        <div className="min-h-screen p-4">
            <AnimatedBackground />
            
            {/* Notification */}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: -50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -50, scale: 0.9 }}
                        className="fixed top-4 right-4 z-50"
                    >
                        <div className={`
                            px-6 py-3 rounded-xl shadow-lg backdrop-blur-sm flex items-center space-x-2
                            ${notification.type === 'success' 
                                ? 'bg-green-500/90 text-white' 
                                : 'bg-red-500/90 text-white'
                            }
                        `}>
                            {notification.type === 'success' ? (
                                <CheckCircle className="w-5 h-5" />
                            ) : (
                                <AlertCircle className="w-5 h-5" />
                            )}
                            <span>{notification.message}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

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
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                                >
                                    <Shield className="w-8 h-8 text-white" />
                                </motion.div>
                                <div>
                                    <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                        BlockHero Dashboard
                                    </h1>
                                    <p className="text-gray-600">Welcome back, {userId}</p>
                                </div>
                            </div>
                            <AnimatedButton
                                onClick={onLogout}
                                variant="danger"
                                className="flex items-center space-x-2"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Logout</span>
                            </AnimatedButton>
                        </div>
                    </GlassCard>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {/* File Upload Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <GlassCard className="p-6 h-full">
                            <div className="flex items-center space-x-3 mb-6">
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg"
                                >
                                    <Upload className="w-6 h-6 text-white" />
                                </motion.div>
                                <h2 className="text-xl font-bold text-gray-800">Upload File</h2>
                            </div>
                            
                            <div className="space-y-4">
                                <AnimatedInput
                                    label="File Title"
                                    type="text"
                                    value={fileTitle}
                                    onChange={(e) => setFileTitle(e.target.value)}
                                    placeholder="Enter file title"
                                />
                                
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        File Content
                                    </label>
                                    <motion.textarea
                                        whileFocus={{ scale: 1.02 }}
                                        value={fileContent}
                                        onChange={(e) => setFileContent(e.target.value)}
                                        placeholder="Enter file content"
                                        rows={4}
                                        className="
                                            w-full px-4 py-3 bg-white/10 backdrop-blur-sm
                                            border-2 border-white/20 rounded-xl
                                            text-gray-800 placeholder-gray-500
                                            focus:outline-none focus:border-purple-500/50
                                            transition-all duration-300 resize-none
                                        "
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Security Level
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {authorityLevels.map((level) => (
                                            <motion.div
                                                key={level.value}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className={`
                                                    p-2 rounded-lg cursor-pointer border-2 transition-all duration-300 text-center
                                                    ${fileAuthority === level.value 
                                                        ? 'border-purple-500 bg-purple-50' 
                                                        : 'border-gray-200 bg-white/50 hover:border-gray-300'
                                                    }
                                                `}
                                                onClick={() => setFileAuthority(level.value)}
                                            >
                                                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${level.color} mx-auto mb-1`} />
                                                <span className="text-xs font-medium">{level.label}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                                
                                <AnimatedButton
                                    onClick={handleUpload}
                                    disabled={isUploading || !fileTitle || !fileContent}
                                    className="w-full"
                                    variant="secondary"
                                >
                                    <div className="flex items-center justify-center space-x-2">
                                        <Upload className="w-5 h-5" />
                                        <span>{isUploading ? 'Uploading...' : 'Upload File'}</span>
                                    </div>
                                </AnimatedButton>
                            </div>
                        </GlassCard>
                    </motion.div>

                    {/* File Read Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <GlassCard className="p-6 h-full">
                            <div className="flex items-center space-x-3 mb-6">
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg"
                                >
                                    <FileText className="w-6 h-6 text-white" />
                                </motion.div>
                                <h2 className="text-xl font-bold text-gray-800">Read File</h2>
                            </div>
                            
                            <div className="space-y-4">
                                <AnimatedInput
                                    label="File Title"
                                    type="text"
                                    value={readTitle}
                                    onChange={(e) => setReadTitle(e.target.value)}
                                    placeholder="Enter file title to read"
                                />
                                
                                <AnimatedButton
                                    onClick={handleRead}
                                    disabled={isReading || !readTitle}
                                    className="w-full"
                                    variant="success"
                                >
                                    <div className="flex items-center justify-center space-x-2">
                                        <Search className="w-5 h-5" />
                                        <span>{isReading ? 'Reading...' : 'Read File'}</span>
                                    </div>
                                </AnimatedButton>
                                
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="relative"
                                >
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        File Content
                                    </label>
                                    <div className="
                                        min-h-[120px] p-4 bg-white/10 backdrop-blur-sm
                                        border-2 border-white/20 rounded-xl
                                        text-gray-800 overflow-auto
                                    ">
                                        {displayContent ? (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="flex items-start space-x-2"
                                            >
                                                <File className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                                <span className="break-words">{displayContent}</span>
                                            </motion.div>
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-gray-500">
                                                <div className="text-center">
                                                    <Eye className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                                    <p>File content will appear here</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            </div>
                        </GlassCard>
                    </motion.div>
                </div>

                {/* Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <GlassCard className="p-6">
                        <div className="flex justify-center">
                            <AnimatedButton
                                onClick={goToPage}
                                className="flex items-center space-x-2"
                            >
                                <Activity className="w-5 h-5" />
                                <span>View Activity Logs</span>
                            </AnimatedButton>
                        </div>
                    </GlassCard>
                </motion.div>
            </div>
        </div>
    );
}

export default Home;
