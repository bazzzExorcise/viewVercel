import React, { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { collection, query, where, getDocs, orderBy, limit } from "firebase/firestore";

const Riwayat = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const current = currentUser?.user?.email;

    const fetchDataAbsen = async () => {
      try {
        let list = [];
        const i = query(collection(db, "absen"), where("email", "==", current), orderBy('timestamp', 'desc'), limit(20));
        // const i = query(collection(db, "absen"), where("email", "==", current));
        const q = await getDocs(i);

        q.forEach((doc) => {
          list.push({
            id: doc.id,
            subject: doc.data().scan_result,
            time: `${doc.data().waktu_detail.hour}:${doc.data().waktu_detail.minute}:${doc.data().waktu_detail.second}`,
            day: `${doc.data().waktu_detail.hari} ${doc.data().waktu_detail.day} ${doc.data().waktu_detail.month} ${doc.data().year}`,
            ...doc.data(),
          });
        });
        setData(list);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchDataAbsen();
  }, []);
  return (
    <div className="w-full gap-4 mt-4 flex flex-col">
      {data.map((doc) => (
        <div key={doc.id} className="flex hover:scale-110 duration-100 bg-white transition hover:shadow-xl">
          <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
            <div className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900">
              <span className="w-px flex-1 bg-gray-900/10"></span>
              <span>{doc.time}</span>
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-between">
            <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
              <a href="#">
                <h3 className="font-bold uppercase text-gray-900">{doc.subject}</h3>
              </a>

              <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">anda telah melakukan absensi paaada pelajaran {doc.waktu_absen}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Riwayat;
