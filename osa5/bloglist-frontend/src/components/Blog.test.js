import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

test('additional info shown when button pressed', async () => {
  const component = render(<Blog blog={blog} />)

  const user = userEvent.setup()

  const viewButton = component.getByText('view')

  await user.click(viewButton)

  const blogDetails = component.container.querySelector('.blogDetails')

  expect(blogDetails).toBeVisible()
})

test('when liked twice the event handler is called twice', async () => {
  const mockHandler = jest.fn()

  const component = render(<Blog blog={blog} handleLikeChange={mockHandler}/>)

  const user = userEvent.setup()
  const viewButton = component.getByText('view')

  await user.click(viewButton)

  const likeButton = component.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})