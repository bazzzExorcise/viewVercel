import { collection, getDocs, where, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../config/firebase'

const Teacher = () => {
  const [data, setData] = useState()
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
  
  getData()
  }, [teacherId])

  return (
    <div>
      
    </div>
  )
}

export default Teacher
