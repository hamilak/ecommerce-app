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
    const [loginError, setLoginError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleInputChange = (name, value) => {
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await api.post('login', formValues)
            console.log(response)
            if(response.status === 201){
                setLoading(false)
                const userId = response.data.user._id
                navigate(`/view-products/${userId}`)
            }
        } catch (error) {
            setLoading(false)
            if(error.response && error.response.status === 401) {
                setLoginError('Invalid email or password')
            } else if(error.response && error.response.status === 404) {
                setLoginError('User does not exist')
            }
        } finally{
            setLoading(false)
        }
    }

    return (
        <div style={mainDiv}>
            <div style={{ width: '40%' }}>
                <h5 style={{ textAlign: 'center' }}>Sign in</h5>
                <br/>
                {loginError && (
                    <div style={{ border: '0.5px solid red', borderRadius: '4px', padding: '6px', marginBottom: '12px' }}>
                        <p style={{ color: 'red' }}>{loginError}</p>
                    </div>
                )}
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