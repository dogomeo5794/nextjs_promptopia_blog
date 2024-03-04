'use client'

import { useState, useEffect } from 'react';

import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([])
  const [searchTimeout, setSearchTimeout] = useState(null)

  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
  }

  const handleTagClick = (tag) => {
    setSearchText(tag);
  }

  useEffect(() => {
    const fetchPosts = async (query = "") => {
      const response = await fetch(`/api/prompt${query}`);
      const data = await response.json();
      console.log('data', data)
      setPosts(data);
    }

    if (searchText) {
      clearTimeout(searchTimeout);

      setSearchTimeout(setTimeout(() => {
        console.log("execute", encodeURIComponent(searchText))
        fetchPosts(`?search=${encodeURIComponent(searchText)}`);
      }, 500))
    }
    else {
      fetchPosts();
    }
  }, [searchText])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      <PromptCardList
        data={posts}
        handleTagClick={handleTagClick}
      />
    </section>
  )
}

export default Feed
