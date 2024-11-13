import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 hook

function App() {
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
        <div className="container mx-auto p-4 max-w-lg">
            {/* 파일 업로드 섹션 */}
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

            {/* 파일 읽기 섹션 */}
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
            {/* Page.js로 이동 버튼 */}
            <button
                onClick={goToPage}
                className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
                Go to Page
            </button>
        </div>
    );
}

export default App;
