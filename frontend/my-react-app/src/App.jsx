import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/layout/NavigationBar';
import Home from './pages/Home';
import FindBuddy from './pages/FindBuddy';
import Comparison from './pages/Comparision';
import Profile from './pages/Profile';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <NavigationBar />
      <Container fluid="lg" className="py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/find-buddy" element={<FindBuddy />} />
          <Route path="/comparison" element={<Comparison />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
