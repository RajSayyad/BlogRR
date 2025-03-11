import React, { useState, useEffect } from 'react';
import API from '../api';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingPost, setEditingPost] = useState(null);
  const [userId, setUserId] = useState(null); // Store logged-in user ID

  // Extract user ID from JWT token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
        setUserId(payload.user_id); // Extract user ID
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
    fetchBlogs();
  }, []);

  // Fetch all blog posts
  const fetchBlogs = () => {
    const token = localStorage.getItem("token");

    API.get("/blogs", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => setPosts(res.data))
    .catch((err) => console.error("Error fetching blogs:", err));
  };

  // Handle form submission for creating and updating blogs
  const handleSubmit = async (e) => {
    e.preventDefault();
    const blogData = { title, description };
    const token = localStorage.getItem("token");

    try {
      if (editingPost) {
        await API.put(`/blogs/${editingPost.id}`, blogData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEditingPost(null);
      } else {
        await API.post("/blogs", blogData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setTitle('');
      setDescription('');
      fetchBlogs();
    } catch (error) {
      console.error("Error submitting blog:", error);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await API.delete(`/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  // Handle edit
  const handleEdit = (post) => {
    setTitle(post.title);
    setDescription(post.description);
    setEditingPost(post);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Blog Posts</h1>

      {/* Form for adding and updating blogs */}
      <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg shadow-lg bg-gray-100">
        <input 
          type="text" 
          placeholder="Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-2 border rounded-lg"
          required
        />
        <textarea 
          placeholder="Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 mb-2 border rounded-lg"
          required
        ></textarea>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">
          {editingPost ? "Update Blog" : "Add Blog"}
        </button>
      </form>

      {/* List of blog posts */}
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="mb-4 p-4 border rounded-lg shadow-md bg-white">
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p className="text-gray-600">{post.description}</p>

            {/* Show Edit/Delete buttons only if the logged-in user created the blog */}
            {post.user_id === userId && (
              <div className="flex gap-2 mt-2">
                <button 
                  onClick={() => handleEdit(post)} 
                  className="bg-yellow-400 text-white px-4 py-1 rounded-lg"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(post.id)} 
                  className="bg-red-500 text-white px-4 py-1 rounded-lg"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No blogs found.</p>
      )}
    </div>
  );
};

export default Home;
