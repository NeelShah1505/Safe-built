import { useState } from 'react';
import { icp_make_canister_backend } from 'declarations/icp-make-canister-backend';
import { sha256, sha224 } from 'js-sha256';
import { Nat8 } from '@dfinity/candid/lib/cjs/idl';
import { AuthClient } from '@dfinity/auth-client';
import { HttpAgent } from '@dfinity/agent';

function App() {
  const [message, setMessage] = useState('');
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');
  const [fileContents, setFileContents] = useState('');
  const [identity, setIdentity] = useState('');
  const [isIdentityLogin, setIsIdentityLogin] = useState(false);

  async function authenticate() {
    const authClient = await AuthClient.create();
    await authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: async () => {
        const identity = authClient.getIdentity();
        console.log(identity.getPrincipal().toString());
        setIdentity(identity.getPrincipal().toString())
        setIsIdentityLogin(true);
      },
    });
  }

  function registerUser(event) {
    event.preventDefault();
    if (!isIdentityLogin) {
      return
    }
    const userId = event.target.elements.register_id.value;
    const userPw = event.target.elements.register_pw.value;
    const userAuth = event.target.elements.register_auth.valueAsNumber;
    icp_make_canister_backend.registerUser({identity : identity, userId: userId, userPw: userPw}, userAuth).then((isRegistered) => {
      setMessage(`${userId} user is registered? : ${isRegistered}`);
      console.log(`${userId} user is registered? : ${isRegistered}`);
    });
    return false;
  };

  function login(event) {
    event.preventDefault();
    if (!isIdentityLogin) {
      return
    }
    const userId = event.target.elements.login_id.value;
    const userPw = event.target.elements.login_pw.value;
    icp_make_canister_backend.login({identity, userId, userPw}).then((isUserLogin) => {
      if (isUserLogin){
        console.log("login success");
        setUserId(userId)
        setUserPw(userPw)
      } else {
        console.log("login failed");
        setUserId('');
        setUserPw('')
      };
      setIsUserLogin(isUserLogin);
    });
  };

  function uploadFile(event) {
    event.preventDefault();
    if (!isIdentityLogin) {
      return
    }
    const fileTitle = event.target.elements.upload_file_title.value;
    const fileContents = event.target.elements.upload_file_contents.value;
    const fileAuth = event.target.elements.upload_file_auth.valueAsNumber;
    if (isUserLogin) {
      icp_make_canister_backend.uploadFile(fileTitle, fileContents, fileAuth, {identity, userId, userPw}).then((isUploaded) => {
        console.log("upload success? ",isUploaded )
      });
    };
   
  };
  
  function readFile(event) {
    event.preventDefault();
    if (!isIdentityLogin) {
      return
    }
    const fileTitle = event.target.elements.read_file_title.value;
    if (isUserLogin) {
      icp_make_canister_backend.readFile(fileTitle, {identity, userId, userPw}).then((file) => {
        if (file.length > 0) {
          console.log("file",file);
          setFileContents(file[0].contents);
        } else {
          console.log("can't read file")
          setFileContents("can't read file");
        }
      });
    } else {
      console.log("can't read file")
      setFileContents("can't read file");
    }
  };

  
  // async function callCanister(identity) {
  //   const agent = new HttpAgent({ identity });
  //   console.log("identity :",identity)
  
  // }

  return (
    <main>
      <img src="/logo2.svg" alt="DFINITY logo" className="logo" />
      <div className="auth-section">
        <button className="auth-button" onClick={authenticate}>Identity Login</button>
      </div>
      {isIdentityLogin ? 
      <div>
        <p>Identity : {identity}</p>
        <div className="form-section">
          <h2>Register User</h2>
          <form onSubmit={registerUser}>
            <label htmlFor="register_id">ID: </label>
            <input id="register_id" type="text" />
            <label htmlFor="register_pw">PW: </label>
            <input id="register_pw" type="text" />
            <label htmlFor="register_auth">AUTH: </label>
            <input id="register_auth" type="number" min="0" max="3" />
            <button type="submit">REGISTER</button>
            <section id="message">Message: {message}</section>
          </form>
        </div>
        <div className="form-section">
          
          {isUserLogin ? 
            <h2>{`User Id : ${userId}`}</h2>
          :
          <div>
            <h2>User Login</h2>
            <form onSubmit={login}>
              <label htmlFor="login_id">ID: </label>
              <input id="login_id" type="text" />
              <label htmlFor="login_pw">PW: </label>
              <input id="login_pw" type="text" />
              <button type="submit">LOGIN</button>
            </form>
          </div>}
        </div>
        {isUserLogin ? 
        <div>
          <div className="form-section">
            <h2>Upload File</h2>
            <form onSubmit={uploadFile}>
              <label htmlFor="upload_file_title">Title: </label>
              <input id="upload_file_title" type="text" />
              <label htmlFor="upload_file_contents">Contents: </label>
              <input id="upload_file_contents" type="text" />
              <label htmlFor="upload_file_auth">AUTH: </label>
              <input id="upload_file_auth" type="number" min="0" max="3" />
              <button type="submit">UPLOAD</button>
            </form>
          </div>
          <div className="form-section">
            <h2>Read File</h2>
            <form onSubmit={readFile}>
              <label htmlFor="read_file_title">Title: </label>
              <input id="read_file_title" type="text" />
              <button type="submit">READ</button>
            </form>
            <section id="file_contents">{`File contents: ${fileContents}`}</section>
          </div>
        </div>
        : 
        <div/>}
      </div>
      : 
      <div/>}
      
    </main>
  );
}

export default App;
