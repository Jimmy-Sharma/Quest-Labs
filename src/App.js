import './App.css';
import MainPage from './Pages/MainPage';
import styled from 'styled-components';


const AppContainer = styled.div`
  text-align: center;
  min-height: 100vh;
  height: 100%;
  width: 100%;
  background-color: #cd5a91;
  background-size: cover;
`;


function App() {
  return (
    <AppContainer>
      <MainPage />
    </AppContainer>
  );
}

export default App;
