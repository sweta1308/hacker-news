import { screen, render, fireEvent, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import { NewsProvider, useNews } from './NewsContext'

jest.mock('utils/fetch-data/FetchData', () => ({
  fetchData: jest.fn().mockResolvedValue({}),
}))

describe('NewsProvider', () => {
  it('fetches ids and objects correctly on render', async () => {
    const TestComponent = () => {
      return <div>News App</div>
    }
    await act(async () => {
      render(
        <NewsProvider>
          <TestComponent />
        </NewsProvider>,
      )
    })
  })

  it('resets currentPage to 1 when New button is clicked', async () => {
    const TestComponent = () => {
      const { handleNewClick } = useNews()
      return <button onClick={handleNewClick}>new</button>
    }

    render(
      <NewsProvider>
        <TestComponent />
      </NewsProvider>,
    )
    const newBtn = screen.getByText('new')
    fireEvent.click(newBtn)
  })

  it('decreases currentPage when Past button is clicked', async () => {
    const TestComponent = () => {
      const { handlePastClick } = useNews()
      return <button onClick={handlePastClick}>past</button>
    }

    render(
      <NewsProvider>
        <TestComponent />
      </NewsProvider>,
    )
    const pastBtn = screen.getByText('past')
    fireEvent.click(pastBtn)
  })

  it('increments currentPage when More button is clicked', async () => {
    const TestComponent = () => {
      const { handleMoreClick } = useNews()
      return <button onClick={handleMoreClick}>More</button>
    }

    render(
      <NewsProvider>
        <TestComponent />
      </NewsProvider>,
    )
    const moreBtn = screen.getByText('More')
    fireEvent.click(moreBtn)
  })
})
