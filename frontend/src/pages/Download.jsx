import React, { useState, useEffect } from 'react'; // <--- fixed 'eact' to 'eact'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import { saveAs } from 'file-saver';

const Download = () => {
  const [firebaseData, setFirebaseData] = useState([]);
  const [dataPicker, setDataPicker] = useState([])
  const [fileName, setFileName] = useState("")
  const [subjects, setSubjects] = useState("all")

  useEffect(() => {
    const getPicker = async () => {
      try {
        const absenCollection = collection(db, 'absen');
        const q = await getDocs(absenCollection);
        const uniqueScanResults = q.docs.map((doc) => doc.data().scan_result)
                                 .filter((scanResult, index, self) => self.indexOf(scanResult) === index); // Filter duplicates

        setDataPicker(uniqueScanResults);
      } catch (error) {
        console.log(error)
      }
    }

    getPicker()
  }, []);

  const fetchData = async () => {
    if (subjects == "") {
      alert("tolong masukan mapel")
    }else{
      
      const usersCollection = collection(db, 'user');
      const absenCollection = collection(db, 'absen');
      
      let usersQuery
      if (subjects == "all") {
        usersQuery = query(absenCollection);
      }else{
        usersQuery = query(absenCollection, where("scan_result", "==", subjects));
      }
      
      const usersSnapshot = await getDocs(usersQuery);
      
      const userDocs = usersSnapshot.docs.map((doc) => ({
        email: doc.data().email,
        waktu_absen: doc.data().waktu_absen,
        subjects: doc.data().scaan_result,
        time: doc.data().waktu_absen,
        ...doc.data()
      }));
      
      const userPromises = userDocs.map(async (user) => {
        const absenQuery = query(usersCollection, where('email', '==', user.email));
        const absenSnapshot = await getDocs(absenQuery);
        return {  
          ...user,
          absences: absenSnapshot.docs.map((doc) => ({
            id: doc.id,
            username: doc.data().username,
          }))
        };
      });
      
      const resolvedUsers = await Promise.all(userPromises);
      setFirebaseData(resolvedUsers);
      
      const formatDataAsCSV = (data) => {
        const headerRow = ["email", "username", "waktu_absen", "subjects", "ID"]; 
        const csvRows = [
          headerRow,
          ...data.map((row) => [
            row.email,
            row.absences.map((absence) => absence.username).join(','), // <--- updated
            row.waktu_absen,
            row.scan_result,
            row.absences.map((absence) => absence.id).join(','), // <--- updated
          ]), 
        ];
        
        const csvContent = csvRows.map((row) => row.join(', ')).join('\n');
        return csvContent;
      };
      
      const handleExport = () => {
        const csvContent = formatDataAsCSV(firebaseData);
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
        saveAs(blob, fileName + '.csv');
      };
      handleExport()
    };
  }


  return (
    <div className='flex text-sm min-h-screen w-full justify-center items-center'>
      <div method='post' className="max-w-sm px-4 w-full gap-4 flex flex-col items-center">
        <div className='w-full flex flex-col items-start'>
          <b className='text-2xl'>Download Data</b>
          <p>download sesuai pelajaran</p>
        </div>
        <div className='w-full'>
          <div className="flex items-center gap-2 text-yellow-800">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path
                  fillRule="evenodd"
                  d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clipRule="evenodd"
                />
              </svg>

              <strong className="block font-medium"> Mohon Perhatian </strong>
            </div>

            <p className="mt-2 text-sm text-yellow-700">
              tolong reload website setelah melakukan scanning pada QRCode agar kamera anda dapat di-nonaktifkan
            </p>
        </div>
        <div className='w-full'>
          <p>mata pelajaran</p>
          <select name="subject" id="" value="all" onChange={(e) => {setSubjects(e.target.value)}} className="w-full lowercase border px-3 py-2 border-black rounded">
            {/* <option value="" className='lowercase'> --- pilih mata pelajaran --- </option> */}
            <option value="all" className='lowercase'>semua mapel</option>
            {dataPicker.map((docs) => (
              <option value={docs} className='lowercase'>{docs}</option>
            ))}
          </select>
        </div>
        <div className='w-full'>
          <p>nama file</p>
          <input type="text" className='w-full border px-3 py-2 border-black rounded' onChange={(e) => {setFileName(e.target.value)}}/>
        </div>
        <button onClick={fetchData} className='w-full border px-3 py-2 border-black bg-black text-white rounded'>download</button>
      </div>
    </div>
  );
};

export default Download;