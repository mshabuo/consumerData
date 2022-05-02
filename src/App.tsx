import React from "react"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./Components/Header"
import Main from "./Components/Main"
import Footer from "./Components/Footer"
import ConsumerCard from "./Components/ConsumerCard"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/consumer/:consumerId" element={<ConsumerCard />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
