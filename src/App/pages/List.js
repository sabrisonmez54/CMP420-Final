import React, { Component, Fragment } from 'react';
import axios from 'axios';
import UserTable from '../tables/UserTable'
import AddUserForm from '../forms/AddUserForm'
import EditUserForm from '../forms/EditUserForm'

class List extends Component {
    // Initialize the state
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            employees: [],
            editing: false,
            currentUser: [{ emplid: null, first_name: '', email: '' }]
        }
    }

    // Fetch the list on first mount
    componentDidMount() {
        //this.getList();
        axios.get(`/api/getEmployees`)
            .then(res => {
                const employees = res.data;
                this.setState({ employees });
            })


    }

    // // Retrieves the list of items from the Express app
    // getList = () => {
    //     fetch('/api/getEmployees')
    //         .then(response => response.json())
    //         .then(data => {
    //             this.setState({ list: data });
    //         })

    // }

    render() {
        const { list, employees, editing } = this.state;

        console.log(list);
        console.log(employees);
        //console.log(list.employees.map(item => item));
        const editRow = employees => {
            this.setState({ editing: true })

            this.setState({ currentUser: [{ emplid: employees.emplid, first_name: employees.first_name, email: employees.email }] })
        }
        return (
            <div className="App">
                <h1>List of Employees</h1>
                {/* Check to see if any items are found*/}
                {employees.length ? (
                    <div style={{ display: "flex", alignItems: 'center', justifyContent: "center" }}>
                        {/* Render the list of items */}

                        <div className="flex-large">
                            {editing ? (
                                <Fragment>
                                    <h2>Edit user</h2>
                                    <EditUserForm
                                        editing={editing}

                                    />
                                </Fragment>
                            ) : (
                                    <Fragment>
                                        <h2>Add user</h2>
                                        <AddUserForm />
                                    </Fragment>
                                )}
                        </div>
                        <div>
                            <UserTable users={employees} editRow={editRow} />
                        </div>

                    </div>
                ) : (
                        <div>
                            <h2>No List Items Found</h2>
                        </div>
                    )
                }
            </div>
        );
    }
}

export default List;