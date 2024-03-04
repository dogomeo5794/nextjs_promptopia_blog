'use client'

import Profile from '@components/Profile'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

const UserProfile = () => {
  const params = useParams();
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState({
    email: "",
    image: "",
    username: "",
    id: ""
  })

  const fetchPosts = async () => {
    const response = await fetch(`/api/users/${params.id}/posts`);
    const data = await response.json();
    console.log("data", data);
    setPosts(data);
  };

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await fetch(`/api/users/${params.id}/details`)
        const data = await response.json();
        console.log('data', data)
        if (response.ok) {
          setUser({
            email: data.email,
            image: data.image,
            username: data.username,
            id: data._id.toString()
          })

          fetchPosts();
        }
      } catch (error) {
        console.log("error", error)
      }
    }

    getUserDetails();
  }, [])

  return (
    <Profile 
      name={user.username}
      desc="Welcome to your personalized profile page"
      data={posts}
    />
  )
}

export default UserProfile