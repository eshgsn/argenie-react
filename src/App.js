
import './App.css';
import TablePage from './Components/TablePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AddForm from './Components/AddForm';

function App() {
  return (
    <>
    <Router>
      <div>
      <Routes>
        <Route exact path='/' element={< TablePage />}></Route>
        <Route exact path='/add' element={< AddForm />}></Route>
      </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;
