import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
} from '@mui/material';
import { styled } from '@mui/system';
import { Theme } from '@mui/material/styles';

const FlashcardContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '800px',
  margin: '20px auto',
  perspective: '1000px',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '95%',
  },
}));

const FlashcardWrapper = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '300px',
  marginBottom: '25px',
});

const FlashcardInner = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isFlipped',
})<{ isFlipped: boolean }>(({ isFlipped }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  transition: 'transform 0.6s',
  transformStyle: 'preserve-3d',
  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
}));

const FlashcardFace = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'isBack',
})<{ isBack?: boolean }>(({ theme, isBack }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
  borderRadius: '10px',
  boxShadow: (theme as Theme).shadows[5],
  backgroundColor: (theme as Theme).palette.background.paper,
  border: `1px solid ${(theme as Theme).palette.divider}`,
  transform: isBack ? 'rotateY(180deg)' : 'rotateY(0deg)',
  overflow: 'auto',
}));

const FlashcardContent = styled(Box)({
  width: '100%',
  height: '100%',
  overflowY: 'auto',
});

const FlashcardTypography = styled(Typography)(({ theme }) => ({
  fontSize: 'calc(16px + 1vw)',
  [theme.breakpoints.down('sm')]: {
    fontSize: 'calc(14px + 1vw)',
  },
}));

interface FlashCardQuestionProps {
  question: {
    id: string;
    question: string;
    answer: string[];
  };
  onAnswer: (answer: string[]) => void;
}

const FlashCardQuestion: React.FC<FlashCardQuestionProps> = ({
  question,
  onAnswer,
}) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSubmit = () => {
    const correct = question.answer.some(
      (ans) => userAnswer.toLowerCase().trim() === ans.toLowerCase().trim()
    );
    setIsCorrect(correct);
    onAnswer([userAnswer]);
    setShowAnswer(true);
  };

  return (
    <FlashcardContainer>
      <FlashcardWrapper>
        <FlashcardInner isFlipped={showAnswer} aria-live="polite">
          <FlashcardFace>
            <FlashcardContent>
              <FlashcardTypography variant="h5" gutterBottom>
                {question.question}
              </FlashcardTypography>
            </FlashcardContent>
          </FlashcardFace>
          <FlashcardFace
            isBack
            style={{ border: `3px solid ${isCorrect ? '#4caf50' : '#f44336'}` }}
          >
            <FlashcardContent>
              <Alert severity={isCorrect ? 'success' : 'error'} sx={{ mt: 2 }}>
                {isCorrect ? 'Correct!' : 'Incorrect.'}
              </Alert>
              <FlashcardTypography variant="h5" gutterBottom>
                Answer
              </FlashcardTypography>
              <FlashcardTypography variant="body1" gutterBottom>
                {question.answer.join(', ')}
              </FlashcardTypography>
            </FlashcardContent>
          </FlashcardFace>
        </FlashcardInner>
      </FlashcardWrapper>
      <Box mt={2}>
        <TextField
          label="Your Answer"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          fullWidth
          margin="normal"
          aria-label="Your Answer"
          aria-required="true"
        />
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          fullWidth
          disabled={showAnswer}
          aria-label={showAnswer ? 'Answered' : 'Submit'}
        >
          {showAnswer ? 'Answered' : 'Submit'}
        </Button>
      </Box>
    </FlashcardContainer>
  );
};

export default FlashCardQuestion;
