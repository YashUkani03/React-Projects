import React from 'react'
import service from '../appwrite/configure';
import { PostCard, Container } from '../components';
import { useState, useEffect } from 'react';

function Allposts() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        service.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    })

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) =>
                        <div key={post.$id} className='w-1/4 p-2'>
                            <PostCard posts={posts} />
                        </div>
                    )}
                </div>
            </Container>
        </div>
    )
}

export default Allposts
