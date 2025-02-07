import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import { PostCard} from '../components/index.js'
import Container from '../components/container/Container.jsx'
import { useSelector, useDispatch } from 'react-redux';
import { setPosts as setPostState } from '../store/postSlice.js';

function Home() {
    const [posts, setPosts] = useState([])
    const dispatch = useDispatch()
    const authStatus = useSelector((state) => state.auth.status)
    const postState = useSelector((state) => state.post.posts)

    useEffect(() => {
        if(postState){
            console.log("postState available")
            setPosts(postState)

        }else{

            appwriteService.getPosts().then((posts) => {
                console.log(`posts : `, posts)
                if (posts.documents) {
                    setPosts(posts.documents)
                    dispatch(setPostState(posts.documents))
                }
            })
        }
    }, [])
  
    if (posts.length === 0 && !authStatus) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    } else if(posts.length === 0 && authStatus){
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
    }else{
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )}
}

export default Home