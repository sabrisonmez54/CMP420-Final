import React, { useState } from 'react'

const AddUserForm = props => {
    const initialFormState = {
        emplid: null,
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        address: '',
        hourly_rate: '',
        total_weekly: '',
        title: ''
    }
    const [user, setUser] = useState(initialFormState)

    const handleInputChange = event => {
        const { name, value } = event.target

        setUser({ ...user, [name]: value })
    }

    return (
        <form
            onSubmit={event => {
                event.preventDefault()

                console.log(user)
                props.addUser(user)
                setUser(initialFormState)

            }}

        >
            <label>first name</label>
            <input type="text" name="first_name" value={user.first_name} onChange={handleInputChange} />
            <label>last name</label>
            <input type="text" name="last_name" value={user.last_name} onChange={handleInputChange} />
            <label>email</label>
            <input name="email" value={user.email} onChange={handleInputChange} />
            <label>phone</label>
            <input type="text" name="phone_number" value={user.phone_number} onChange={handleInputChange} />
            <label>address</label>
            <input type="text" name="address" value={user.address} onChange={handleInputChange} />
            <label>hourly</label>
            <input type="text" name="hourly_rate" value={user.hourly_rate} onChange={handleInputChange} />
            <label>weekly</label>
            <input type="text" name="total_weekly" value={user.total_weekly} onChange={handleInputChange} />
            <label>title</label>
            <input type="text" name="title" value={user.title} onChange={handleInputChange} />
            <button>Add new user</button>
        </form>
    )
}

export default AddUserForm