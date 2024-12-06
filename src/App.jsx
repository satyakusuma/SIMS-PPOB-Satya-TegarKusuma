import './App.css'
import { Outlet } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'remixicon/fonts/remixicon.css';


function App() {
  return (
    <>
      <Outlet/>
    </>
  )
}

export default App
