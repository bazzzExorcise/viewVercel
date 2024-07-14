import React, { useEffect, useState } from 'react'
import { MdOutlinePassword, MdAlternateEmail } from "react-icons/md";
import { FaSquarePhoneFlip } from "react-icons/fa6";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { Timestamp, addDoc, collection } from "firebase/firestore"; 
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    console.log(currentUser)
    if(currentUser != null) {
      navigate("/")
    }
  }, [])

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [HPsiswa, setHPsiswa] = useState("")
  const [HPwali, setHPwali] = useState("")
  const [emailWali, setEmailWali] = useState("")
  const [username, setUsername] = useState("")
  const [uid, setUid] = useState("")

  // const UIDmaker = () => {
  //   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   let result = '';
  //   const length = 20;
    
  //   for (let i = 0; i <= length; i++) {
  //     result += characters.charAt(Math.floor(Math.random() * characters.length));
  //   }
  //   return result
  // }

  // setUid(UIDmaker);
  
  const SignUpHandler = async (e) => {
    e.preventDefault()
    if(email == "" || emailWali == "" || username == "" || HPwali == "" || HPsiswa == "") {
      setErrorMsg("tolong lengkapi formulir")
    }else{
      if(password == "") {
        setErrorMsg("tolong masukan password anda")
      }else{
        try {
          const user = await createUserWithEmailAndPassword(auth, email, password)
          const userValidator = user.user;

          if (!userValidator) {
            throw new Error('Signup failed: User object not created.');
          }else{
            const addUser = await addDoc(collection(db, 'user'), {
              username: username,
              email: email,
              password: password,
              email_wali: emailWali,
              hp_siswa: HPsiswa,
              hp_wali: HPwali,
              timestamp: Timestamp.fromDate(new Date())
            })

            localStorage.setItem('docId', )
            localStorage.setItem('currentUser', JSON.stringify(user))

            console.log(user)
            console.log(addUser)
            navigate("/")
          }
        } catch (err) {
          if (err.code == 'auth/email-already-in-use') {
            setErrorMsg('email anda sudah terpakai');
          } else if (err.code == 'auth/invalid-password') {
            setErrorMsg('password anda terlalu singkat')
          }
          console.log(err)
        }
      }
    }
  }

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 min-h-screen flex flex-col lg:px-8 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')]">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">SignUp Page</h1>

        <p className="mt-4 w-full max-w-md text-sm text-gray-500">
          bikin akun dulu yah manis
        </p>
      </div>

      <form method='post' onSubmit={SignUpHandler} className="mx-auto mb-0 mt-8 w-full max-w-md">
        {errorMsg && (            
        <div className='w-full bg-black flex justify-center gap-2 text-white hover:scale-105 text-sm duration-300 rounded-md border border-neutral-200 p-4'>
          {errorMsg}
        </div>
        )}
          
        <div className="flex text-sm flex-col mt-10 items-stretch">
          <h1 className='text-center font-semibold text-lg'>Email Password anda</h1>
          <p className='text-center'>tolong diingat yah, soalnya buat login</p>
          <div className="relative mt-4">
            <input onChange={(e) => {setEmail(e.target.value)}} type='text' autoComplete='off' name='email' placeholder='email' className='w-full flex justify-center gap-2 text-black hover:scale-105 text-sm duration-300 rounded-md border border-neutral-200 p-4'/>  
            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
              <MdAlternateEmail></MdAlternateEmail>
            </span>
          </div>

          <div className="relative mt-4">
          <input type='password' onChange={(e) => {setPassword(e.target.value)}} name='password' placeholder='password' className='w-full flex justify-center gap-2 text-black hover:scale-105 text-sm duration-300 rounded-md border border-neutral-200 p-4'/>  
            <span className="absolute text-gray-600 inset-y-0 end-0 grid place-content-center px-4">
              <MdOutlinePassword/>
            </span>
          </div>
        </div>
        <div className="flex text-sm flex-col mt-10 items-stretch">
          <h1 className='text-center font-semibold text-lg'>Kelengkapan Data</h1>
          <p className='text-center'>tulis yah kelengkapanya</p>
          <div className="relative mt-4">
            <input onChange={(e) => {setUsername(e.target.value)}} type='text' autoComplete='off' placeholder='nama anda(siswa)' className='w-full flex justify-center gap-2 text-black hover:scale-105 text-sm duration-300 rounded-md border border-neutral-200 p-4'/>  
            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
              <FaSquarePhoneFlip/>
            </span>
          </div>

          <div className="relative mt-4">
            <input onChange={(e) => {setHPsiswa(e.target.value)}} type='text' autoComplete='off' placeholder='nomor HP siswa' className='w-full flex justify-center gap-2 text-black hover:scale-105 text-sm duration-300 rounded-md border border-neutral-200 p-4'/>  
            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
              <FaSquarePhoneFlip/>
            </span>
          </div>

          <div className="relative mt-4">
          <input type='text' onChange={(e) => {setHPwali(e.target.value)}} autoComplete='off' placeholder='nomor HP wali' className='w-full flex justify-center gap-2 text-black hover:scale-105 text-sm duration-300 rounded-md border border-neutral-200 p-4'/>  
            <span className="absolute text-gray-600 inset-y-0 end-0 grid place-content-center px-4">
              <FaSquarePhoneFlip/>
            </span>
          </div>

          <div className="relative mt-4">
            <input type='text' onChange={(e) => {setEmailWali(e.target.value)}} autoComplete='off' placeholder='email wali' className='w-full flex justify-center gap-2 text-black hover:scale-105 text-sm duration-300 rounded-md border border-neutral-200 p-4'/>  
            <span className="absolute text-gray-600 inset-y-0 end-0 grid place-content-center px-4">
              <MdAlternateEmail/>
            </span>
          </div>
        </div>
          <div className="gap-4 flex mt-4 flex-col-reverse items-center justify-between">
          <p className="text-sm text-gray-500">
            Sudah memiliki akun? <Link to="/login" className='underline text-black'>login disini</Link>
          </p>

          <button
            className="w-full rounded-lg bg-black px-5 py-3 text-sm font-medium text-white"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  )
}

export default SignUp
