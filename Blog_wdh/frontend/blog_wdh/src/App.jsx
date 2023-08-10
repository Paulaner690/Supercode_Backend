import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './pages/Home';
import Blog from './pages/Blog';
import EditPage from './pages/EditPage';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/blog" element={<Blog/>}/>
          <Route path="/edit/:id" element={<EditPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
