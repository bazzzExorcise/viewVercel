import React, { useEffect, useState } from 'react'
import { db } from '../config/firebase'
import { addDoc, collection } from 'firebase/firestore'

const Jurnal = () => {
  const [email, setEmail] = useState('')
  const [uploader, setUploader] = useState('')
  const [subject, setSubject] = useState('')
  const [materi, setMateri] = useState('')

  const upload = async () => {
    const i = await addDoc(collection(db, 'jurnal'), {
      email,
      uploader,
      subject,
      materi,
    })
    console.log(i)
  }
  return (
    <div className='flex text-sm min-h-screen w-full justify-center items-center'>
      <div method='post' className="max-w-sm px-4 w-full gap-4 flex flex-col items-center">
        <div className='w-full flex flex-col items-start'>
          <b className='text-2xl'>Upload Jurnal</b>
          <p>upload sesuai pelajaran</p>
        </div>
        <div className='w-full'>
          <p>mata pelajaran</p>
          <input onChange={(e) => {setSubject(e.target.value)}} type="text" className='w-full border px-3 py-2 border-black rounded'/>
        </div>
        <div className='w-full'>
          <p>materi</p>
          <input onChange={(e) => {setMateri(e.target.value)}} type="text" className='w-full border px-3 py-2 border-black rounded'/>
        </div>
        <div className='w-full'>
          <p>uploader</p>
          <input onChange={(e) => {setUploader(e.target.value)}} type="text" className='w-full border px-3 py-2 border-black rounded'/>
        </div>
        <div className='w-full'>
          <p>email uploader</p>
          <input onChange={(e) => {setEmail(e.target.value)}} type="email" className='w-full border px-3 py-2 border-black rounded'/>
        </div>
        <button onClick={upload} className='w-full border px-3 py-2 border-black bg-black text-white rounded'>upload</button>
      </div>
    </div>
  )
}

export default Jurnal
