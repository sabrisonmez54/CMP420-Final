import React from 'react'

const UserTable = props => (
    <table>
        <thead>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Hourly Rate</th>
                <th>Weekly Total</th>
                <th>Title</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {props.users.length > 0 ? (
                props.users.map(user => (
                    <tr key={user.emplid}>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone_number}</td>
                        <td>{user.address}</td>
                        <td>{user.hourly_rate}</td>
                        <td>{user.total_weekly}</td>
                        <td>{user.title}</td>
                        <td>
                            <button
                                onClick={() => {
                                    props.editRow(user)
                                }}
                                className="button muted-button"
                            >
                                Edit
              </button>
                            <button
                                onClick={() => props.deleteUser(user.emplid)}
                                className="button muted-button"
                            >
                                Delete
              </button>
                        </td>
                    </tr>
                ))
            ) : (
                    <tr>
                        <td colSpan={3}>No users</td>
                    </tr>
                )}
        </tbody>
    </table>
)

export default UserTable
