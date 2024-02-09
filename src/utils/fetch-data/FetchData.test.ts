import axios from 'axios'
import { fetchData } from './FetchData'

jest.mock('axios')

describe('fetchData function', () => {
  it('fetches data successfully', async () => {
    const mockedData = { data: 'news item' }
    ;(axios.get as jest.Mock).mockResolvedValueOnce({ data: mockedData })

    const url = 'http://example.com/data'
    const data = await fetchData(url)

    expect(data).toEqual(mockedData)
    expect(axios.get).toHaveBeenCalledWith(url)
  })

  it('handles errors correctly', async () => {
    const mockedError = new Error('Request failed')
    ;(axios.get as jest.Mock).mockRejectedValueOnce(mockedError)

    const url = 'http://example.com/data'
    const consoleSpy = jest.spyOn(console, 'log')

    await fetchData(url)

    expect(consoleSpy).toHaveBeenCalledWith(mockedError)
  })
})
