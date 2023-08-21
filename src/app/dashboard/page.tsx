"use client";
import { useState, useEffect, Key } from 'react';
import { NextRequest } from 'next/server';
import key from "../../../key.json";
import { redirect } from 'next/navigation';
import UploadBox from '../../../components/UploadBox';

export default function Dashboard() {
    const [images, setImages]:any = useState([]);

    useEffect(() => {
        fetch('/api/image?key=' + document.cookie, {
            method: 'GET'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const imageFiles = data.files.filter((file: string) => file !== '.DS_Store');
            const imageObjects = imageFiles.map((file: any, index: any) => ({
                id: index,
                url: '/api/image/'+file,
                files: file
            }));
            setImages(imageObjects);
        })
        .catch(error => console.error('Error fetching images:', error));
    }, []);

    const copyToClipboard = (url: any) => {
        navigator.clipboard.writeText(url);
    };

    const deleteImage = (id: any) => {
             fetch('/api/image/' + id + '?key=' + key, {
            method: 'DELETE',
        })
        };

    return (
        <div className="p-4">
            <div className="grid grid-cols-3 gap-4">
                <div>
                <UploadBox />
                </div>
                {images.map((images: { id:any | undefined; url: string | undefined; files: any}) => (
                    <div key={images.id} className="border p-2">
                        <img src={images.url} alt="Uploaded" className="mb-2 w-full h-48 object-cover" />
                        <button onClick={() => copyToClipboard(images.url)} className="bg-blue-500 text-white p-2 rounded mb-2">Copy URL</button>
                        <button onClick={() => deleteImage(images.files)} className="bg-red-500 text-white p-2 rounded">Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}