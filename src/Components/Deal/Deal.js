import React, { useEffect } from 'react'
import './Style.css'

const Deal = ({ deals, setDeals, removeDeal }) => {
  useEffect(() => {
    const getDeals = async () => {
      const requestOptions = {
        method: 'GET'
      }
      return await fetch("https://localhost:7074/api/Deals/",

        requestOptions)

        .then(response => response.json())
        .then(
          (data) => {
            console.log('Data:', data)
            setDeals(data)
          },
          (error) => {
            console.log(error)
          }
        )
    }
    getDeals()
  }, [setDeals])

  const deleteItem = async ({ dealId }) => {
    const requestOptions = {
      method: 'DELETE'
    }
    return await fetch(`https://localhost:7074/api/Deals/${dealId}`,
      requestOptions)

      .then((response) => {
        if (response.ok) {
          removeDeal(dealId);
        }
      },
        (error) => console.log(error)
      )
  }

  return (
    <React.Fragment>
      <h3>Список сделок</h3>
      {deals.map(({ dealId, price, item }) => (
        <div className="Deal" key={dealId} id={dealId} >
          <strong>Deal #{dealId} - {price}</strong> rub for <strong>{item}</strong>
          <button className="deleteDeal-btn" onClick={(e) => deleteItem({
            dealId
          })}>Удалить</button>
          <div></div>
        </div>
      ))}
    </React.Fragment>
  )
}
export default Deal