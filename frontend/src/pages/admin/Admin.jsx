import React, { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase';
import Detail from './components/Detail';

const Admin = () => {
  const [data, setData] = useState()
  const [searchData, setSearchData] = useState()
  useEffect(() => {
    const fetchData = async () => {
      let temData = []

      const datas = await getDocs(collection(db, 'absen'))
      datas.forEach((doc) => {
        temData.push({id : doc.id, data : doc.data()})
      })
      const processedData = temData.reduce((acc, curr) => {
        const key = `${curr.data.teacher}-${curr.data.class}-${curr.data.waktu_detail.day}
                    -${curr.data.waktu_detail.day}-${curr.data.waktu_detail.hour}`;
        if (!acc[key]) {
          acc[key] = { ...curr };
        }
        return acc;
      }, {})
    
      const outputData = Object.values(processedData);
      setData(outputData)
    } 

    fetchData()
  }, [])

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
  const hari = formatFirestoreDateInIndonesian(new Date())

  const searchOn = async (e) => {
    e.preventDefault()
    const searchValue = document.querySelector('#search_value').value.toUpperCase()
    const q = query(collection(db, 'absen'), where('teacher', '>=', searchValue))
    const datas = await getDocs(q)
    const searchData = datas.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
    setSearchData(searchData)
  }

  return (
    <section className="bg-white w-full pb-40 pt-4 overflow-x-hidden px-6 sm:py-12 lg:px-8 text-sm min-h-screen bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')]">
      <header className="bg-white">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900 sm:text-xl">Selamat Datang Admin</h1>
            <p className="mt-1.5 text-xs text-gray-500">
              {hari}
            </p>
          </div>
        </div>
      </header>
      <div className="w-full pt-4">
      <form method="post" className="w-full" onSubmit={searchOn}>
        <input type='text' id='search_value' autoComplete='off' name='search' placeholder='search' className='w-full flex justify-center text-xs gap-2 text-black hover:scale-105 duration-300 rounded-md border border-neutral-200 p-4'/>  
      </form>
      </div>
      <div className='w-full pt-4 gap-2 grid sm:grid-cols-2 lg:grid-cols-4'>
        {searchData ? 
        searchData?.map((doc) => (
          <div className='w-full bg-white' key={doc.id}>
          <Detail 
            id={doc.id}
            teacher={doc.data.teacher}
            date={doc.data.waktu_absen}
            subject={doc.data.scan_result}
            classRoom={doc.data.class}
          />
          </div>
        )) : 
        data?.map((doc) => (
          <div className='w-full bg-white' key={doc.id}>
          <Detail 
            id={doc.id}
            teacher={doc.data.teacher}
            date={doc.data.waktu_absen}
            subject={doc.data.scan_result}
            classRoom={doc.data.class}
          />
          </div>
          ))
        }
      </div>
    </section>
  )
}

export default Admin
