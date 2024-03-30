import './App.css';
import './components/styles.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './components/Home'
import CardDetails from './components/CardDetails';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/card/:id" element={<CardDetails />} />
      </Routes>
    </Router>
  );
  
  
}

export default App;
