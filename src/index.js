import './index.css';
import reportWebVitals from './reportWebVitals';

import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Deal from './Components/Deal/Deal'
import DealCreate from './Components/DealCreate'

import Layout from "./Components/Layout/Layout"
import LogIn from "./Components/Login/Login"
import LogOff from "./Components/Logoff/Logoff"
import Register from "./Components/Register/Register"

const App = () => {

  const [deals, setDeals] = useState([])
  const addDeal = (deal) => setDeals([...deals, deal])
  const removeDeal = (removeId) => setDeals(deals.filter(({ dealId }) => dealId
    !== removeId));

    const [user, setUser] = useState({ isAuthenticated: false, userName: "" })
      useEffect(() => {
        const getUser = async () => {
          return await fetch("api/account/isauthenticated")
            .then((response) => {
              response.status === 401 &&
                setUser({ isAuthenticated: false, userName: "" })
              return response.json()
            })
            .then(
              (data) => {
                if (
                  typeof data !== "undefined" &&
                  typeof data.userName !== "undefined"
                ) {
                  setUser({ isAuthenticated: true, userName: data.userName })
                }
              },
              (error) => {
                console.log(error)
              }
            )
        }
        getUser()
      }, [setUser])

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout user={user} />}>
            <Route index element={<h3>Главная страница</h3>} />
              <Route
                path="/blogs"
                element={
                  <>
                  <DealCreate
                    user={user} addDeal={addDeal}
                  />
                  <Deal
                    user={user}
                    deals={deals}
                    setDeals={setDeals}
                    removeDeal={removeDeal}
                  />
                  </>
                }
              />
              <Route
              path="/login"
              element={<LogIn user={user} setUser={setUser} />}
              />
               <Route
              path="/register"
              element={<Register user={user} setUser={setUser} />}
              />
              <Route path="/logoff" element={<LogOff setUser={setUser} />} />
            <Route path="*" element={<h3>404</h3>} />
          </Route>
        </Routes>
      </BrowserRouter>

    </div>
  )
}
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
