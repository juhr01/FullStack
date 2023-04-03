import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'blogi 1',
  author: 'bloggari',
  url: 'url',
  likes: 70,
  user: {
    username: 'bloggari',
    name: 'joona',
    id: '63f4abf9ce00166c5b57ca49'
  },
  id: '63f4ae332cf63683e926fe0e'
}

test('title is rendered', () => {
  const component = render(<Blog blog={blog} />)

  const blogTitle = component.container.querySelector('.blogTitle')
  expect(blogTitle).toBeDefined()
  expect(blogTitle).toBeVisible()
})

test('additional info shown when button pressed', () => {
    
})