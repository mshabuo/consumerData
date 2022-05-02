import React from "react"
import "./App.css"
import Header from "./Components/Header"
import Main from "./Components/Main"
import Footer from "./Components/Footer"
import ConsumerCard from "./Components/ConsumerCard"

function App() {
  return (
    <div className="App">
      <Header />
      <Main />
      <ConsumerCard />
      <Footer />
    </div>
  )
}

export default App
