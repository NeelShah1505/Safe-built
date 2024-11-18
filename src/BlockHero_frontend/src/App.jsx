import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 hook
import { BlockHero_backend } from 'declarations/BlockHero_backend';
import { AuthClient } from '@dfinity/auth-client';

function App() {
  const [greeting, setGreeting] = useState('');
  const [identity, setIdentity] = useState('');
  const [isIdentityLogin, setIsIdentityLogin] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    BlockHero_backend.greet(name).then((greeting) => {
      setGreeting(greeting);
    });
    return false;
  }

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


  const [fileTitle, setFileTitle] = useState('');
    const [fileContent, setFileContent] = useState('');
    const [displayContent, setDisplayContent] = useState('');
    const [uploadedFiles, setUploadedFiles] = useState({});
    const [readTitle, setReadTitle] = useState('');

    const navigate = useNavigate(); // useNavigate를 통해 페이지 이동 함수 호출

    const handleUpload = () => {
        if (fileTitle && fileContent) {
            setUploadedFiles((prevFiles) => ({
                ...prevFiles,
                [fileTitle]: fileContent,
            }));
            alert('파일이 업로드되었습니다.');
            setFileTitle('');
            setFileContent('');
        } else {
            alert('파일 제목과 내용을 입력하세요.');
        }
    };

    const handleRead = () => {
        if (uploadedFiles[readTitle]) {
            setDisplayContent(uploadedFiles[readTitle]);
        } else {
            setDisplayContent("해당 제목의 파일이 없습니다.");
        }
    };

    // Page.js로 이동하는 함수
    const goToPage = () => {
        navigate('/page');
    };

  return (
    <main>
      <img src="/logo2.svg" alt="DFINITY logo" />
      <div className="auth-section">
        <button className="auth-button" onClick={authenticate}>Identity Login</button>
      </div>
      <br />
      {isIdentityLogin ? 
      <div>
        <p>Identity : {identity}</p>
      </div>
      :
      <div text-2xl font-bold mb-4>Not Login<div>sdfsdfsdf</div></div>
      }


      <div className="container mx-auto p-4 max-w-lg">
            <div className="mb-8 p-4 border border-gray-300 shadow-md rounded-md">
                <h1 className="text-2xl font-bold mb-4">파일 업로드</h1>
                
                <div className="grid gap-2 mb-4">
                    <label className="font-semibold">파일 제목을 입력하십시오.</label>
                    <input
                        type="text"
                        placeholder="텍스트 입력 창"
                        className="p-2 border border-gray-300 rounded"
                        value={fileTitle}
                        onChange={(e) => setFileTitle(e.target.value)}
                    />
                </div>

                <div className="grid gap-2 mb-4">
                    <label className="font-semibold">파일 내용을 입력하십시오.</label>
                    <input
                        type="text"
                        placeholder="텍스트 입력 창"
                        className="p-2 border border-gray-300 rounded"
                        value={fileContent}
                        onChange={(e) => setFileContent(e.target.value)}
                    />
                </div>

                <button
                    onClick={handleUpload}
                    className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Upload File
                </button>
            </div>

            <div className="p-4 border border-gray-300 shadow-md rounded-md">
                <h1 className="text-2xl font-bold mb-4">파일 읽기</h1>
                
                <div className="grid gap-2 mb-4">
                    <label className="font-semibold">파일 제목을 입력하십시오.</label>
                    <input
                        type="text"
                        placeholder="텍스트 입력 창"
                        className="p-2 border border-gray-300 rounded"
                        value={readTitle}
                        onChange={(e) => setReadTitle(e.target.value)}
                    />
                </div>

                <div className="grid gap-2 mb-4">
                    <label className="font-semibold">파일 내용</label>
                    <p className="p-2 border border-gray-300 bg-gray-100 rounded h-16">
                        {displayContent || '텍스트를 보여줄 수 있는 창'}
                    </p>
                </div>

                <button
                    onClick={handleRead}
                    className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Read File
                </button>
            </div>

            <button
                onClick={goToPage}
                className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
                Go to Page
            </button>
        </div>






      <br />
      <form action="#" onSubmit={handleSubmit}>
        <label htmlFor="name">Enter your name: &nbsp;</label>
        <input id="name" alt="Name" type="text" />
        <button type="submit">Click Me!</button>
      </form>
      <section id="greeting">{greeting}</section>
    </main>
  );
}

export default App;
