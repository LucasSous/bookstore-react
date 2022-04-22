import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './components/Menu/Menu.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import UsersPage from './Pages/UsersPage/UserPage.jsx'
import DashboardPage from './Pages/DashboardPage/DashboardPage.jsx'
import BooksPage from './Pages/BooksPage/BooksPage.jsx'
import PublishersPage from './Pages/PublishersPage/PublishersPage.jsx'
import RentsPage from './Pages/RentsPage/RentsPage.jsx'

function App() {
  return (
    <Router>
      <div className="App">
        <Menu />
        <Routes>
          <Route path='/' exact element={<DashboardPage/>} />
          <Route path='/users' element={<UsersPage/>} />
          <Route path='/books' element={<BooksPage/>} />
          <Route path='/publishers' element={<PublishersPage/>} />
          <Route path='/rents' element={<RentsPage/>} />
        </Routes>
        
      </div>
    </Router>
    
  );
}

export default App;
