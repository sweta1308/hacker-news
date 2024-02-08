import { getSerialNumber } from './SerialNumber'

describe('getSerialNumber function', () => {
  it('returns serial number on the first page', () => {
    const index = 0
    const page = 1
    const serialNumber = getSerialNumber(index, page)
    expect(serialNumber).toBe(1)
  })

  it('returns correct serial number for the second item on the first page', () => {
    const index = 1
    const page = 1
    const serialNumber = getSerialNumber(index, page)
    expect(serialNumber).toBe(2)
  })

  it('returns correct serial number for the first item on the second page', () => {
    const index = 0
    const page = 2
    const serialNumber = getSerialNumber(index, page)
    expect(serialNumber).toBe(31)
  })
})
