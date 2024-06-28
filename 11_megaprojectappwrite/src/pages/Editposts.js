import React, { useState, useEffect } from 'react';
import { Container, PostForm } from '../components';
import service from '../appwrite/configure'
import { useNavigate, useParams } from 'react-router-dom';

function Editposts() {
    const [post, setPost] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((slug) => {
                if (post) {
                    setPost(post)
                }
            })
        }
    }, [slug, navigate ,post])
    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default Editposts
