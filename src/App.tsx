// import './App.sass'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import './style/style.scss'
import { ProductPage } from './pages/ProductPage'

function App() {
  

  return (
    <div className='container'>
        <Routes>
        <Route path='/' element={<Home/>}/>

         <Route path="/product/:id" element={<ProductPage/>} />
        </Routes>
    </div>
  )
}

export default App
