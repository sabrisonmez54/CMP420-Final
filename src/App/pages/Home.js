
import AddUserForm from '../forms/AddUserForm'
import EditUserForm from '../forms/EditUserForm'
import UserTable from '../tables/UserTable'
import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

const Home = () => {
    // Data
    const usersData = [

    ]

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
        const url = `/api/addEmployee/`;
        console.log(user)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user: {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    phone_number: user.phone_number,
                    address: user.address,
                    hourly_rate: user.hourly_rate,
                    total_weekly: user.total_weekly,
                    title: user.title,
                }

            })
        };
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                setUsers(result.data);
            })
            .catch(err => {
                console.log(err);
            });
        window.location.reload();


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
        const url = `/api/updateEmployee/`;
        console.log(updatedUser)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user: {
                    emplid: emplid,
                    first_name: updatedUser.first_name,
                    last_name: updatedUser.last_name,
                    email: updatedUser.email,
                    phone_number: updatedUser.phone_number,
                    address: updatedUser.address,
                    hourly_rate: updatedUser.hourly_rate,
                    total_weekly: updatedUser.total_weekly,
                    title: updatedUser.title,
                }

            })
        };
        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                setUsers(result.data);
            })
            .catch(err => {
                console.log(err);
            });
        window.location.reload();

    }

    const editRow = user => {
        setEditing(true)

        setCurrentUser({
            emplid: user.emplid, first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone_number: user.phone_number,
            address: user.address,
            hourly_rate: user.hourly_rate,
            total_weekly: user.total_weekly,
            title: user.title,
        })
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