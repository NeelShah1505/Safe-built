import { useState } from 'react';
import { icp_make_canister_backend } from 'declarations/icp-make-canister-backend';




function App() {
  const [message, setMessage] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [userId, setUserId] = useState('');
  // const [userPw, setUserPw] = useState('');
  const [fileContents, setFileContents] = useState('');


  function registerUser(event) {
    event.preventDefault();
    const userId = event.target.elements.register_id.value;
    const userPw = event.target.elements.register_pw.value;
    icp_make_canister_backend.register({id: userId, pw: userPw}).then((isRegistered) => {
      setMessage(`user is registered? : ${isRegistered}`);
    });
    return false;
  };

  function login(event) {
    event.preventDefault();
    const userId = event.target.elements.login_id.value;
    const userPw = event.target.elements.login_pw.value;
    icp_make_canister_backend.login({id: userId, pw: userPw}).then((isLogin) => {
      if (isLogin){
        setUserId(userId)
      } else {
        setUserId('');
      };
      setIsLogin(isLogin);
    });
  };

  function uploadFile(event) {
    event.preventDefault();
    const fileTitle = event.target.elements.upload_file_title.value;
    const fileContents = event.target.elements.upload_file_contents.value;
    if (isLogin) {
      icp_make_canister_backend.uploadFile({title: fileTitle, contents: fileContents}, userId).then((isUploaded) => {
        console.log("isUploaded? ",isUploaded )
      });
    };
   
  };
  
  function readFile(event) {
    event.preventDefault();
    const fileTitle = event.target.elements.read_file_title.value;
    if (isLogin) {
      icp_make_canister_backend.readFile(fileTitle, userId).then((file) => {
        if (file.length > 0) {
          console.log("file",file);
          setFileContents(file[0].contents);
        } else {
          setFileContents('');
        }
      });
    } else {
      console.log("can't read file")
    }
  };

  return (
    <main>
      <img src="/logo2.svg" alt="DFINITY logo" />
      <br />
      <br />
      {/* <div>
        <p>login? {isLogin}</p>
        <p>user? {userId}</p>
      </div> */}
      <div>
        <p>Register User</p>
        <form action="#" onSubmit={registerUser}>
          <label htmlFor="register_id">ID : &nbsp;</label>
          <input id="register_id" alt="ID" type="text" />
          <label htmlFor="register_pw">PW : &nbsp;</label>
          <input id="register_pw" alt="PW" type="text" />
          <button type="submit">REGISTER</button>
        </form>
        <section id="message">{message}</section>
      </div>
      <div>
        <p>{`User Login? ${isLogin} User Id? ${userId}`}</p>
        <form action="#" onSubmit={login}>
          <label htmlFor="login_id">ID : &nbsp;</label>
          <input id="login_id" alt="ID" type="text" />
          <label htmlFor="login_pw">PW : &nbsp;</label>
          <input id="login_pw" alt="PW" type="text" />
          <button type="submit">LOGIN</button>
        </form>
      </div>
      <div>
        <p>Upload File</p>
        <form action="#" onSubmit={uploadFile}>
          <label htmlFor="upload_file_title">Title : &nbsp;</label>
          <input id="upload_file_title" alt="Title" type="text" />
          <label htmlFor="upload_file_contents">Contents : &nbsp;</label>
          <input id="upload_file_contents" alt="Contents" type="text" />
          <button type="submit">UPLOAD</button>
        </form>
      </div>
      <div>
        <p>Read File</p>
        <form action="#" onSubmit={readFile}>
          <label htmlFor="read_file_title">Title : &nbsp;</label>
          <input id="read_file_title" alt="Title" type="text" />
          <button type="submit">READ</button>
        </form>
        <section id="file_contents">{`file contents : ${fileContents}`}</section>
      </div>
    </main>
  );
}

export default App;
