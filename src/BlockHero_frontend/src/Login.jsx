import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, User, Sparkles } from 'lucide-react';
import { useIdentity } from './IdentityContext';
import { useUserId } from './UserContext';
import { AuthClient } from '@dfinity/auth-client';
import { login } from './api';
import { Principal } from "@dfinity/principal";
import AnimatedBackground from './components/AnimatedBackground';
import GlassCard from './components/GlassCard';
import AnimatedButton from './components/AnimatedButton';
import AnimatedInput from './components/AnimatedInput';


function Login() {
    const { identity, isIdentityLogin, updateIdentity } = useIdentity();
    const {userId, isUserLogin, updateUserId} = useUserId();
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
  
    async function authenticate() {
        setIsLoading(true);
        try {
            const authClient = await AuthClient.create();
            await authClient.login({
                identityProvider: "https://identity.ic0.app/#authorize",
                onSuccess: async () => {
                    const identity = authClient.getIdentity();
                    updateIdentity(identity.getPrincipal().toString());
                },
            });
        } finally {
            setIsLoading(false);
        }
    }


    const handleLogin = async () => {
        setIsLoading(true);
        const identityPrincipal = typeof identity === "string" ? Principal.fromText(identity) : identity;

        try {
            if (await login(identityPrincipal, id, pw)) {
                updateUserId(id);
                navigate('/');
                console.log("로그인 되었습니다!!!")
            } else {
                alert("잘못된 ID 또는 PW입니다.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <AnimatedBackground />
            
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-md"
            >
                <AnimatePresence mode="wait">
                    {!isIdentityLogin ? (
                        <motion.div
                            key="identity-login"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.5 }}
                            className="text-center"
                        >
                            <GlassCard className="p-8">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="mb-8"
                                >
                                    <div className="flex justify-center mb-6">
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                            className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                                        >
                                            <Shield className="w-12 h-12 text-white" />
                                        </motion.div>
                                    </div>
                                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                                        BlockHero
                                    </h1>
                                    <p className="text-gray-600 mb-6">
                                        Secure blockchain file management with dual authorization
                                    </p>
                                </motion.div>
                                
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <AnimatedButton
                                        onClick={authenticate}
                                        disabled={isLoading}
                                        className="w-full text-lg py-4"
                                    >
                                        <div className="flex items-center justify-center space-x-2">
                                            <Sparkles className="w-5 h-5" />
                                            <span>{isLoading ? 'Connecting...' : 'Connect Identity'}</span>
                                        </div>
                                    </AnimatedButton>
                                </motion.div>
                            </GlassCard>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="user-login"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.5 }}
                        >
                            <GlassCard className="p-8">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-center mb-8"
                                >
                                    <div className="flex justify-center mb-4">
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                                        >
                                            <Lock className="w-8 h-8 text-white" />
                                        </motion.div>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
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
                                        placeholder="Enter your user ID"
                                    />
                                    
                                    <AnimatedInput
                                        label="Password"
                                        type="password"
                                        value={pw}
                                        onChange={(e) => setPw(e.target.value)}
                                        placeholder="Enter your password"
                                    />
                                    
                                    <div className="space-y-3">
                                        <AnimatedButton
                                            onClick={handleLogin}
                                            disabled={isLoading || !id || !pw}
                                            className="w-full"
                                        >
                                            <div className="flex items-center justify-center space-x-2">
                                                <User className="w-5 h-5" />
                                                <span>{isLoading ? 'Logging in...' : 'Login'}</span>
                                            </div>
                                        </AnimatedButton>
                                        
                                        <AnimatedButton
                                            onClick={() => navigate('/register')}
                                            variant="outline"
                                            className="w-full"
                                        >
                                            Create Account
                                        </AnimatedButton>
                                    </div>
                                </motion.div>
                            </GlassCard>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}

export default Login;
                </div>
            </div>
            :
            <div text-2xl font-bold mb-4>
                <img src="/logo2.svg" alt="DFINITY logo" />
                <div className="auth-section flex justify-center items-center">
                    <button 
                        className="
                        auth-button
                        bg-gradient-to-r from-blue-500 to-purple-600 
                        text-white 
                        font-semibold 
                        px-6 
                        py-3 
                        rounded-full 
                        shadow-lg 
                        hover:shadow-xl 
                        hover:from-purple-600 
                        hover:to-blue-500 
                        transition-all 
                        duration-300 
                        ease-in-out
                        "
                        onClick={authenticate}
                    >
                        Identity Login
                    </button>
                </div>
            </div>
            }
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f8f9fa',
    },
    loginBox: {
        width: '300px',
        padding: '40px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        backgroundColor: '#ffffff',
        textAlign: 'center',
    },
    title: {
        marginBottom: '24px',
        fontSize: '24px',
        color: '#333',
    },
    input: {
        width: '100%',
        padding: '12px',
        marginBottom: '16px',
        border: '1px solid #ced4da',
        borderRadius: '4px',
        fontSize: '16px',
    },
    button: {
        width: '100%',
        padding: '12px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginBottom: '8px',
    },
};

export default Login;
