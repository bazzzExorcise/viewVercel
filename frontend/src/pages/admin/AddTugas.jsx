import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CiImageOn } from "react-icons/ci";
import { ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db, storage } from '../../config/firebase';
import { addDoc, collection, Timestamp } from 'firebase/firestore';

const AddTugas = () => {
  const { teacherId } = useParams();
  const navigate = useNavigate()
  const [file, setFile] = useState()
  const [imageLink, setImageLink] = useState()

  const addingFile = async (e) => {
    e.preventDefault()
    if (file != undefined) {
      const name = new Date().getTime() + file.name
      console.log(name)
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed', 
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        }, 
        (error) => {
          console.log(error)
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageLink(downloadURL)
          });
        }
      );
    }else{
      setImageLink('no image link')
    }

    const idFixing = (e) => {
      let teacherName = ""
      let teacherNameArray = e.split('_')
      for (let i = 0; i < teacherNameArray.length; i++) {
        if(i == teacherNameArray.length - 1) {
          teacherName += teacherNameArray[i].toUpperCase()
        }else{
          teacherName += teacherNameArray[i].toUpperCase() + " "
        }
      }
      return teacherName
    }

    function formatFirestoreDateInIndonesian(date) {
      const options = {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',hour: 'numeric',
          minute: 'numeric',
          timeZone: 'Asia/Jakarta' 
      };
  
      const formatter = new Intl.DateTimeFormat('id-ID', options);
      return formatter.format(date);
    }  

    const addingDocument = await addDoc(collection(db, "tugas"), {
      teacher : idFixing(teacherId),
      image : imageLink ? imageLink : 'no image provided',
      tugasName : document.getElementById('tugas-name').value ? document.getElementById('tugas-name').value : 'no title task',
      tugasLink : document.getElementById('tugas-link').value ? document.getElementById('tugas-link').value : 'no link provided',
      tugasDescription : document.getElementById('tugas-description').value ? document.getElementById('tugas-description').value : 'no description',
      class : document.getElementById('forclass').value,
      timestamp: Timestamp.now(),
      waktu_absen: formatFirestoreDateInIndonesian(new Date()), 
      waktu_detail: { 
        days: new Date().getDay(),
        hour: new Date().getHours(),
        minute: new Date().getMinutes(),
        second: new Date().getSeconds(),
        day: new Date().getDate(),
        month: new Date().getMonth() + 1 
      },
    })
    console.log(addingDocument)
    navigate('/admin/' + teacherId)
  }

  return (
    <div className="mt-10 flex flex-col items-center text-sm px-4 sm:px-20">
      <div className="w-full flex flex-col">
        <b className='text-xl'>Upload Tugas</b>
        <p>upload tugas untuk kelas?</p>
      </div>
      <form onSubmit={(e) => addingFile(e)} className='flex flex-col gap-2 w-full mt-2'>
        <input required className='active:ring-0 ' id='forclass' type="text" placeholder='tulis kelas disini'/>
        <label htmlFor="image" className="w-full flex flex-col items-center justify-center aspect-video p-2 px-3 text-xs text-gray-700 border-dashed border border-black rounded">
          <CiImageOn className='text-7xl mb-4' />
          <p className='text-sm mb-2'>masukan gambar, atau pilih file bila ada</p>
          <input
            type="file"
            id="image"
            accept=".jpg, .jpeg, .png"
            onChange={(e) => setFile(e.target.files[0])}
            className='w-auto border p-2 border-black rounded'
          />
        </label>

        <input
          type="text"
          id="tugas-link"
          placeholder="link bila ada"
          className="w-full p-2 px-3 text-xs text-gray-700 border border-black rounded"
        />

        <input
          type="text"
          id="tugas-name"
          placeholder="judul tugas"
          className="w-full p-2 px-3 text-xs text-gray-700 border border-black rounded"
        />

        <textarea
          id="tugas-description"
          placeholder="deskripsi tugas"
          className="w-full p-2 px-3 text-xs text-gray-700 border border-black rounded"
        />
        <button type='submit' className='w-full bg-black text-white text-center py-2 rounded'>submit</button>
      </form>
    </div>
  );
};

export default AddTugas;