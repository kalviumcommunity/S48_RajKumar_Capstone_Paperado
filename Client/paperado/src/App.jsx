import {BrowserRouter, Routes, Route}  from 'react-router-dom';
// import LandingPage from "./Component/Landingpage";
import PaperadoHome from './component/Landingpage';
function App(){
  // const [count, setCount]=useState(0)
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaperadoHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;