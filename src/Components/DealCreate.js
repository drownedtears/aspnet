import React from 'react'

const DealCreate = ({ addDeal }) => {
  const handleSubmit = (e) => {
    e.preventDefault()

    

    const deal = { 
      price: e.target.querySelector("#price").value,
      item: e.target.querySelector("#item").value
    }

    const createDeal = async () => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(deal)
      }
      const response = await fetch("https://localhost:7074/api/Deals",

        requestOptions)

      return await response.json()
        .then((data) => {
          console.log(data)
          console.log(deal)
          // response.status === 201 && addDeal(data)
          if (response.ok) {
            addDeal(data)
            e.target.elements.price.value = ""
            e.target.elements.item.value = ""
          }
        },
          (error) => console.log(error)
        )
    }
    createDeal()
  }
  return (
    <React.Fragment>
      <h3>Создание новой сделки</h3>
      <form onSubmit={handleSubmit}>
        <div className="price-input">
          <label>Цена: </label>
          <input type="text" id="price" name="price" placeholder="Введите цену" />
        </div>
        <div className="item-input">
          <label>Товар: </label>
          <input type="text" id="item" name="item" placeholder="Введите название товара" />
        </div>
        
        <button type="submit">Создать</button>
      </form>
    </React.Fragment >
  )
}
export default DealCreate