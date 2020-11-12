import React, {useState} from 'react'

const NewBlog = ({ createBlog }) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
    
        const newBlog = { author, title, url }
    
        createBlog(newBlog)
        setTitle('')
        setAuthor('')
        setUrl('')
      }

    return (
        <form onSubmit={addBlog} id="newBlogForm">
          <div>
            title: <input id="title" type="text" name="title" value={title} onChange={({target}) => setTitle(target.value)} />
          </div>
          <div>
            author: <input id="author" type="text" name="author" value={author} onChange={({target}) => setAuthor(target.value)} />
          </div>
          <div>
            url: <input id="url" type="text" name="url" value={url} onChange={({target}) => setUrl(target.value)} />
          </div>
          <button id="create-blog" type="submit">create</button>
        </form>
    )
}

export default NewBlog
