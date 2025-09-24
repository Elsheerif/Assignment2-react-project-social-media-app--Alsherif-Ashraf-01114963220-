import React, { useEffect, useState } from 'react'
import { getAllPostsApi } from '../services/PostsService'
import { useNavigate } from 'react-router-dom'
import { addToast } from '@heroui/react'
import Post from '../components/Post'
import CreatePost from '../components/CreatePost'
import LoadingScreen from './LoadingScreen'

export default function Feed() {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate()

  async function getAllPosts() {
    setIsLoading(true)
    try {
      const data = await getAllPostsApi(1)
      console.log("API Response:", data)

      if (data?.message === "success") {
        if (data.posts && data.posts.length > 0) {
          // Sort newest first
          const sortedPosts = [...data.posts].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
          setPosts(sortedPosts)
        } else {
          setPosts([])
        }
      } else {
        console.log("API Error:", data)
        localStorage.removeItem("token")
        addToast({
          title: data?.error || "Authentication failed",
          description: "Please login again",
          timeout: 3000,
          color: "danger",
        })
        navigate("/auth/login")
        return
      }
    } catch (error) {
      console.log("Network Error:", error)
      addToast({
        title: "Network Error",
        description: "Failed to load posts. Please try again.",
        timeout: 3000,
        color: "danger",
      })
    }
    setIsLoading(false)
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    console.log("Token exists:", !!token)
    if (token) {
      getAllPosts()
    } else {
      console.log("No token found, redirecting to login")
      navigate("/auth/login")
    }
  }, [])

  return (
    <div className="max-w-3xl mx-auto grid gap-3">
      <CreatePost getAllPosts={getAllPosts} />
      {isLoading ? (
        <LoadingScreen />
      ) : posts.length > 0 ? (
        posts.map((post) => (
          <Post
            getAllPosts={getAllPosts}
            post={post}
            key={post._id}
            commentsLimit={1}
          />
        ))
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No posts available</p>
        </div>
      )}
    </div>
  )
}
