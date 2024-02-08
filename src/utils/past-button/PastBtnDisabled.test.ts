import { NewsType } from 'context/NewsContext.types'
import { isPastBtnDisabled } from './PastBtnDisabled'

describe('isPastBtnDisabled function', () => {
  it('returns true when currentPage is 1', () => {
    const currentPage = 1
    const news: NewsType[] = [
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
    ]
    const result = isPastBtnDisabled(currentPage, news)
    expect(result).toBe(true)
  })

  it('returns true when news array is empty', () => {
    const currentPage = 2
    const news: NewsType[] = []
    const result = isPastBtnDisabled(currentPage, news)
    expect(result).toBe(true)
  })

  it('returns false when currentPage is greater than 1 and news array is not empty', () => {
    const currentPage = 2
    const news: NewsType[] = [
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
    ]
    const result = isPastBtnDisabled(currentPage, news)
    expect(result).toBe(false)
  })
})
