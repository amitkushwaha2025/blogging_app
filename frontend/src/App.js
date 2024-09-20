import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import PostPage from './components/PostPage';
import CreateEditPost from './components/CreateEditPost';
import PostManagement from './components/PostManagement';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/post/:id" element={<PostPage />} />
                <Route path="/create" element={<CreateEditPost />} />
                <Route path="/edit/:id" element={<CreateEditPost />} />
                <Route path="/manage" element={<PostManagement />} />
            </Routes>
        </div>
    );
}

export default App;
