import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Navbar from './Navbar'
import { useNews } from 'context/NewsContext'

jest.mock('../../context/NewsContext', () => ({
  useNews: jest.fn(() => ({
    currentPage: 1,
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
    handleNewClick: jest.fn(),
    handlePastClick: jest.fn(),
  })),
}))

describe('Navbar component', () => {
  it('renders Navbar component', () => {
    render(<Navbar />)

    const navbarElement = screen.getByTestId('navbar')
    expect(navbarElement).toBeInTheDocument()

    const logoElement = screen.getByText('Y')
    expect(logoElement).toBeInTheDocument()

    const headerElement = screen.getByText('Hacker News')
    expect(headerElement).toBeInTheDocument()

    const loginElement = screen.getByText('login')
    expect(loginElement).toBeInTheDocument()

    const newLinkElement = screen.getByText('new')
    expect(newLinkElement).toBeInTheDocument()

    const pastLinkElement = screen.getByText('past')
    expect(pastLinkElement).toBeInTheDocument()
  })

  it('calls handleNewClick when "new" button is clicked', () => {
    const handleNewClickMock = jest.fn()
    ;(useNews as jest.Mock).mockReturnValue({
      handleNewClick: handleNewClickMock,
    })
    render(<Navbar />)

    const newBtn = screen.getByText('new')
    fireEvent.click(newBtn)
    expect(handleNewClickMock).toHaveBeenCalled()
  })

  it('calls handlePastClick when "past" button is clicked', () => {
    const handlePastClickMock = jest.fn()
    ;(useNews as jest.Mock).mockReturnValue({
      handlePastClick: handlePastClickMock,
    })
    render(<Navbar />)
    const pastBtn = screen.getByText('past')
    fireEvent.click(pastBtn)
    expect(handlePastClickMock).toHaveBeenCalled()
  })
})
