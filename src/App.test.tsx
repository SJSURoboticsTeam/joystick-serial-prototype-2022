import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe("testing arm and drive string formats", () => {
  test('renders without crashing', () => {
    render(<App />);
    const linkElement = screen.getByText(/Drive System/i);
    expect(linkElement).toBeInTheDocument();
  });
});

