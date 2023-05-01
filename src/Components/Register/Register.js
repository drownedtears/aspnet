import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

const Register = ({ user, setUser }) => {
const [errorMessages, setErrorMessages] = useState([])
const navigate = useNavigate()

const register = async (event) => {
    event.preventDefault()
    var { email, password, passwordConfirm } = document.forms[0]
    // console.log(email.value, password.value)
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        email: email.value,
        password: password.value, 
        passwordConfirm: passwordConfirm.value
        }),
    }
    console.log(requestOptions)
    return await fetch("https://localhost:7074/api/account/register", requestOptions)
        .then((response) => {
        console.log(response.status)
        response.status === 200 &&
        navigate("/login")
        return response.json()
        })
        .then(
        (data) => {
            console.log(data.userName)
            console.log("Data:", data)
            if (
            typeof data !== "undefined" &&
            typeof data.userName !== "undefined"
            ) {
            setUser({ isAuthenticated: true, userName: data.userName })
            navigate("/")
            }
            typeof data !== "undefined" &&
            typeof data.error !== "undefined" &&
            setErrorMessages(data.error)
        },
        (error) => {
        console.log(error)
        }
        )
}
const renderErrorMessage = () =>
    errorMessages.map((error, index) => <div key={index}>{error}</div>)

    return (
   
        <>
        <h3>Регистрация</h3>
        <form onSubmit={register}>
        <label>Почта </label>
        <input type="text" name="email" placeholder="Почта" />
        <br />
        <label>Пароль </label>
        <input type="text" name="password" placeholder="Пароль" />
        <label>Подтвердить пароль </label>
        <input type="text" name="passwordConfirm" placeholder="Подтвердить пароль" />
        <br />
        <button type="submit">Зарегистрироваться</button>


        </form>
        {renderErrorMessage()}
        </>

    )
}
export default Register