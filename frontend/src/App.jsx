import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateText from './components/CreateText';
import ViewText from './components/ViewText';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<CreateText />} />
          <Route path="/:code" element={<ViewText />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
