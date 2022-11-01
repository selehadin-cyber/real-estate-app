import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <footer className="flex flex-col gap-3 h-24 w-full items-center justify-center border-t dark:text-gray-300 dark:bg-gray-900">
        <p className='dark:text-white'>Made with Ihsan by <span className='text-blue-700'>Selehadin</span></p>
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
  )
}

export default Footer