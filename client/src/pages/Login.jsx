import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Input, InputGroup } from 'rsuite';
import FormControlLabel from 'rsuite/esm/FormControlLabel';
import { api } from '../service/apiService';


const Login = () => {
    const [formValues, setFormValues] = useState({
        userName: '',
        password: ''
    })
    const navigate = useNavigate()

    const handleInputChange = (name, value) => {
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault()
        const response = await api.post('login', formValues)
        if(response.status === 201){
            const userId = response.data.user._id
            navigate(`/view-products/${userId}`)
        }
    }

    return (
        <div style={mainDiv}>
            <div style={{ width: '40%' }}>
                <h5 style={{ textAlign: 'center' }}>Sign up</h5>
                <br/>
                <form>
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
                       <button onClick={handleLogin} style={button}>Login</button> 
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

export default Login