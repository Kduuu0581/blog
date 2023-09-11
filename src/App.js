import React, { useState, useEffect} from 'react';
import axios from 'axios';
import Post from './Post';
import './App.css';


const App = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(res => {
        setPosts(res.data);
      }
    )
    .catch(err => {
      console.log(err);
    });
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPosts = posts.filter((post) => {
    return post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.body.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <h1>Blog Posts</h1>
        <input
          type="text"
          placeholder="Search"
          onChange={handleSearch}
        />
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)}>
          Previous
        </button>
        <span>{currentPage}</span>
        <button onClick={() => setCurrentPage(currentPage + 1)}>
          Next
        </button>
      </div>
      {filteredPosts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default App;


