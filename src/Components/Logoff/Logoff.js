import React, {useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import { Modal } from "antd"

const LogOff = ({ setUser }) => {
const navigate = useNavigate()
const [open, setOpen] = useState(false)

const showModal = () => {
    setOpen(true)
}

useEffect(() => {
    showModal()
}, [])

//logout logout logout logout logout logout logout logout
//logout logout logout logout logout logout logout logout
//logout logout logout logout logout logout logout logout
//logout logout logout               logout logout logout
//logout logout logout               logout logout logout
//logout logout logout               logout logout logout
//logout logout logout               logout logout logout
//logout logout logout logout logout logout logout logout
//logout logout logout logout logout logout logout logout
//logout logout logout logout logout logout logout logout

const logOff = async (event) => {
    event.preventDefault()



    const requestOptions = {
        method: "POST",
    }


    return await fetch("https://localhost:7074/api/account/logoff", requestOptions)
        .then((response) => {
        response.status === 200 &&
        setUser({ isAuthenticated: false, userName: "" })
        response.status === 401 && navigate("/login")
        setOpen(false)
    })

    
}

const handleCancel = () => {
    console.log("Clicked cancel button")
    setOpen(false)
    navigate("/")
}

return (
    <>
        <Modal title="Title" open={open} onOk={logOff} onCancel={handleCancel}>
        <p>Выполнить выход?</p>
    </Modal>
    </>
)
}
export default LogOff