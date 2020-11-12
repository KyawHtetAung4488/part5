import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateLikes, remove }) => {
  const [viewDetail, setViewDetail] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = () => {
    const updateObject = {
      user: blog.user,
      likes: blog.likes+1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    updateLikes(updateObject, blog.id)
  }

  return (
    viewDetail
    ? <div style={blogStyle} className='blog'>
        <p>
          <span>{blog.title}</span>
          <button onClick={() => setViewDetail(false)}>hide</button>
        </p>
        <p>{blog.url}</p>
        <p>
          likes {blog.likes}
          <button onClick={handleLike}>like</button>
        </p>
        <p>{blog.author}</p>
        <button onClick={remove(blog.id)}>remove</button>
      </div>
    : <div style={blogStyle}>
        <span>{blog.title}</span>
        <span>{blog.author}</span>
        <button onClick={() => setViewDetail(true)}>view</button>
      </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateLikes: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
}

export default Blog
