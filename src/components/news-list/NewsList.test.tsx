import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import NewsList from './NewsList'
import { useNews } from 'context/NewsContext'

jest.mock('context/NewsContext', () => ({
  useNews: jest.fn(() => ({
    news: [
      {
        title: 'Mock News Title',
        url: 'https://example.com',
        score: 42,
        by: 'mockuser',
        time: Date.now() / 1000,
        descendants: 5,
        id: 0,
        kids: [],
        type: '',
      },
    ],
    isMoreBtnDisabled: true,
    handleMoreClick: jest.fn(),
  })),
}))

describe('NewsList component', () => {
  it('renders loading spinner when newsData is empty', () => {
    (useNews as jest.Mock).mockReturnValueOnce({
      news: [],
      isMoreBtnDisabled: false,
      handleMoreClick: jest.fn(),
    })

    render(<NewsList />)
    const newsList = screen.getByTestId('news-list')
    expect(newsList).toBeInTheDocument()
    const loader = screen.getByTestId('loader')
    expect(loader).toBeInTheDocument()
  })

  it('renders news items when newsData is not empty', () => {
    const mockNewsData = [
      { id: 1, title: 'News 1' },
      { id: 2, title: 'News 2' },
    ]
    ;(useNews as jest.Mock).mockReturnValueOnce({
      news: mockNewsData,
      isMoreBtnDisabled: false,
      handleMoreClick: jest.fn(),
    })

    render(<NewsList />)
    const newsList = screen.getByTestId('news-list')
    expect(newsList).toBeInTheDocument()
    expect(screen.getByText('News 1')).toBeInTheDocument()
    expect(screen.getByText('News 2')).toBeInTheDocument()
  })

  it('calls paginate function when "More" button is clicked', () => {
    const paginateMock = jest.fn()

    ;(useNews as jest.Mock).mockReturnValueOnce({
      news: [
        { id: 1, title: 'News 1' },
        { id: 2, title: 'News 2' },
      ],
      isMoreBtnDisabled: false,
      handleMoreClick: paginateMock,
    })

    render(<NewsList />)
    const moreBtn = screen.getByText('More')
    fireEvent.click(moreBtn)
    expect(paginateMock).toHaveBeenCalled()
  })

  it('disables "More" button when isMoreBtnDisabled returns true', () => {
    ;(useNews as jest.Mock).mockReturnValueOnce({
      newsData: [
        { id: 1, title: 'News 1' },
        { id: 2, title: 'News 2' },
      ],
      isMoreBtnDisabled: true,
      paginate: jest.fn(),
    })

    render(<NewsList />)
    const moreBtn = screen.getByText('More')
    expect(moreBtn).toHaveAttribute('disabled')
  })
})
