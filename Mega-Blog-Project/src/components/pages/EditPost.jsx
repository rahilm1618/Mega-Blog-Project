import React from 'react'
import { useEffect, useState } from 'react'
import { Container, PostForm } from '../index'
import { useNavigate, useParams } from 'react-router-dom'
import databaseservice from '../../appwrite/configuration'
function EditPost() {

    const [post, setPost] = useState([])
    const { slug } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        if (slug) {
            databaseservice.getPost(slug).then((post) => {
                if (post) {
                    setPost(post)
                }

            })
        }
        else {
            navigate('/')
        }


    }, [slug, navigate])


   return post?(
    <div className='py-8'>
        <Container>
            <PostForm post={post}/>
        </Container>
    </div>
   ):null

}

export default EditPost
