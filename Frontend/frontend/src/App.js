import React, { useState } from 'react';

function App() {
    const [fileTitle, setFileTitle] = useState('');
    const [fileContent, setFileContent] = useState('');
    const [displayContent, setDisplayContent] = useState('');

    const handleUpload = () => {
        // 파일 업로드 시 파일 제목과 내용을 저장 (예시로 저장만 진행)
        console.log('File Title:', fileTitle);
        console.log('File Content:', fileContent);
        alert('파일이 업로드되었습니다.');
    };

    const handleRead = () => {
        // 파일 읽기 시 저장된 파일 내용을 표시
        setDisplayContent(fileContent || '파일 내용을 입력해 주세요.');
    };

    return (
        <div className="container mx-auto p-4 max-w-md">
            {/* 파일 업로드 섹션 */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold mb-4">파일 업로드</h1>
                <label className="block font-semibold mb-2">파일 제목을 입력하십시오.</label>
                <input
                    type="text"
                    placeholder="텍스트 입력 창"
                    className="w-full p-2 border rounded mb-4"
                    value={fileTitle}
                    onChange={(e) => setFileTitle(e.target.value)}
                />
                <label className="block font-semibold mb-2">파일 내용을 입력하십시오.</label>
                <input
                    type="text"
                    placeholder="텍스트 입력 창"
                    className="w-full p-2 border rounded mb-4"
                    value={fileContent}
                    onChange={(e) => setFileContent(e.target.value)}
                />
                <button
                    onClick={handleUpload}
                    className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Upload File
                </button>
            </div>

            <hr className="my-8" />

            {/* 파일 읽기 섹션 */}
            <div>
                <h1 className="text-2xl font-bold mb-4">파일 읽기</h1>
                <label className="block font-semibold mb-2">파일 제목을 입력하십시오.</label>
                <input
                    type="text"
                    placeholder="텍스트 입력 창"
                    className="w-full p-2 border rounded mb-4"
                    value={fileTitle}
                    onChange={(e) => setFileTitle(e.target.value)}
                />
                <label className="block font-semibold mb-2">파일 내용</label>
                <p className="w-full p-2 border rounded bg-gray-100 mb-4">{displayContent}</p>
                <button
                    onClick={handleRead}
                    className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Read File
                </button>
            </div>
        </div>
    );
}

export default App;
