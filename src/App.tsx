import React from "react"
import { Provider } from "react-redux"
import { HashRouter as Router, Route, Routes } from "react-router-dom"
import Layout from "./layouts/Layout"
import Login from "./pages/login"
import "./App.css"

function App() {
  return (
    // <Provider>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Layout />} />
      </Routes>
    </Router>
    // </Provider>
  )
}

export default App
