import React, { useEffect, useState } from 'react'
import { api } from '../service/apiService'
import { Table } from 'rsuite'

const UserList = () => {
    const { Cell, HeaderCell, Column } = Table
    const [allUsers, setAllUsers] = useState([])

    const getAllUsers = async () => {
        try {
            const response = await api.get('/get-all-users')
            if (response.status === 200) {
                setAllUsers(response.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllUsers()
    }, [])

    return (
        <>
            <div style={mainDiv}>
                <div>
                    {/* <div>
                    {error && (
                        <p>{error}</p>
                    )}
                </div> */}
                    <div style={subDiv}>
                        <h5>Users List</h5>
                    </div>
                    <Table data={allUsers}>
                        <Column>
                            <HeaderCell>s/n</HeaderCell>
                            <Cell>
                                {(rowData, rowIndex) => (
                                    rowIndex + 1
                                )}
                            </Cell>
                        </Column>
                        <Column flexGrow={1}>
                            <HeaderCell>
                                First name
                            </HeaderCell>
                            <Cell dataKey='firstName' />
                        </Column>
                        <Column flexGrow={1}>
                            <HeaderCell>
                                Last name
                            </HeaderCell>
                            <Cell dataKey='lastName' />
                        </Column>
                        <Column flexGrow={1}>
                            <HeaderCell>
                                User name
                            </HeaderCell>
                            <Cell dataKey='userName' />
                        </Column>
                    </Table>
                </div>
            </div>
        </>
    )
}

const mainDiv = {
    border: '1px solid #f1f1f1',
    margin: '10px',
    borderRadius: '8px',
    padding: '40px'
}

const subDiv = {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    padding: '20px'
}

const button = {
    border: 'transparent',
    padding: '10px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px'
}

export default UserList