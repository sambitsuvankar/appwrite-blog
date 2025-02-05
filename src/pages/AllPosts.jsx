import React, {useState, useEffect} from 'react'
import { PostCard} from '../components'
import Container from '../components/container/Container'
import appWriteService from '../appwrite/config'


function AllPosts() {

    const [posts, setPosts] = useState([])
    useEffect(()=> {
        appWriteService.getPosts([]).then((posts) => {
            if(posts.documents){
                // console.log("AllPosts -> posts", posts)
                setPosts(posts.documents)
            }
        }).catch((error) => {
            console.error("Appwrite Service :: getAllPosts :: error", error);
    })
    }, [])

    if(posts.length === 0 ){
            return (
                <div className="w-full py-8 mt-4 text-center">
                    <Container>
                        <div className="flex flex-wrap">
                            <div className="p-2 w-full">
                                <h1 className="text-2xl font-bold hover:text-gray-500">
                                    No posts available
                                </h1>
                            </div>
                        </div>
                    </Container>
                </div>
            )
        }
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts?.map((post) => {
                    return(
                    <div key={post.$id} className='p-2 w-1/2'>
                        <PostCard {...post}/>
                    </div>
                )})}
            </div>
        </Container>
    </div>//
  )
};

export default AllPosts;