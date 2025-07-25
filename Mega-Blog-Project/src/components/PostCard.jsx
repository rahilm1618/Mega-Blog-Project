import React from 'react'
import databaseservice from '../appwrite/configuration'

import {Link} from 'react-router-dom'
function PostCard({$id,title,featuredImage}) {
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    <img src={databaseservice.getFilePreview(featuredImage)} alt={title} className='rounded-xl'/>
                </div>
                <h2 className='text-gray-500 text-xl font-bold'>{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard
