import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../service/apiService'
import { ViewProductsCard } from '../components/Card/Card'

const Home = () => {

    const [allProducts, setAllProducts] = useState([])
    const [error, setError] = useState('')
    const [addError, setAddError] = useState('')

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

    const handleAddToCart = async () => {
        try {
            const response = await api.post(`/add-to-cart/${id}`)
            if (response.status === 201) {
                setOpen(false)
                getAllProducts()
                setProductValues({
                    productName: '',
                    type: '',
                    price: 0,
                    quantity: 0
                });
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div style={mainDiv}>
                <div>
                    <h5 style={{ textAlign: 'center' }}>Welcome</h5>
                    <Link to={'/register'}>
                        <button style={button}>
                            Click here to register
                        </button>
                    </Link>
                    <Link to={'/login'}>
                        <button style={button}>
                            Click here to login
                        </button>
                    </Link>
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
                    <div>
                        <h5>Available Products</h5>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {allProducts.map((product, i) => (
                            <div key={i}>
                                <ViewProductsCard price={product.price} productName={product.productName} type={product.type} handleAddToCart={handleAddToCart(product._id)} />
                            </div>
                        ))}
                        {allProducts.length === 0 && (
                            <p>No products available</p>
                        )}
                    </div>
                </div>
            </div>
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
    marginRight: '10px'
}

export default Home