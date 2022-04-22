import './App.css';
import Menu from './components/Menu/Menu.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import UsersPage from './Pages/UsersPage/UserPage.js'
import DashboardPage from './Pages/DashboardPage/DashboardPage.js'
import BooksPage from './Pages/BooksPage/BooksPage.js'
import PublishersPage from './Pages/PublishersPage/PublishersPage.js'
import RentsPage from './Pages/RentsPage/RentsPage.js'

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
