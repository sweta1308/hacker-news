import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import NewsList from './NewsList'
import { useNews } from 'context/NewsContext'

jest.mock('context/NewsContext', () => ({
  useNews: jest.fn(() => ({
    newsData: [
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
    isMoreBtnDisabled: jest.fn(),
    paginate: jest.fn(),
    getNewsListClass: jest.fn(),
  })),
}))

describe('NewsList component', () => {
  it('applies className based on getNewsListClass result', () => {
    ;(useNews as jest.Mock).mockReturnValueOnce({
      newsData: [],
      isMoreBtnDisabled: jest.fn(),
      paginate: jest.fn(),
      getNewsListClass: jest.fn().mockReturnValue('news-list'),
    })

    render(<NewsList />)
    const newsList = screen.getByTestId('news-list')
    expect(newsList).toHaveClass('news-list')
  })

  it('renders loading spinner when newsData is empty', () => {
    (useNews as jest.Mock).mockReturnValueOnce({
      newsData: [],
      isMoreBtnDisabled: jest.fn(),
      paginate: jest.fn(),
      getNewsListClass: jest.fn(),
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
      newsData: mockNewsData,
      isMoreBtnDisabled: jest.fn().mockReturnValue(false),
      paginate: jest.fn(),
      getNewsListClass: jest.fn(),
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
      newsData: [
        { id: 1, title: 'News 1' },
        { id: 2, title: 'News 2' },
      ],
      isMoreBtnDisabled: jest.fn(),
      paginate: paginateMock,
      getNewsListClass: jest.fn(),
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
      isMoreBtnDisabled: jest.fn().mockReturnValue(true),
      paginate: jest.fn(),
      getNewsListClass: jest.fn(),
    })

    render(<NewsList />)
    const moreBtn = screen.getByText('More')
    expect(moreBtn).toHaveAttribute('disabled')
  })
})
