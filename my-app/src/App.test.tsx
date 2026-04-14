import { render } from '@testing-library/react'
import { test, expect } from 'vitest'
import App from './App'

test('renders main heading', () => {
  const { getByRole } = render(<App />)
  expect(getByRole('heading', { level: 1, name: 'Focus Sprint Tracker' })).toBeInTheDocument()
})