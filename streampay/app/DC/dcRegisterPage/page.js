"use client";

    import React, { useState, useEffect } from 'react';
    import Link from 'next/link'
    import { auth, db } from '@/firebase';
    import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
    import DCCreator from '@/models/demandSupplier';
    import { collection, addDoc } from 'firebase/firestore';
 
    

    const MerchantRegister = () => {
        
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [dcName, setDcName] = useState('')
        // const [currentUser, setCurrentUser] = useState(null);
        // const [passKey, setPasskey] = useState('')

        // useEffect(() => {
        // const unsub = onAuthStateChanged(auth, (user) => {
        //     setCurrentUser(user);
        // });
    
        
        // return () => unsub();
        // }, []);
        const handleSignUp = async (e) => {
            if(password.length>=6) {
             e.preventDefault();
             try {
         
               const cred = await createUserWithEmailAndPassword(auth, email, password);
               
               
               const newDc = new DCCreator(cred.user.uid , dcName, email)
               await addDoc(collection( db , "dc"), {
                 dcId: newDc.dcId,
                 dcName: newDc.dcName,
                 dcEmail: newDc.dcEmail
               })
         
               console.log('User signed up successfully!');
               window.location.href = '/DC'
         
             } catch (error) {
               console.error('Error signing up:', error.message);
             }
            } else {
             alert('Password should be atleast 6 characters')
            }
           };
        // useEffect(() => {
        // if (currentUser) {
        //     window.location.href = '';
        // }
        // }, [currentUser]);

        return (
            <div className="w-full min-h-screen flex justify-center items-center bg-black flex-col">
            <h1 className="text-5xl font-bold text-blue-500 mb-9 display-block">Worcse</h1>
            
            <p className="text-2xl text-blue-500 mb-9 display-block">Demand Creator</p>
        
            
            
            <div className="absolute inset-1 bg-gray-800 rounded-lg z-10 p-5 relative w-[380px] h-[400px]">
            
                <form onSubmit={handleSignUp}>
                <h2 className="text-2xl font-semibold text-blue-500 text-center mb-6">Register</h2>
                {/* <div className="relative flex flex-col mb-6">
                    <input
                    type="text"
                    id="text"
                    autoFocus
                    
                    className="relative z-10 border-0 border-b-2 border-blue-500 h-10 bg-transparent text-gray-100 outline-none px-2 peer"
                    
                    />
                    <i className="bg-blue-500 rounded w-full bottom-0 left-0 absolute h-1 -z-10 transition-transform duration-300 origin-bottom transform peer-focus:h-1 peer-placeholder-shown:h-[0.5px]"></i>
                    <label className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-8 scale-75 top-3 left-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-500 peer-focus:scale-75 peer-focus:-translate-y-8">Enter Name</label>
                </div> */}
                <div className="relative flex flex-col mb-6">
              <input
                type="text"
                id="name"
                autoFocus
                value={dcName}
onChange={(e)=> setDcName(e.target.value)}
                className="relative z-10 border-0 border-b-2 border-blue-500 h-10 bg-transparent text-gray-100 outline-none px-2 peer"
              
              />
              <i className="bg-blue-500 rounded w-full bottom-0 left-0 absolute h-1 -z-10 transition-transform duration-300 origin-bottom transform peer-focus:h-1 peer-placeholder-shown:h-[0.5px]"></i>
              <label className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-8 scale-75 top-3 left-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-500 peer-focus:scale-75 peer-focus:-translate-y-8">Enter DemandCreator Name</label>
            </div>
                <div className="relative flex flex-col mb-6">
                    <input
                    type="email"
                    id="Email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="relative z-10 border-0 border-b-2 border-blue-500 h-10 bg-transparent text-gray-100 outline-none px-2 peer"
                    
                    />
                    <i className="bg-blue-500 rounded w-full bottom-0 left-0 absolute h-1 -z-10 transition-transform duration-300 origin-bottom transform peer-focus:h-1 peer-placeholder-shown:h-[0.5px]"></i>
                    <label className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-8 scale-75 top-3 left-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-500 peer-focus:scale-75 peer-focus:-translate-y-8">Enter Email</label>
                </div>
        
                <div className="relative flex flex-col mb-6">
                    <input
                    type="password"
                    id="Password"
                    
                    className="relative z-10 border-0 border-b-2 border-blue-500 h-10 bg-transparent text-gray-100 outline-none px-2 peer"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <i className="bg-blue-500 rounded w-full bottom-0 left-0 absolute h-1 -z-10 transition-transform duration-300 origin-bottom transform peer-focus:h-1 peer-placeholder-shown:h-[0.5px]"></i>
                    <label className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-8 scale-75 top-3 left-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-500 peer-focus:scale-75 peer-focus:-translate-y-8">Enter Password</label>
                </div>
                
                <button
                    type="submit"
                    className="py-3 text-gray-100 bg-blue-700 w-full rounded hover:bg-blue-500 hover:scale-105 duration-300"
                >
                    Register
                </button>
                </form>
        
                <p className="mt-4 text-gray-600">
                Already have an account?{' '}     
                    <Link href='/DC' className="text-blue-500">Login</Link>
                </p>
            </div>
            
            </div>
        );
        };
        
        export default MerchantRegister;