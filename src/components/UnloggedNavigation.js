import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import {  Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useRole } from './RoleContext';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function UnloggedNavigation() {
  const navigate = useNavigate();


  useEffect(()=> {
   
  }, [])
  const handleLogin = () => {
    navigate("/login")
  }
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">

                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
 
                  <button className="outline-0 inline-flex items-center rounded-md bg-red-400 px-2 py-1 text-xs font-medium text-white " onClick={handleLogin}> Log in</button>
                         
              </div>
            </div>
          </div>
 </>
      )}
    </Disclosure>
  )
}
