import styled from 'styled-components';
import { Colors } from '../Assets/Colors';
import { Button, Input } from '../Assets/Layouts';

const Title = styled(Input)`
  background-color: ${Colors.grey};
`;
const Header = styled.div`
  margin-bottom: 10px;
`;
const DeleteColBtn = styled(Button)``;

export const ColumnHeader = ({ column, onChange }) => {
  return (
    <Header>
      <Title
        value={column.title}
        placeholder={'Card title...'}
        onChange={e => onChange('changeTitle', column.id, '', e.target.value)}
      />
      <DeleteColBtn onClick={() => onChange('deleteColumn', column.id)}>
        X
      </DeleteColBtn>
    </Header>
  );
};
