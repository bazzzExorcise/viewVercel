import { collection, doc, updateDoc, getDoc, getDocs, where, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../config/firebase'

const Edit = () =>  {
  const [data, setData] = useState();
  const { jurnalId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "absen", jurnalId);
      const theData = await getDoc(docRef);
      console.log(theData.data())
      setData(theData.data())
    }
    fetchData()
  }, [jurnalId]);

  const fixTitle = (e) => {
    return e.toLowerCase()
  }

  const addField = async (e) => {
    e.preventDefault()
    const value = document.getElementById('jurnal').value
    const docRef = doc(db, "absen", jurnalId);
    await updateDoc(docRef, {
      materi: value,
    });
  }

  return (

    <div className="flow-root rounded-lg border h-screen bg-gray-100 border-gray-100 py-3 shadow-sm">
    {data ? (
      <section className="">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">

            <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
              <form onSubmit={(e) => addField(e)} className="space-y-4">
                <div className='flex flex-col'>
                  <h1 className='font-bold text-3xl capitalize'>{fixTitle(data?.scan_result)}</h1>
                  <p className='capitalize text-sm'>{fixTitle(data?.teacher)}</p>
                </div>
                <div>
                  <label className="sr-only" htmlFor="jurnal">Jurnal</label>
                  <input
                    className="w-full rounded-lg text-sm border border-black active:ring-0 p-3"
                    placeholder="jurnal"
                    type="text"
                    id="jurnal"
                  />
                </div>

                <div className="mt-2 flex gap-2">
                  <button
                    type="reset"
                    className="inline-block w-full rounded-lg border border-black px-5 py-3 font-medium sm:w-auto"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="inline-block w-full rounded-lg border border-black bg-black px-5 py-3 font-medium text-white sm:w-auto"
                  >
                    Update Data
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    ) : (
      <p className='animate-bounce'>Loading</p>
    )}
    </div>

  );
}

export default Edit
