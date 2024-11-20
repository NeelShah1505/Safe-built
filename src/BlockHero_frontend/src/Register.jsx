import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIdentity } from './IdentityContext';
import { registerUser } from './api';
import { Principal } from "@dfinity/principal";


function Register() {
    const { identity, isIdentityLogin, updateIdentity } = useIdentity();
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [authority, setAthority] = useState(0);
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (id && pw) {
            const identityPrincipal = typeof identity === "string" ? Principal.fromText(identity) : identity;
            const authorityNat8 = Number(authority);
            if (authorityNat8 < 0 || authorityNat8 > 255) {
                alert("권한 값은 0에서 255 사이여야 합니다.");
                return;
            }

            await registerUser(identityPrincipal, id, pw, authorityNat8);
            alert("등록되었습니다!");
            navigate('/login');
        } else {
            alert("ID와 PW를 입력하세요.");
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.registerBox}>
                {isIdentityLogin ? 
                    <div>
                        <p>Identity : {identity}</p>
                        <h2 style={styles.title}>Register</h2>
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
                        <input
                            type="number"
                            placeholder="Authority"
                            value={authority}
                            onChange={(e) => setAthority(e.target.value)}
                            style={styles.input}
                            min={0}
                            max={10}
                            step="1" 
                        />
                        <button onClick={handleRegister} style={styles.button}>
                            Register
                        </button>
                        <button onClick={() => navigate('/login')} style={{ ...styles.button, backgroundColor: '#6c757d' }}>
                            Back to Login
                        </button>
                    </div>
                : 
                    <div>

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
    registerBox: {
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

export default Register;
