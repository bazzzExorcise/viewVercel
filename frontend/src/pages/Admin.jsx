import React, { useEffect, useState } from 'react'

import { IoMdSearch } from "react-icons/io";
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';

const Admin = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState([])

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    if(currentUser == null) {
      navigate("/login")
    }

    const getUsers = async () => {
      const usersCollection = collection(db, 'user');
      const absenCollection = collection(db, 'absen');

      const usersQuery = query(usersCollection); // Get all users
      const usersSnapshot = await getDocs(usersQuery);

      const userDocs = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(), // Spread operator to get user data
      }));

      const userPromises = userDocs.map(async (user) => {
        const absenQuery = query(absenCollection, where('email', '==', user.email));
        const absenSnapshot = await getDocs(absenQuery);
        return { ...user, absences: absenSnapshot.docs.map((doc) => doc.data()) };
      });

      const resolvedUsers = await Promise.all(userPromises);
      setUsers(resolvedUsers);
    };

    getUsers();

  }, [])
  return (
    <section className="bg-white pb-40 text-sm min-h-screen bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')]">
      <Header admin="true" text="Admin View"/>
      <div className="mx-auto max-w-screen-xl py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex text-sm flex-col items-stretch">
          <div className="relative mt-4">
            <input type='text' autoComplete='off' name='email' placeholder='cari siswa' className='w-full focus:outline-none flex justify-center gap-2 text-black text-sm rounded-md border border-black p-4'/>  
            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
              <IoMdSearch/>
            </span>
          </div>
        </div>

        <div className="overflow-x-auto mt-4">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="text-start">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-start font-medium text-gray-900">Name</th>
                <th className="whitespace-nowrap px-4 py-2 text-start font-medium text-gray-900">Date of Birth</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                <td className="whitespace-nowrap px-4 py-2 font-medium capitalize text-gray-900">{user.username}</td>
                <td className="whitespace-nowrap flex flex-col px-4 py-2 font-medium text-gray-900">
                  <h1>{user.absences[0].scan_result}</h1>
                  <i className='text-xs'>{user.absences[0].waktu_absen}</i>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default Admin
