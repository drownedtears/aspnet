import './index.css';
import reportWebVitals from './reportWebVitals';

import React, { useState } from 'react'
import ReactDOM from "react-dom/client"

import Deal from './Components/Deal/Deal'
import DealCreate from './Components/DealCreate'

const App = () => {

  const [deals, setDeals] = useState([])
  const addDeal = (deal) => setDeals([...deals, deal])
  const removeDeal = (removeId) => setDeals(deals.filter(({ dealId }) => dealId
    !== removeId));

  return (
    <div>
      <DealCreate
        addDeal={addDeal}
      />
      <Deal
        deals={deals}
        setDeals={setDeals}
        removeDeal={removeDeal}
      />
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
