import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NewBlog from './NewBlog'

test('<App/> add ', () => {
    const createBlog = jest.fn()

    const component = render(
        <NewBlog createBlog={createBlog} />
    )

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('#newBlogForm')
    
    fireEvent.change(title, {
        target: { value: 'new title'}
    })
    fireEvent.change(author, {
        target: { value: 'new author'}
    })
    fireEvent.change(url, {
        target: { value: 'new url'}
    })

    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('new title')
    expect(createBlog.mock.calls[0][0].author).toBe('new author')
    expect(createBlog.mock.calls[0][0].url).toBe('new url')
})
