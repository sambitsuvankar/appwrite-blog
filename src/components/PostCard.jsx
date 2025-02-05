import React,{useState} from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {

  const [img, setImg] = useState("")

  console.log(title, featuredImage)

  appwriteService.getFilePreview(featuredImage).then((file) => {
    console.log("File:", file);
    setImg(file);
  })
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={img} alt={title}
                className='rounded-xl' />

            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
}


export default PostCard