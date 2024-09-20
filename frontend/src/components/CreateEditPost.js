import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateEditPost = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            axios.get(`/api/posts/${id}`)
                .then(response => {
                    setTitle(response.data.title);
                    setContent(response.data.content);
                })
                .catch(error => console.error('Error fetching post:', error));
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const post = { title, content };
        if (id) {
            await axios.put(`/api/posts/${id}`, post);
        } else {
            await axios.post('/api/posts', post);
        }
        navigate('/');
    };

    return (
        <form onSubmit={handleSubmit} className="create-edit-form">
            <input
                type="text"
                placeholder="Post Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
            />
            <textarea
                placeholder="Post Content"
                value={content}
                onChange={e => setContent(e.target.value)}
                required
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default CreateEditPost;
