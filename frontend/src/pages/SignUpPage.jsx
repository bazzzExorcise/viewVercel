import React from 'react'
import { ButtonCardBg, ButtonCardBorder } from '../components/ButtonCard'

const SignUpPage = () => {
  return (
    <div className="mx-auto text-sm max-w-screen-xl px-4 py-8 sm:px-6 min-h-screen flex flex-col justify-end lg:px-8 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')]">
      <div className="mx-auto gap-4 flex flex-col max-w-lg text-start">
        <h1 className="text-2xl font-bold sm:text-3xl">Sign up</h1>
        <p>selamat datang dalam website kami, untuk melenjtkan anda harus membuat akn terlebih dahulu</p>
        <div className="flex flex-col w-full gap-2 items-center">
          <ButtonCardBg to="/signup" text="SignUp"/>
          <ButtonCardBorder to="/login" text="SignIn"/>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
