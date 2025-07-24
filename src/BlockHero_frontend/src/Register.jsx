import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, Shield, Key, Settings } from 'lucide-react';
import { useIdentity } from './IdentityContext';
import { registerUser } from './api';
import { Principal } from "@dfinity/principal";
import AnimatedBackground from './components/AnimatedBackground';
import GlassCard from './components/GlassCard';
import AnimatedButton from './components/AnimatedButton';
import AnimatedInput from './components/AnimatedInput';


function Register() {
    const { identity, isIdentityLogin, updateIdentity } = useIdentity();
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [authority, setAthority] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async () => {
        setIsLoading(true);
        if (id && pw) {
            try {
                const identityPrincipal = typeof identity === "string" ? Principal.fromText(identity) : identity;
                const authorityNat8 = Number(authority);
                if (authorityNat8 < 0 || authorityNat8 > 255) {
                    alert("권한 값은 0에서 255 사이여야 합니다.");
                    return;
                }

                await registerUser(identityPrincipal, id, pw, authorityNat8);
                alert("등록되었습니다!");
                navigate('/login');
            } catch (error) {
                alert("Registration failed. Please try again.");
            } finally {
                setIsLoading(false);
            }
        } else {
            alert("ID와 PW를 입력하세요.");
            setIsLoading(false);
        }
    };

    const authorityLevels = [
        { value: 0, label: 'Admin', description: 'Full access to all files', color: 'from-red-500 to-pink-500' },
        { value: 1, label: 'Manager', description: 'Access to level 1+ files', color: 'from-orange-500 to-yellow-500' },
        { value: 2, label: 'User', description: 'Access to level 2+ files', color: 'from-blue-500 to-cyan-500' },
        { value: 3, label: 'Guest', description: 'Access to public files only', color: 'from-gray-500 to-gray-600' },
    ];

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <AnimatedBackground />
            
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-lg"
            >
                {isIdentityLogin ? (
                    <GlassCard className="p-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-center mb-8"
                        >
                            <div className="flex justify-center mb-4">
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                                >
                                    <UserPlus className="w-8 h-8 text-white" />
                                </motion.div>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Account</h2>
                            <p className="text-sm text-gray-600 mb-4">
                                Identity: {identity.slice(0, 8)}...{identity.slice(-8)}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-6"
                        >
                            <AnimatedInput
                                label="User ID"
                                type="text"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                placeholder="Choose a unique user ID"
                            />
                            
                            <AnimatedInput
                                label="Password"
                                type="password"
                                value={pw}
                                onChange={(e) => setPw(e.target.value)}
                                placeholder="Create a secure password"
                            />
                            
                            <div className="space-y-3">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Authority Level
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    {authorityLevels.map((level) => (
                                        <motion.div
                                            key={level.value}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className={`
                                                p-3 rounded-xl cursor-pointer border-2 transition-all duration-300
                                                ${authority === level.value 
                                                    ? 'border-purple-500 bg-purple-50' 
                                                    : 'border-gray-200 bg-white/50 hover:border-gray-300'
                                                }
                                            `}
                                            onClick={() => setAthority(level.value)}
                                        >
                                            <div className="flex items-center space-x-2 mb-1">
                                                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${level.color}`} />
                                                <span className="font-medium text-sm">{level.label}</span>
                                            </div>
                                            <p className="text-xs text-gray-600">{level.description}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="space-y-3">
                                <AnimatedButton
                                    onClick={handleRegister}
                                    disabled={isLoading || !id || !pw}
                                    className="w-full"
                                >
                                    <div className="flex items-center justify-center space-x-2">
                                        <Shield className="w-5 h-5" />
                                        <span>{isLoading ? 'Creating Account...' : 'Create Account'}</span>
                                    </div>
                                </AnimatedButton>
                                
                                <AnimatedButton
                                    onClick={() => navigate('/login')}
                                    variant="outline"
                                    className="w-full"
                                >
                                    Back to Login
                                </AnimatedButton>
                            </div>
                        </motion.div>
                    </GlassCard>
                ) : (
                    <GlassCard className="p-8 text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-4"
                        >
                            <Key className="w-16 h-16 mx-auto text-gray-400" />
                            <h2 className="text-xl font-semibold text-gray-700">Identity Required</h2>
                            <p className="text-gray-600">Please connect your identity first to register.</p>
                            <AnimatedButton
                                onClick={() => navigate('/login')}
                                variant="outline"
                            >
                                Go to Login
                            </AnimatedButton>
                        </motion.div>
                    </GlassCard>
                )}
            </motion.div>
        </div>
    );
}

export default Register;