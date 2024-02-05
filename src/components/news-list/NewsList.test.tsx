import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import NewsList from './NewsList'
import { NewsType } from 'pages/homepage/Home.types'

const mockNewsData: NewsType[] = Array.from({ length: 500 }, (_, index) => ({
  title: 'Mock News Title',
  url: 'https://example.com',
  score: 42,
  by: 'mockuser',
  time: Date.now() / 1000,
  descendants: 5,
  id: 0,
  kids: [],
  type: '',
}))

test('renders NewsList component with 500 news items', async () => {
  render(<NewsList newsData={mockNewsData} />)

  await waitFor(() => {
    const newsList = screen.getByTestId('news-list')
    expect(newsList).toBeInTheDocument()

    const newsItems = screen.getAllByTestId('news-item')
    expect(newsItems.length).toBe(500)
  })
})
