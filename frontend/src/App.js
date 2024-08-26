import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Scan from './pages/Scan';
import Index from './pages/Index';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import SignUpPage from './pages/SignUpPage';
import Download from './pages/Download';
import Jurnal from './pages/Jurnal';
import Admin from './pages/admin/Admin';
import Teacher from './pages/admin/Teacher';
import Edit from './pages/admin/Edit';
import Tugas from './pages/Tugas';
import AddTugas from './pages/admin/AddTugas';
import TugasId from './pages/TugasId';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Index/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/login' element={<SignIn/>} />
        <Route path='/tugas' element={<Tugas/>} />
        <Route path='/tugas/:tugasId' element={<TugasId/>} />
        <Route path='/scan' element={<Scan/>} />
        <Route path='/signuppage' element={<SignUpPage/>} />
        <Route path='/jurnal' element={<Jurnal/>} />
        <Route path='/download-data' element={<Download/>} />
        <Route path='/admin' element={<Admin/>} />
        <Route path='/admin/:teacherId' element={<Teacher/>} />
        <Route path='/admin/edit/:jurnalId' element={<Edit/>} />
        <Route path='/admin/addtugas/:teacherId' element={<AddTugas/>} />
      </Routes>
    </Router>
  );
}

export default App;
