import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import './index.css'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Error from './components/Error'
import NewBlog from './components/NewBlog'
import Toggable from './components/Toggable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [noti, setNoti] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs )
    })
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedUser')

    if (loggedUserJson) {
      setUser(JSON.parse(loggedUserJson))
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try{
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      console.log('Wrong credential')
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const createBlog = (newObject) => {
    blogService.create(newObject)
      .then(r => {
        setBlogs(blogs.concat(r))
        setNoti('a new blog added')
        setTimeout(() => {
          setNoti('')
        }, 5000)
      })
  }

  const updateLikes = (updateObject, id) => {
    blogService.update(updateObject, id)
      .then(updatedObject => {
        setBlogs(blogs.map(blog => blog.id === id ? updatedObject : blog).sort((a, b) => ( b.likes - a.likes )))
      })
  }

  const remove = id => () => {
    const blogToRemove = blogs.find(blog => blog.id === id )
    if(window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)){
      blogService.remove(id)
        .then(response => {
          setBlogs(blogs.filter(blog => blog.id !== id ))
          setNoti(`Deleted a blog`)
          setTimeout(() => {
            setNoti('')
          }, 5000)
        })
    }
  }


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Error errorMessage={errorMessage} />
        <form onSubmit={handleLogin} >
          <div>
            username
            <input id="username" type="text" value={username} name="Username" onChange={({target}) => setUsername(target.value)}></input>
          </div>

          <div>
            password
            <input id="password" type="password" value={password} name="Password" onChange={({target}) => setPassword(target.value)}></input>
          </div>

          <button type="submit" id="login-button">login</button>
      </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification noti={noti} />

      <div>
        <p>
          { user.username } logged in
        </p>
        <button onClick={handleLogout}>logout</button>
      </div>

      <Toggable buttonLabel="new blog">
        <NewBlog  createBlog={createBlog} />
      </Toggable>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateLikes={updateLikes} remove={remove} />
      )}
    </div>
  )
}

export default App
