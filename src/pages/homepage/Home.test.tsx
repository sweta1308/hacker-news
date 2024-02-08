import React from 'react'
import { screen, render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Home } from './Home'
import { NewsProvider } from 'context/NewsContext'

test('renders Navbar and NewsList components', () => {
  render(
    <NewsProvider>
      <Home />
    </NewsProvider>,
  )

  const navbar = screen.getByTestId('navbar')
  expect(navbar).toBeInTheDocument()
  const newsList = screen.getByTestId('news-list')
  expect(newsList).toBeInTheDocument()
})
