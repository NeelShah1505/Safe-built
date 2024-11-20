import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIdentity } from './IdentityContext';
import { useUserId } from './UserContext';
import { AuthClient } from '@dfinity/auth-client';
import { login } from './api';
import { Principal } from "@dfinity/principal";


function Login() {
    // const {identity} = useIdentity();
    const { identity, isIdentityLogin, updateIdentity } = useIdentity();
    const {userId, isUserLogin, updateUserId} = useUserId();
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const navigate = useNavigate();
  
    async function authenticate() {
      const authClient = await AuthClient.create();
      await authClient.login({
        identityProvider: "https://identity.ic0.app/#authorize",
        onSuccess: async () => {
          const identity = authClient.getIdentity();
          updateIdentity(identity.getPrincipal().toString());
        },
      });
    }


    const handleLogin = async () => {
        const identityPrincipal = typeof identity === "string" ? Principal.fromText(identity) : identity;

        if (await login(identityPrincipal, id, pw)) {
            updateUserId(id);
            navigate('/');
            console.log("로그인 되었습니다!!!")
        } else {
            alert("잘못된 ID 또는 PW입니다.");
        }
    };

    return (
        <div style={styles.container}>
            <div>
            <br />
            {isIdentityLogin ? 
            <div>
                <p>Identity : {identity}</p>
                <p>userId : {userId}</p>
                <p>isUserLogin : {isUserLogin}</p>
                <div style={styles.loginBox}>
                    <h2 style={styles.title}>Login</h2>
                    <input
                        type="text"
                        placeholder="ID"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        style={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={pw}
                        onChange={(e) => setPw(e.target.value)}
                        style={styles.input}
                    />
                    <button onClick={handleLogin} style={styles.button}>
                        Login
                    </button>
                    <button onClick={() => navigate('/register')} style={{ ...styles.button, backgroundColor: '#6c757d' }}>
                        Register
                    </button>
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
