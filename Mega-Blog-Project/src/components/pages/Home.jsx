import React, { useEffect, useState } from 'react'
import databaseservice from '../../appwrite/configuration'
import Container from '../container/Container'

function Home() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        databaseservice.getAllPosts([]).then((posts) => {
            setPosts(posts.documents)
        })
    }, [])

    if (posts.length > 0) {
        return (
            <div className='w-full py-8'>
                <Container>
                    <div className='flex flex-wrap'>
                        {posts.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard post={post} />
                            </div>
                        ))}
                    </div>
                </Container> </div>
        )
    }
    else {
        return (
            <div className='w-full py-8 mt-4 text-center'>

                <Container>
                    <div className='flex  flex-wrap'>
                        <div className='p-2 w-full'>
                            <h1 className='text-2xl font-bold hover:text-gray-500'>
                                Login to Read Posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
// w

}

export default Home
