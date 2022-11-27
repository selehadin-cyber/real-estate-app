import Link from 'next/link'
import React from 'react'

const CallToAction = () => {
  return (
    <section className='w-full dark:bg-[hsl(228,12%,8%)] 1072:p-[7.5rem_0_7.5rem] py-10'>
        <div className="max-w-[1024px] dark:bg-[hsl(228,16%,12%)] mx-6 p-[3rem_2rem] 1072:mx-auto text-center flex 1072:p-[4rem_10rem_4.5rem] 1072:border-[12px] border-[6px] border-[hsl(228,62%,59%)] bg-[hsl(228,66%,53%)] 1072:rounded-[2rem] rounded-[1.25rem] flex-col items-center justify-center">
            <h2 className='text-[2.5rem] xs:text-xl text-white mb-6'>Get Started with IhsanHome</h2>
            <p className='text-gray-300 text-base 1072:px-32 mb-8'>Tell us what your dream home should look like and leave the rest to us.</p>
            <Link href={"/findhome"}><button className="text-white border-[2px] border-white 1072:text-base bg-[#4569f2] p-[14px_28px] rounded-lg">Find Me a Home</button></Link>
        </div>
    </section>
  )
}

export default CallToAction