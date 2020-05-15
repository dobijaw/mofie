import React from 'react';
import { render } from '@testing-library/react';
import Root from './Root';

test('renders learn react link', () => {
  const { getByText } = render(<Root />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
