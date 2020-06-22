import React, { useState, useEffect } from 'react'

const EditUserForm = props => {
    const [user, setUser] = useState(props.currentUser)

    useEffect(
        () => {
            setUser(props.currentUser)
        },
        [props]
    )
    // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

    const handleInputChange = event => {

        const { name, value } = event.target

        setUser({ ...user, [name]: value })
    }

    return (
        <form
            onSubmit={event => {
                event.preventDefault()

                props.updateUser(user.emplid, user)
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
            <button>Update user</button>
            <button onClick={() => props.setEditing(false)} className="button muted-button">
                Cancel
      </button>
        </form>
    )
}

export default EditUserForm