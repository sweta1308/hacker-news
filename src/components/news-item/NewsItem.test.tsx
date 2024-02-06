import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import NewsItem from './NewsItem'
import { NewsType } from 'pages/homepage/Home.types'

const mockNews: NewsType = {
  title: 'Mock News Title',
  url: 'https://example.com',
  score: 42,
  by: 'mockuser',
  time: Date.now() / 1000,
  descendants: 5,
  id: 0,
  kids: [],
  type: '',
}

it('renders NewsItem component with mock data', () => {
  render(<NewsItem news={mockNews} currentPage={1} index={1} />)

  const newsItem = screen.getByTestId('news-item')
  expect(newsItem).toBeInTheDocument()

  const title = screen.getByText(mockNews.title)
  expect(title).toBeInTheDocument()

  const url = screen.getByText(`(${mockNews.url})`)
  expect(url).toBeInTheDocument()

  const by = screen.getByText(mockNews.by)
  expect(by).toBeInTheDocument()

  const descendants = screen.getByText(`${mockNews.descendants} comments`)
  expect(descendants).toBeInTheDocument()
})
