import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Homepage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('/api/posts')
            .then(response => setPosts(response.data))
            .catch(error => console.error('Error fetching posts:', error));
    }, []);

    return (
        <div className="homepage">
            <h1>Blog Posts</h1>
            <div className='sub-heading'>
                <Link to="/create" className="create-post-btn">Create New Post</Link>
                <Link to="/manage" className="manage-post-btn">Manage Posts</Link>
            </div>

            <div className="post-list">
                {posts.map(post => (
                    <div className="post" key={post._id}>
                        <h2><Link to={`/post/${post._id}`}>{post.title}</Link></h2>
                        <p>{post.content.substring(0, 100)}...</p>
                        <p><small>{new Date(post.createdAt).toDateString()}</small></p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Homepage;
