import React, { useState } from 'react';

function App() {
    const [fileTitle, setFileTitle] = useState(''); // 업로드 섹션의 파일 제목
    const [fileContent, setFileContent] = useState(''); // 업로드 섹션의 파일 내용
    const [displayContent, setDisplayContent] = useState(''); // 표시할 내용
    const [uploadedFiles, setUploadedFiles] = useState({}); // 파일 제목과 내용을 저장할 상태
    const [readTitle, setReadTitle] = useState(''); // 읽기 섹션의 파일 제목

    const handleUpload = () => {
        if (fileTitle && fileContent) {
            // 새로운 파일을 저장
            setUploadedFiles((prevFiles) => ({
                ...prevFiles,
                [fileTitle]: fileContent,
            }));
            alert('파일이 업로드되었습니다.');
            // 업로드 후 입력 필드 초기화
            setFileTitle('');
            setFileContent('');
        } else {
            alert('파일 제목과 내용을 입력하세요.');
        }
    };

    const handleRead = () => {
        // 입력한 제목에 해당하는 파일 내용을 표시
        if (uploadedFiles[readTitle]) {
            setDisplayContent(uploadedFiles[readTitle]);
        } else {
            setDisplayContent("해당 제목의 파일이 없습니다.");
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-lg">
            {/* 파일 업로드 섹션 */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold mb-4">파일 업로드</h1>
                <label className="block font-semibold mb-2">파일 제목을 입력하십시오.</label>
                <input
                    type="text"
                    placeholder="파일 제목 입력"
                    className="w-full p-2 border rounded mb-4"
                    value={fileTitle}
                    onChange={(e) => setFileTitle(e.target.value)}
                />
                <label className="block font-semibold mb-2">파일 내용을 입력하십시오.</label>
                <input
                    type="text"
                    placeholder="파일 내용 입력"
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
                    placeholder="읽을 파일 제목 입력"
                    className="w-full p-2 border rounded mb-4"
                    value={readTitle}
                    onChange={(e) => setReadTitle(e.target.value)}
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
