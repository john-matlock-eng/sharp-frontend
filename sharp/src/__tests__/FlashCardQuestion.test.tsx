import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FlashCardQuestion from '../components/FlashCardQuestion';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const mockQuestion = {
  id: 1,
  question: 'What is the capital of France?',
  answer: 'Paris',
};

const mockOnAnswer = jest.fn();

const renderWithTheme = (component: React.ReactNode) => {
  const theme = createTheme();
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('FlashCardQuestion Component', () => {
  beforeEach(() => {
    renderWithTheme(<FlashCardQuestion question={mockQuestion} onAnswer={mockOnAnswer} />);
  });

  it('renders the component', () => {
    expect(screen.getByText('What is the capital of France?')).toBeInTheDocument();
    expect(screen.getByLabelText('Your Answer')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('submits the correct answer', () => {
    fireEvent.change(screen.getByLabelText('Your Answer'), { target: { value: 'Paris' } });
    fireEvent.click(screen.getByText('Submit'));

    expect(mockOnAnswer).toHaveBeenCalledWith('Paris');
    expect(screen.getByText('Correct!')).toBeInTheDocument();
    expect(screen.getByText('Answer')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
  });

  it('submits the incorrect answer', () => {
    fireEvent.change(screen.getByLabelText('Your Answer'), { target: { value: 'London' } });
    fireEvent.click(screen.getByText('Submit'));

    expect(mockOnAnswer).toHaveBeenCalledWith('London');
    expect(screen.getByText('Incorrect.')).toBeInTheDocument();
    expect(screen.getByText('Answer')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
  });
});
