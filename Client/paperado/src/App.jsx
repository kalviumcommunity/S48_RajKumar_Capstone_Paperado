import {BrowserRouter, Routes, Route}  from 'react-router-dom';
import PaperadoHome from './component/Pages/Landingpage';
import Login from './component/Pages/Login';
import SignUp from "./component/Pages/Signup";
import Home from './component/Pages/Home';

function App(){
  // const [count, setCount]=useState(0)
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaperadoHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;