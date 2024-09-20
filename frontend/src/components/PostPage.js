import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const PostPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        axios.get(`/api/posts/${id}`)
            .then(response => setPost(response.data))
            .catch(error => console.error('Error fetching post:', error));
    }, [id]);

    if (!post) return <div>Loading...</div>;

    return (
        <div className="post-page">
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <Link to={`/edit/${post._id}`} className="edit-btn">Edit</Link>

        </div>
    );
};

export default PostPage;
