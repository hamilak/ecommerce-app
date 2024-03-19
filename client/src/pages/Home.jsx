import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../service/apiService'
import { ViewProductsCard } from '../components/Card/Card'
import { Button, Modal } from 'rsuite'

const Home = () => {

    const [allProducts, setAllProducts] = useState([])
    const [error, setError] = useState('')
    const [open, setOpen] = useState(false)
    const [addError, setAddError] = useState('')
    const navigate = useNavigate()

    const getAllProducts = async () => {
        try {
            const response = await api.get('/get-all-products')
            if (response.status === 200) {
                console.log(response)
                setAllProducts(response.data)
            }
        } catch (error) {
            console.log(error)
            setError('An error occured')
        }
    }

    useEffect(() => {
        getAllProducts()
    }, [])

    const handleOpen = () => {
        setOpen(true)
    }

    return (
        <div>
            <div style={mainDiv}>
                <div style={{ margin: '50px auto', padding: '50px', textAlign: 'center' }}>
                    <div>
                        {error && (
                            <p>{error}</p>
                        )}
                    </div>
                    <div>
                        {addError && (
                            <p>{addError}</p>
                        )}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                        <h5>Available Products</h5>
                        </div>
                        <div>
                        <Link to={'/register'}>
                        <button style={button}>
                            Register
                        </button>
                    </Link>
                    <Link to={'/login'}>
                        <button style={button}>
                            Login
                        </button>
                    </Link>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {allProducts.map((product, i) => (
                            <div key={i}>
                                <ViewProductsCard price={product.price} productName={product.productName} type={product.type} handleAddToCart={handleOpen} />
                            </div>
                        ))}
                        {allProducts.length === 0 && (
                            <p>No products available</p>
                        )}
                    </div>
                </div>
            </div>

            <Modal open={open} backdrop={true} onClose={() => setOpen(false)}>
                <Modal.Title>
                    Login
                </Modal.Title>
                <Modal.Body>
                    Please login or sign up to add product to cart
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => navigate('/login')}>Login</Button>
                    <Button onClick={() => navigate('/register')}>Register</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

const mainDiv = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '50vh',
}

const button = {
    border: 'transparent',
    padding: '10px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px',
    color: 'black'
}

export default Home