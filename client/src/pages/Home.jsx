import React from 'react'
import Header from '../components/Header'
export default function Home() {
  return (
    <div>
      <Header />
    <div className='px-4 py-12 max-w-2xl mx-auto'>
     <h1 className='text-3xl font-bold mb-4 text-slate-700 text-center'>This is Login Wrapper</h1>
     <p className='mb-4 text-slate-600 text-center'>
      This is full-stack web application built with the MERN (MongoDb, Express, React and Node.js) stack.
      It includes authentication features like login, sign up, sign out, and authentication with Google.
      Also this provide protected routes only accessible to authenticated users.
     </p> 
     <p className='mb-4 text-slate-600 text-center'>
      The front end of appication is built with React and Tailwind CSS. Also uses React Router for client side routing.
      The backend of application is built with Node.js and Express. It uses MongoDB as the database and Mongoose as the ODM.
      Authentication is implemented with Json web tokens.
     </p>
     <p className='mb-4 text-slate-600 text-center'>
      this application intended as starting point for building full stack web application with authentication using MERN-stack.
     </p>
    </div>
    </div>
  )
}
