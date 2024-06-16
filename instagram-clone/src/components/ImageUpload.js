import React, { useState } from 'react';
import { db, storage } from '../firebase-config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';


function ImageUpload({ username }) {
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState('');
    const [progress, setProgress] = useState(0);
  
    const handleChange = (e) => {
      if (e.target.files[0]) {
        setImage(e.target.files[0]);
      }
    };
  
    const handleUpload = async () => {
      const imageRef = ref(storage, `images/${image.name}`);
      const snapshot = await uploadBytes(imageRef, image);
      const url = await getDownloadURL(snapshot.ref);
  
      await addDoc(collection(db, "posts"), {
        timestamp: serverTimestamp(),
        caption: caption,
        imageUrl: url,
        username: username
      });
  
      setProgress(0);
      setCaption('');
      setImage(null);
    };
  
    return (
      <div>
        <input type="text" placeholder="Enter a caption..." onChange={event => setCaption(event.target.value)} value={caption}/>
        <input type="file" onChange={handleChange} />
        <button onClick={handleUpload}>Upload</button>
        <progress value={progress} max="100" />
      </div>
    );
  }
  
  export default ImageUpload;
  
