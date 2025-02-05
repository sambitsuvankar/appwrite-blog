import React from 'react'
// import { Children } from 'react'

function Container({children}) {
    console.log("Children:", children)
  return (
    <div className='w-full max-w-7xl mx-auto px-4'>
        {children}
    </div>
  )
}

export default Container