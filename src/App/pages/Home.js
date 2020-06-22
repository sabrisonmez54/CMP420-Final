
import AddUserForm from '../forms/AddUserForm'
import EditUserForm from '../forms/EditUserForm'
import UserTable from '../tables/UserTable'
import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

const Home = () => {
    // Data
    const usersData = [

    ]

    const initialFormState = { id: null, name: '', username: '' }

    // Setting state
    const [users, setUsers] = useState(usersData)
    const [currentUser, setCurrentUser] = useState(initialFormState)
    const [editing, setEditing] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                '/api/getEmployees',
            );

            setUsers(result.data);
        };

        fetchData();
    }, []);
    // CRUD operations
    const addUser = user => {
        user.id = users.length + 1
        setUsers([...users, user])
    }

    const deleteUser = emplid => {
        setEditing(false)

        // setUsers(users.filter(user => user.emplid !== emplid))
        const url = `/api/deleteEmployees/${emplid}`;

        axios
            .delete(url)
            .then(result => {
                setUsers(result.data);
            })
            .catch(err => {
                console.log(err);
            });
        window.location.reload();
    }

    const updateUser = (emplid, updatedUser) => {
        setEditing(false)

        setUsers(users.map(user => (user.emplid === emplid ? updatedUser : user)))
    }

    const editRow = user => {
        setEditing(true)

        setCurrentUser({ emplid: user.emplid, first_name: user.first_name, email: user.email })
    }

    return (
        <div className="container">
            <h1>CMP420 Final Project by Sabri</h1>
            <div className="flex-row">
                <div className="flex-large">
                    {editing ? (
                        <Fragment>
                            <h2>Edit Employee</h2>
                            <EditUserForm
                                editing={editing}
                                setEditing={setEditing}
                                currentUser={currentUser}
                                updateUser={updateUser}
                            />
                        </Fragment>
                    ) : (
                            <Fragment>
                                <h2>Add Employee</h2>
                                <AddUserForm addUser={addUser} />
                            </Fragment>
                        )}
                </div>
                <div className="flex-large">
                    <h2>View Employees</h2>
                    <UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
                </div>
            </div>
        </div>
    )
}

export default Home