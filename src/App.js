import React,{useState} from 'react'
import './App.css';
import Home from './components/home/Home';
import Sidebar from './components/sidebar/Sidebar';
function App() {
  //  const [mode,SetMode]=useState(false)
  //  const toggleMode=()=>{useState(!mode)}
   const [extended,setExtended]=useState(false)
   const toggleExtended=()=>{setExtended(!extended)}
  return (
    <>
    {/* you need to send the toogleextended to both otherwise it does not work */}
      <Sidebar extended={extended} toggleExtended={toggleExtended} />
      <Home extended={extended} toggleExtended={toggleExtended} />    
    </>
  );
}

export default App;
