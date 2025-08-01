import React from 'react'
import databaseservice from '../../appwrite/configuration'
import PostCard from '../PostCard'
import Container from '../container/Container'
function AllPost() {
    const [posts,setPosts]=React.useState()
    React.useEffect(()=>{
        databaseservice.getAllPosts([]).then((posts)=>{
            setPosts(posts.documents)
        })
    },[])
    return (
         <div className='w-full py-8'>
            <Container>
               <div className='flex flex-wrap'>
                {posts.map((post)=>(
                    <div className='p-2 w-1/4' key={post.$id}>
                        <PostCard post={post}/>
                    </div>
                )

                )}
               </div>
            </Container>

         </div>
    )
}

export default AllPost
