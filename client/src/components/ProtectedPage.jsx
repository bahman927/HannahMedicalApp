// client/src/components/ProtectedPage.js
import React, { useState, useEffect } from 'react';
import { fetchWithAuth } from '../services/api';

export default function ProtectedPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await fetchWithAuth('http://localhost:3000/posts');
        setPosts(data);
      } catch (err) {
        console.error(err.message);
      }
    }
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Protected Posts</h1>
      <ul>
        {posts.map((post, index) => (
          <li key={index}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}
