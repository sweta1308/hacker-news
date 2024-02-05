import React from 'react'
import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Home } from './Home'

test('renders Navbar and NewsList components', () => {
  render(<Home />)

  const navbar = screen.getByTestId('navbar')
  expect(navbar).toBeInTheDocument()
  const newsList = screen.getByTestId('news-list')
  expect(newsList).toBeInTheDocument()
})
