import {BrowserRouter, Routes, Route}  from 'react-router-dom';
import PaperadoHome from './component/Pages/Landingpage';
import Login from './component/Pages/Login';
import SignUp from "./component/Pages/Signup";

function App(){
  // const [count, setCount]=useState(0)
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaperadoHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;