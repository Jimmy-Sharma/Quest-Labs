import styled from 'styled-components';
import { Card } from './Card';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Colors } from '../Assets/Colors';
import { FlexedCol, Button } from '../Assets/Layouts';
import { ColumnHeader } from './ColumnHeader';

const Container = styled.div`
  max-height: 100%;
  white-space: nowrap;
  margin: 0px 5px;
  background-color: ${Colors.grey};
  border-radius: 5px;
  position: relative;
  padding: 10px;
`;
const Wrapper = styled.div``;
const CardContainer = styled.div``;
const Content = styled(FlexedCol)``;
const AddCardBtn = styled(Button)``;

export const Column = ({ column, index, onChange }) => {
  return (
    <Draggable draggableId={column.id} index={index} key={column.id}>
      {provided => (
        <Wrapper {...provided.draggableProps} ref={provided.innerRef}>
          <Container {...provided.dragHandleProps}>
            <ColumnHeader column={column} onChange={onChange} />
            <Droppable droppableId={column.id}>
              {provided => (
                <Content>
                  <CardContainer
                    ref={provided.innerRef}
                    {...provided.droppableProps}>
                    {column.cards.map((card, index) => {
                      const id = `${column.id}-${card.id}-${index}`;
                      return (
                        <Card
                          card={card}
                          id={id}
                          key={id}
                          index={index}
                          columnId={column.id}
                          onChange={onChange}
                        />
                      );
                    })}
                    {provided.placeholder}
                  </CardContainer>
                  <AddCardBtn onClick={() => onChange('addCard', column.id)}>
                    +
                  </AddCardBtn>
                </Content>
              )}
            </Droppable>
          </Container>
        </Wrapper>
      )}
    </Draggable>
  );
};
