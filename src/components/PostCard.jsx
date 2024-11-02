import React, { useEffect, useState } from 'react'
import cardService from "../Appwrite/config"
import { Link } from 'react-router-dom'

const PostCard = ({$id, title, featuredImage,height=10}) => {
  // console.log(height)
  const [src,setSrc] = useState("")
  useEffect(()=>{
    cardService.getFilePreview(featuredImage).then((ppst)=>{
      setSrc(ppst)
    })
  },[])
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img className='h-40' src={src} alt={title} />
            </div>
            <h2 className='text-xl font-bold'>
                {title}
            </h2>
        </div>
    </Link>
  )
}

export default PostCard
