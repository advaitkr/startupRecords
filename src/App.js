import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Emplisting from './Emplisting';
import EmpEdit from './EmpEdit';
import EmpDetails from './EmpDetails';
import Search from './Search';
function App() {
  return (
    <div className='App'>
    <BrowserRouter>
     <Routes>
      <Route path='/' element={<Emplisting />}></Route>
      <Route path='/employee/detail/:empid' element={<EmpDetails />}></Route>
      <Route path='/employee/edit/:empid' element={<EmpEdit />}></Route>
      <Route path='/search' element={<Search />}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
