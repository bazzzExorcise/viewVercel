import { collection, getDocs, where, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../config/firebase'
import { FaChevronLeft } from "react-icons/fa6";
import Detail from './components/Detail';
import { ButtonCardBg } from '../../components/ButtonCard';
import DetailTugas from './components/DetailTugas';

const Teacher = () => {
  const [data, setData] = useState()
  const [dataTugas, setDataTugas] = useState()
  const { teacherId } = useParams()

  useEffect(() => {
    let teacherName = ''

    let teacherNameArray = teacherId.split('_')
    for (let i = 0; i < teacherNameArray.length; i++) {
      if(i == teacherNameArray.length - 1) {
        teacherName += teacherNameArray[i].toUpperCase()
      }else{
        teacherName += teacherNameArray[i].toUpperCase() + " "
      }
    }
    const getData = async () => {
      let list = []
      const q = query(collection(db, "absen"), where('teacher', '==', teacherName))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        list.push({id: doc.id, data:doc.data()})
      })
      setData(list)
      console.log(data)
    }

    const getDataTugas = async () => {
      let list = []
      const q = query(collection(db, "tugas"), where('teacher', '==', teacherName))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        list.push({id: doc.id, data:doc.data()})
      })
      setDataTugas(list)
      console.log(dataTugas)
    }
  
  getData()
  getDataTugas()
  }, [teacherId])

  const nameFixing = (e) => {
    let teacherName = ''

    let teacherNameArray = e.split('_')
    for (let i = 0; i < teacherNameArray.length; i++) {
      if(i == teacherNameArray.length - 1) {
        teacherName += teacherNameArray[i]
      }else{
        teacherName += teacherNameArray[i] + " "
      }
    }

    return teacherName
  }

  return (
    <div>
      <header className="mt-10 flex flex-col items-center justify-between px-4 sm:px-20">
        <div className="flex flex-col items-center text-sm text-center">
          <h1 className="text-3xl capitalize font-bold">{nameFixing(teacherId)}</h1>
          <b className="mb-4">Teacher Account</b>
          <p>anda dapat melakukan edit jurnal dan menambahkan tugas disini</p>
        </div>
        <div className="flex mt-4 items-center mb-2 gap-2 w-full">
          <div className="border-b-2 border-black w-full"></div>
          <p className='whitespace-nowrap'>Cari Jurnal</p>
          <div className="border-b-2 border-black w-full"></div>
        </div>
        <form className='w-full gap-2 flex'>
          <input
            placeholder="Search"
            className="bg-gray-100 w-full border border-gray-300 text-gray-600 py-2 text-xs px-4 rounded"
          />
          <button type="submit" className='px-4 whitespace-nowrap items-center flex-row-reverse flex justify-center gap-2 text-sm bg-white text-black hover:scale-105 duration-300 rounded-md border border-black p-2'>cari jurnal</button>
        </form> 
      </header>
      <div className="w-full px-4 mt-2 sm:px-20">
        <ButtonCardBg to={"/admin/addtugas/" + teacherId} text="tambah tugas" />
      </div>
      <div className='w-full pt-4 gap-2 px-4 grid sm:grid-cols-2 sm:px-20 lg:grid-cols-4'>
        {data?.map((doc) => (
          <div className='w-full bg-white' key={doc.id}>
          <Detail
            id={doc.id}
            teacher={doc.data.teacher}
            date={doc.data.waktu_absen}
            subject={doc.data.scan_result}
            classRoom={doc.data.class}
          />
          </div>
        ))}
      </div>
      <div className="flex mt-4 items-center mb-2 gap-2 w-full px-4 sm:px-20">
        <div className="border-b-2 border-black w-full"></div>
        <p className='whitespace-nowrap'>Tugas</p>
        <div className="border-b-2 border-black w-full"></div>
      </div>
      <div className='px-4 sm:px-20 grid grid-cols-2 sm:flex flex-col gap-4'>
      {dataTugas?.map((doc) => (
        <div className='w-full bg-white' key={doc.id}>
          <DetailTugas
            title={doc.data.tugasName}
            teacher={doc.data.teacher}
            tugasDescription={doc.data.tugasDescription}
            tugasLink={doc.data.tugasLink}
            class={doc.data.class}
            image={doc.data.image}
          />
        </div>
      ))}
      </div>
    </div>
  )
}

export default Teacher
