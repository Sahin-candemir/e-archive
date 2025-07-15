import axios from 'axios';
import React, { useState, useRef } from 'react';
import { API_BASE_URL } from '../api/apiConfig';
function FileUploadPage({ folderId }) {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    };

    const handleUpload = async () => {
        const formData = new FormData();

        Array.from(files).forEach(file => {
            formData.append('files', file);
        });

        setUploading(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/files/upload-multiple/${folderId ?? ''}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Files uploaded successfully!');
            console.log(response.data);
            setFiles([]);
            fileInputRef.current.value = null;
            
        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;

                if (status === 400 && data.failedFileNames) {
                    const failedList = data.failedFileNames.join('\n');
                    alert(
                        'Some files could not be uploaded because they already exist:\n' + failedList
                        );
                } else {
                    alert('An error occurred during the upload.');
                }
            } else {
                alert('Unable to reach the server.');
            }
        }
        setUploading(false);
    };

    return (
        <div className="container mt-5">
            <h3>File Upload</h3>

            <div className="mb-3">
                <label htmlFor="formFileMultiple" className="form-label">Choose multiple files</label>
                <input
                    className="form-control"
                    type="file"
                    id="formFileMultiple"
                    multiple
                    onChange={handleFileChange}
                    ref={fileInputRef}
                />
            </div>

            {files.length > 0 && (
                <div className="mb-3">
                    <h5>Selected Files:</h5>
                    <ul className="list-group">
                        {Array.from(files).map((file, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                {file.name}
                                <span className="badge bg-info rounded-pill">{(file.size / 1024).toFixed(1)} KB</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <button
                className="btn btn-primary"
                onClick={handleUpload}
                disabled={uploading || files.length === 0}
            >
                {uploading ? 'Uploading...' : 'Upload Files'}
            </button>
        </div>
    );
}

export default FileUploadPage;
