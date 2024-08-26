import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../config/firebase'

const TugasId = () => {
  const { tugasId } = useParams()
  const [data, setData] = useState()

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "tugas", tugasId);
      const theData = await getDoc(docRef);
      setData(theData.data())
      console.log(theData.data()) 
    }
    getData()
  }, [tugasId])
  
  return (
    <div className="w-full">
    {data ? (
      <div className="p-4 flex flex-col gap-2 md:flex-row">
        <img src={data.image} className='border w-full aspect-square' alt="" />
        <dl className="-my-3 divide-y divide-gray-100 text-sm">
          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Tugas</dt>
            <dd className="text-gray-700 sm:col-span-2">{data.tugasName}</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Link Tugas</dt>
            <dd className="text-gray-700 sm:col-span-2">{data.tugasLink}</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Nama Guru</dt>
            <dd className="text-gray-700 sm:col-span-2">{data.teacher}</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Kelas</dt>
            <dd className="text-gray-700 sm:col-span-2">{data.class}</dd>
          </div>

          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-gray-900">Dkripsi</dt>
            <dd className="text-gray-700 sm:col-span-2">
              {data.tugasDescription}
            </dd>
          </div>
        </dl>
      </div>
      ) : (
        <p>Loading</p>
      )}
    </div>
  )
}

export default TugasId
