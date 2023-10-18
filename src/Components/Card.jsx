import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { Button, FlexedCol, FlexedRow, TextArea } from '../Assets/Layouts';
import { Colors } from '../Assets/Colors';
import { ImageUploader } from './ImageUploader';

const Content = styled(TextArea)``;
const CardWrapper = styled(FlexedCol)`
  background-color: ${Colors.white};
  border-radius: 5px;
  box-shadow: 0 1.5px 0 rgb(9 30 66 / 25%);
  margin-bottom: 8px;
  width: 240px;
`;
const ButtonsWrapper = styled(FlexedRow)`
  justify-content: space-between;
  margin-top: 10px;
`;
const ImgWrapper = styled.div``;
const Img = styled.img`
  height: auto;
  width: 100%;
`;

const DeleteCardBtn = styled(Button)`
  border: none;
  background-color: ${Colors.white};
`;

export const Card = ({ card, id, index, columnId, onChange }) => {
  return (
    <Draggable draggableId={id} index={index} key={id}>
      {provided => (
        <CardWrapper
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}>
          <ImgWrapper>
            <Img src={card.image}></Img>
          </ImgWrapper>
          <Content
            value={card.content}
            placeholder={'Card content...'}
            onChange={e =>
              onChange('changeCard', columnId, index, e.target.value)
            }
          />

          <ButtonsWrapper>
            <ImageUploader
              columnId={columnId}
              index={index}
              onChange={onChange}
            />

            <DeleteCardBtn
              onClick={() => onChange('deleteCard', columnId, index)}>
              X
            </DeleteCardBtn>
          </ButtonsWrapper>
        </CardWrapper>
      )}
    </Draggable>
  );
};
