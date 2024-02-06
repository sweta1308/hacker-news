import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Navbar from './Navbar'

test('renders Navbar component', () => {
  render(
    <Navbar setCurrentPage={(prev) => console.log(prev)} currentPage={1} />,
  )

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
