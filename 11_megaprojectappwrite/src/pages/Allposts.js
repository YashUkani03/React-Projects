import React from 'react'
import appwriteService from '../appwrite/configure';
import { PostCard, Container } from '../components';
import { useState, useEffect } from 'react';

function Allposts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
                // console.log(posts)
            }
        })
    })

    return (
        <div className='w-full py-8'>
            <Container>

                <div className='flex flex-wrap'>
                    {posts.map((posts) =>
                        <div key={posts.$id} className='w-1/4 p-2'>
                            <PostCard {...posts}/>
                            {/* console.log("here") */}
                        </div>
                    )}
                </div>
            </Container>
        </div>
    )
}

export default Allposts
