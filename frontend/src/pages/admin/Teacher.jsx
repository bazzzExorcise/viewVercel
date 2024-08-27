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
  const [absensi, setAbsensi] = useState()
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

    const getDataAbsensi = async () => {
      const day = new Date().getDay() 
      const days = new Date().getDate() 
      let list = []
      const q = query(collection(db, "absen"), where('teacher', '==', teacherName), where('day', '==', day), where('days', '==', days))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        list.push({id: doc.id, data:doc.data()})
      })
      setAbsensi(list)
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
  
    getDataAbsensi()
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

  let id = 0

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
      <div className="flex bg-white w-full rounded flex-col justify-start items-start mt-4 px-4 sm:px-20">
        <div className=" flex gap-2 p-4">
          <h1 className="text-4xl font-bold">25</h1>
          <div className="flex flex-col">
            <h2 className="text-lg font-bold">Siswa Absen Hari ini</h2>
            <p className="text-gray-600">ada 24 siswa absen haari ini</p>
          </div>
        </div>
        <div className="overflow-x-auto mt-4 w-full">
          <table className="table-auto w-full h-40">
            <thead>
              <tr>
                <th className="text-start px-4 py-2">ID</th>
                <th className="text-start px-4 py-2">Username</th>
                <th className="text-start px-4 py-2">Date Time</th>
              </tr>
            </thead>
            <tbody>
            {absensi?. map((doc) => (
              <tr key={doc.id}>
                <td className="px-4 py-2">{id ++}</td>
                <td className="px-4 py-2">John Doe</td>
                <td className="px-4 py-2">2022-01-01 10:00</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
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
