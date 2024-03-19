import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Input, InputGroup, SelectPicker } from 'rsuite';
import FormControlLabel from 'rsuite/esm/FormControlLabel';
import { api } from '../service/apiService';

const roleData = Object.values({User: 'User', Admin: 'Admin'}).map((item) => ({
    label: item,
    value: item
}))

const SignUp = () => {
    const [formValues, setFormValues] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        role: '',
        password: ''
    })
    const navigate = useNavigate()

    const handleInputChange = (name, value) => {
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleSelectChange = (value) => {
        setFormValues({
            ...formValues,
            role: value
        });
    };
    const registerUser = async (e) => {
        e.preventDefault()
        const response = await api.post('register', formValues)
        if(response.status === 201){
            const userId = response.data._id
            navigate(`/login`)
        }
    }

    return (
        <div style={mainDiv}>
            <div style={{ width: '40%' }}>
                <h5 style={{ textAlign: 'center' }}>Sign up</h5>
                <br/>
                <form>
                    <FormControlLabel htmlFor='firstName'>First name</FormControlLabel>
                    <InputGroup>
                        <Input
                            type='text'
                            name='firstName'
                            id='firstName'
                            placeholder='Enter your first name'
                            value={formValues.firstName}
                            onChange={(value) => handleInputChange('firstName', value)}
                        />
                    </InputGroup>
                    <br />
                    <FormControlLabel htmlFor='lastName'>Last name</FormControlLabel>
                    <InputGroup>
                        <Input
                            type='text'
                            name='lastName'
                            id='lastName'
                            placeholder='Enter your last name'
                            value={formValues.lastName}
                            onChange={(value) => handleInputChange('lastName', value)}
                        />
                    </InputGroup>
                    <br/>
                    <FormControlLabel htmlFor='userName'>Username</FormControlLabel>
                    <InputGroup>
                        <Input
                            type='text'
                            name='userName'
                            id='userName'
                            placeholder='Enter your username'
                            value={formValues.userName}
                            onChange={(value) => handleInputChange('userName', value)}
                        />
                    </InputGroup>
                    <br />
                    <FormControlLabel htmlFor='role'>Role</FormControlLabel>
                        <SelectPicker
                            searchable={false}
                            style={{ width: '100%' }}
                            data={roleData}
                            id='role'
                            name='role'
                            value={formValues.role}
                            onChange={(value) => handleSelectChange(value)}
                        />
                    <br />
                    <br />
                    <FormControlLabel htmlFor='password'>Password</FormControlLabel>
                    <InputGroup>
                        <Input
                            type='password'
                            id='password'
                            name='password'
                            placeholder='Enter your password'
                            value={formValues.password}
                            onChange={(value) => handleInputChange('password', value)}
                        />
                    </InputGroup>
                    <br />
                       <button onClick={registerUser} style={button}>Register</button> 
                </form>
            </div>
        </div>
    )
}

const mainDiv = {
    display: 'flex',
    justifyContent: 'center',
    border: '1px solid #f1f1f1',
    margin: '10px',
    borderRadius: '8px',
    padding: '40px'
}

const button = {
    width: '100%',
    border: 'transparent',
    padding: '10px',
    borderRadius: '6px',
    cursor: 'pointer',
    backgroundColor: 'green',
    color: 'white',
    fontWeight: 'bold'
}

export default SignUp