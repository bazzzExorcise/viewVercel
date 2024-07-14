import React, { useEffect, useState } from 'react'
import { MdOutlinePassword, MdAlternateEmail } from "react-icons/md";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase'; 
import { useNavigate, Link } from 'react-router-dom';

const SignIn = () => {
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

  const SignUpHandler = async (e) => {
    e.preventDefault()
    if(email == "" ) {
      setErrorMsg("tolong lengkapi formulir")
    }else{
      if(password == "") {
        setErrorMsg("tolong masukan password anda")
      }else{
        try {
          const user = await signInWithEmailAndPassword(auth, email, password)

          localStorage.setItem('currentUser', JSON.stringify(user))

          console.log(user)
          navigate("/")
        } catch (err) {
          if (err.code == 'auth/invalid-email') {
            setErrorMsg('email anda sepertinya salah');
          } else if (err.code == 'auth/invalid-credential') {
            setErrorMsg('password anda salah tuh')
          }
          console.log(err)
        }
      }
    }
  }
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 min-h-screen flex flex-col justify-center lg:px-8 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')]">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">SignIn Page</h1>

        <p className="mt-4 w-full max-w-md text-sm text-gray-500">
          login pake akun yang udah terdaftar yah manis
        </p>
      </div>

      <form method='post' onSubmit={SignUpHandler} className="mx-auto mb-0 mt-8 w-full max-w-md">
        {errorMsg && (            
        <div className='w-full bg-black flex justify-center gap-2 text-white hover:scale-105 text-sm duration-300 rounded-md border border-neutral-200 p-4'>
          {errorMsg}
        </div>
        )}
          
        <div className="flex text-sm flex-col items-stretch">
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
        <div className="gap-4 flex mt-4 flex-col-reverse items-center justify-between">
          <p className="text-sm text-gray-500">
            belum memiliki akun? <Link to="/signup" className='underline text-black'>bikin disini</Link>
          </p>

          <button
            className="w-full rounded-lg bg-black px-5 py-3 text-sm font-medium text-white"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  )
}

export default SignIn
