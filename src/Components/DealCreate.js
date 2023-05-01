import React from 'react'
import { Button, Checkbox, Form, Input } from "antd"

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
      <Form onSubmit={handleSubmit}>
        <div className="price-input">
          <label>Цена: </label>
          <Input type="text" id="price" name="price" placeholder="Введите цену" />
        </div>
        <div className="item-input">
          <label>Товар: </label>
          <Input type="text" id="item" name="item" placeholder="Введите название товара" />
        </div>
        
        <Button type="primary">Создать</Button>
      </Form>
    </React.Fragment >
  )
}
export default DealCreate