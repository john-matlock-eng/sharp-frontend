import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button, Typography, Paper } from '@mui/material';

interface ItemOrderingQuestionProps {
  question: {
    id: string;
    question: string;
    options: string[];
    answer: string[];
  };
  onAnswer: (answer: string[]) => void;
}

const ItemOrderingQuestion: React.FC<ItemOrderingQuestionProps> = ({
  question,
  onAnswer,
}) => {
  const [items, setItems] = useState(question.options);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    setItems(newItems);
    onAnswer(newItems);
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        {question.question}
      </Typography>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {items.map((item, index) => (
                <Draggable key={item} draggableId={item} index={index}>
                  {(provided) => (
                    <Paper
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        padding: '16px',
                        marginBottom: '8px',
                        backgroundColor: '#fff',
                        ...provided.draggableProps.style,
                      }}
                    >
                      <Typography variant="body1" gutterBottom>
                        {item}
                      </Typography>
                    </Paper>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Button
        variant="contained"
        color="primary"
        onClick={() => onAnswer(items)}
      >
        Submit
      </Button>
      <Typography variant="body1" color="primary">
        {JSON.stringify(items) === JSON.stringify(question.answer)
          ? 'Correct!'
          : 'Incorrect.'}
      </Typography>
    </div>
  );
};

export default ItemOrderingQuestion;
