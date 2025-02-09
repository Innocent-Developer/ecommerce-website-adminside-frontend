import React, { useState } from 'react';
import FileBase64 from 'react-file-base64';
import { AvatorButton } from './Avator Button';

export const Avatars = () => {
    const [avatar, setAvatar] = useState({});

    const handleFileUpload = (file) => {
        setAvatar({ image: file.base64 });
        // Simulate saving to a database here
        console.log('Base64 Image:', file.base64);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 p-4">
            <form className="bg-white shadow-lg border border-gray-300 rounded-2xl p-8 text-center w-full max-w-md">
                <span className="text-2xl font-semibold text-black">Upload your file</span>
                <p className="mt-2 text-sm text-gray-600">File should be an image</p>

                <div className="mt-6 flex flex-col items-center gap-2 p-6 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer transition hover:bg-blue-50 hover:border-gray-600">
                    <span className="text-lg font-bold text-gray-700">Drop files here</span>
                    <span className="text-gray-500">or click to upload</span>

                    {/* FileBase64 Component */}
                    <FileBase64
                        multiple={false}
                        onDone={handleFileUpload}
                    />
                </div>
            <AvatorButton />
            </form>

            {/* Display uploaded image */}
            {avatar.image && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold text-center">Preview:</h3>
                    <img
                        src={avatar.image}
                        alt="Uploaded Avatar"
                        className="mt-4 w-40 h-40 rounded-full object-cover mx-auto shadow-md"
                    />
                </div>
            )}
        </div>
    );
};


