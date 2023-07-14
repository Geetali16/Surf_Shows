import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import SearchBar from './components/SearchBar';
import Dashboard  from './components/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        {/* <Route path="/" element={<Dashboard />} /> */}
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/search" element={<SearchBar />} />
        {/* <Route path="/dashboard" element={<LoginScreen />} />  */}
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </Router>
  );
}

export default App;
