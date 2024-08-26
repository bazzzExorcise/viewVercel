import React, { useEffect, useState } from 'react'
import DetailTugas from '../components/DetailTugas'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../config/firebase'

const Tugas = () => {
  const [tugas, setTugas] = useState()
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    const current = currentUser?.user?.email
    const fetchData = async () => {
      try {
        const i = query(collection(db, 'user'), where("email", "==", current))
        const q = await getDocs(i);
        q.forEach((doc) => {
          getDataTugas(doc.data().class)
        })
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    }

    fetchData()
    const getDataTugas = async (e) => {
      let list = []
      const q = query(collection(db, "tugas"), where('class', '==', e))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        list.push({id: doc.id, data:doc.data()})
      })
      setTugas(list)
    }
  }, [])
  
  return (
    <div className='sm:flex sm:flex-col gap-2 grid grid-cols-2 sm:items-center px-4 sm:px-20'>
      {tugas?.map((doc) => (
        <div className="w-full" key={doc.id}>
          <DetailTugas
          id={doc.id}
          title={doc.data.tugasName}
          teacher={doc.data.teacherName}
          tugasDescription={doc.data.tugasDescription}
          tugasLink={doc.data.tugasLink}
          class={doc.data.class}
          image={doc.data.image}
          />
        </div>
      ))}
    </div>
  )
}

export default Tugas
