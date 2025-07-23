// Home.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home({ onLogout, addLog }) {
    const [fileTitle, setFileTitle] = useState('');
    const [fileContent, setFileContent] = useState('');
    const [displayContent, setDisplayContent] = useState('');
    const [uploadedFiles, setUploadedFiles] = useState({});
    const [readTitle, setReadTitle] = useState('');

    const navigate = useNavigate();

    const handleUpload = () => {
        if (fileTitle && fileContent) {
            setUploadedFiles((prevFiles) => ({
                ...prevFiles,
                [fileTitle]: fileContent,
            }));
            addLog('uploaded', fileTitle); // Log file upload
            alert('File has been uploaded.');
            setFileTitle('');
            setFileContent('');
        } else {
            alert('Please enter a file title and content.');
        }
    };

    const handleRead = () => {
        if (uploadedFiles[readTitle]) {
            setDisplayContent(uploadedFiles[readTitle]);
            addLog('read', readTitle); // Log file read
        } else {
            setDisplayContent("No file found with that title.");
        }
    };

    const goToPage = () => {
        navigate('/page');
    };

    return (
        <div className="container mx-auto p-4 max-w-lg">
            <h1 className="text-2xl font-bold mb-4">Home Page</h1>

            {/* File Upload Section */}
            <div className="mb-8 p-4 border border-gray-300 shadow-md rounded-md">
                <h2 className="text-xl font-bold mb-4">Upload File</h2>
                <input
                    type="text"
                    placeholder="Enter file title"
                    value={fileTitle}
                    onChange={(e) => setFileTitle(e.target.value)}
                    className="p-2 border border-gray-300 rounded mb-2 w-full"
                />
                <input
                    type="text"
                    placeholder="Enter file content"
                    value={fileContent}
                    onChange={(e) => setFileContent(e.target.value)}
                    className="p-2 border border-gray-300 rounded mb-2 w-full"
                />
                <button onClick={handleUpload} className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Upload File
                </button>
            </div>

            {/* File Read Section */}
            <div className="p-4 border border-gray-300 shadow-md rounded-md">
                <h2 className="text-xl font-bold mb-4">Read File</h2>
                <input
                    type="text"
                    placeholder="Enter file title"
                    value={readTitle}
                    onChange={(e) => setReadTitle(e.target.value)}
                    className="p-2 border border-gray-300 rounded mb-2 w-full"
                />
                <button onClick={handleRead} className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-2">
                    Read File
                </button>
                <div className="p-2 border border-gray-300 bg-gray-100 rounded h-16">
                    {displayContent || 'Please check the file content.'}
                </div>
            </div>

            {/* Navigate to Page.js */}
            <button onClick={goToPage} className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600 mt-4">
                Check Log
            </button>

            {/* Logout Button */}
            <button onClick={onLogout} className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600 mt-4">
                Logout
            </button>
        </div>
    );
}

export default Home;
