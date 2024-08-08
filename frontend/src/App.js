// import css
import './styles/App.css'

// import components
import Header from './components/Header.jsx'
import ChatList from './components/ChatList.jsx'

function App() {
  return (
    <div className="App">
        <Header />
        <ChatList/>
    </div>
  );
}

export default App;
