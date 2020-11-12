import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent} from '@testing-library/react'
import Blog from './Blog'

let component
const blog = {
    title: 'testing React',
    author: 'Kyaw Htet Aung',
    url: 'https://fullstackopen.com',
    likes: 1,
}

const updateLikes = jest.fn()
const remove = jest.fn()

describe('Render blog of', () => {

    beforeEach(() => {
        component = render(
            <Blog blog={blog} updateLikes={updateLikes} remove={remove}/>
        )
    })

    test('title and author', () => {
        const title = component.getByText(
            'testing React'
        )
        const author = component.getByText(
            'Kyaw Htet Aung'
        )
        expect(title).toBeDefined()
        expect(author).toBeDefined()
    })
})

describe('Does not render', () => {
    beforeEach(() => {
        component = render(
            <Blog blog={blog} updateLikes={updateLikes} remove={remove}/>
        )
    })
    test('url and likes', () => {
        expect(component.container).not.toHaveTextContent('https://fullstackopen.com')
        expect(component.container).not.toHaveTextContent('1')
    })
    
})

test('show url and likes of blogs when click the show button ', () => {

    component = render(
        <Blog blog={blog} updateLikes={updateLikes} remove={remove}/>
    )
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)
    const url = component.getByText('https://fullstackopen.com')
    expect(url).toBeDefined()
})

test('press like button twice', () => {
    const mockHandler = jest.fn()
    component = render(
        <Blog blog={blog} updateLikes={mockHandler} remove={remove}/>
    )

    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
})


