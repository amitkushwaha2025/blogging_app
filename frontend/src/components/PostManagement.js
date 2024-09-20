import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostManagement = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('/api/posts')
            .then(response => setPosts(response.data))
            .catch(error => console.error('Error fetching posts:', error));
    }, []);

    const handleDelete = async (id) => {
        await axios.delete(`/api/posts/${id}`);
        setPosts(posts.filter(post => post._id !== id));
    };

    return (
        <div className="post-management">
            <h1>Manage Posts</h1>
            <div className="post-list">
                {posts.map(post => (
                    <div className="post" key={post._id}>
                        <h2>{post.title}</h2>
                        <button onClick={() => handleDelete(post._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostManagement;
