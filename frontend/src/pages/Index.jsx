import Header from "../components/Header";
import axios from "axios";
import { ButtonCardBg } from "../components/ButtonCard";
import { useNavigate } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import { useEffect, useState } from "react";
import { collection, where, getDocs, query } from "firebase/firestore";
import { db } from "../config/firebase";
import Riwayat from "../components/Riwayat";

const Index = () => {
  const [ data, setData ] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    const current = currentUser?.user?.email

    if(currentUser == null) {
      navigate("/login")
    }
    
    let emailOrtu;
    let siswa;
    const fetchData = async () => {
      try {
        const i = query(collection(db, 'user'), where("email", "==", current))
        const q = await getDocs(i);
        q.forEach((doc) => {
          setData(doc.data())
          emailOrtu = doc.data().email_wali
          siswa = doc.data().username
          console.log(doc.data());
        })
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    }
    
    const getInformation = async () => {
      const day   = new Date().getDate()
      const x   = new Date().getDay()
      const month = new Date().getMonth() + 1

      try {
        const i = query(collection(db, 'absen'),
                    where("email", "==", current), 
                    where("waktu_detail.day", '==', day),
                    where("waktu_detail.month", '==', month),
                    where("waktu_detail.hour", '<', 1)
                  )
        const q = await getDocs(i)
        q.forEach((doc) => {
          const data = doc.data().scan_result
          console.log(data)
        })
        if(q.docs.length > 0){
          console.log("aman cuiy")
        }else{
          if(x > 0) {
            console.log(x)
            function getIndonesianWeekdayName(date) {
              const weekdays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
              const day = date.getDay();
              return weekdays[day];
            }   
            const hari = getIndonesianWeekdayName(new Date())
  
            axios
            .get("https://view-vercel.vercel.app", {
              params: {
                "email" : emailOrtu,
                "subject" : `**Ananda ${siswa} belum melakukan absensi pada hari ${hari} **`,
                "message" : `Ananda ${siswa} belum melakukan absens pada hari ${hari}, mohon untuk perhatian selalu malkukan absensii tepat waktu`,
              },
            })
            .then(() => {
              //success
              console.log("success");
            })
            .catch(() => {
              console.log("failure");
            });
          }
        }

      }catch(err) {
        console.log(err)  
      }
    }

    fetchData()
    getInformation()
  }, [])
  

  return (
    <section className="bg-white pb-40 overflow-x-hidden text-sm min-h-screen bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')]">
      <Header text={data.username}/>
      {data ? (
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="w-full flex mb-4 justify-center">
        </div>
        <div className="mx-auto mt-4 max-w-lg text-center">
          <h2 className="text-xl font-bold capitalize sm:text-4xl">
            {data.username}
          </h2>
          <div className="my-4 flex-wrap flex justify-center items-center">
            <p className="px-1">{data.email}</p>
            <GoDotFill/>
            <p className="px-1">{data.hp_siswa}</p>
            <GoDotFill/>
            <p className="px-1">{data.email_wali}</p>
            <GoDotFill/>
            <p className="px-1">{data.hp_wali}</p>
          </div>
        </div>
        <ButtonCardBg to="/scan" text="scan mapel" />
        <div className="flex mt-4 items-center gap-2 w-full">
          <div className="border-b-2 border-black w-full"></div>
          <p>Riwayat</p>
          <div className="border-b-2 border-black w-full"></div>
        </div>
        <div className="w-full">
          <Riwayat/>
        </div>
        <div className="fixed left-0 px-4 pb-2 w-full bottom-2">
          <div role="alert" className="rounded border-s-4 border-yellow-500 bg-red-50 p-4">
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
        </div>
      </div>
    ):(
      <div className="flex justify-center items-center w-full min-h-screen">Loading account</div>
    )}
    </section>
  );
};

export default Index;
