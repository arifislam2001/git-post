"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
const PaginationBtn = () => {
  const route = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') ); // Get the current page from URL, default to 1 if not present


  const handlePagination = ()=>{
   const params = new URLSearchParams(searchParams);
    if(Boolean(page)){
      params.set('page', page + 1); // Sets ?query=term
      route.replace(`${pathname}?${params.toString()}`);
     
    } else {
        params.set('page', 2); // Sets ?query=term
      route.replace(`${pathname}?${params.toString()}`);
    }
  } 
  return (
    <div className='flex justify-end'>
      <button onClick={handlePagination} className='text-white bg-blue-500 px-4 py-2 rounded-2xl cursor-pointer'>Skip</button>
    </div>
  )
}

export default PaginationBtn
