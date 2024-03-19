import React, { useEffect, useState } from 'react'
import { api } from '../service/apiService'
import { useParams } from 'react-router-dom'
import { Panel } from 'rsuite'
import BackButton from '../components/BackButton'

const Cart = () => {
    const { userId } = useParams()
    const [allProducts, setAllProducts] = useState([])
    const [addError, setAddError] = useState('')
    const [product, setProduct] = useState('')

    const getUserCart = async () => {
        const response = await api.get(`/get-cart/${userId}`)
        if (response.status === 200) {
            console.log(response)
            setAllProducts(response.data)
        }
    }

    const handleAddToCart = async (id) => {
        try {
            console.log(id)
            const response = await api.post(`/add-to-cart/${userId}/${id}`)
            if (response.status === 201) {
                return true
            }
        } catch (error) {
            setAddError('An error occured while adding')
            console.log(error)
        }
        return false;
    }

    useEffect(() => {
        getUserCart()
    }, []) 

    const handleIncrease = async (id) => {
        const success = await handleAddToCart(id)
        console.log(success)
        if(success) {
            const updatedProduct = allProducts.map(product => {
                if(product.id === id) {
                    return { ...product, quantity: product.quantity + 1 }
                }
                return product;
            })
            setAllProducts(updatedProduct)
        }
    }

    const handleDecrease = (id) => {
        console.log(id)
    }

    return (
        <div style={mainDiv}>
            <div>
                <BackButton />
                <h5 style={{ textAlign: 'center' }}>Cart</h5>
                {addError && (
                    <div style={{ border: '0.5px solid red', borderRadius: '4px', padding: '6px', marginBottom: '12px' }}>
                        <p style={{ color: 'red' }}>{addError}</p>
                    </div>
                )}
                <br />
                {allProducts.map((product, i) => (
                    <div key={i}>
                        <Panel bordered>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',gap: '20px' }}>
                                <img width="100" height="100" src="https://img.icons8.com/dusk/100/product.png" alt="product" />
                                <div>
                                    <h5>{product.productName}</h5>
                                    {product.quantity}
                                </div>
                                <div>
                                    <button onClick={() => handleIncrease(product.id)}>+</button>
                                    <button onClick={() => handleDecrease(product.id)}>-</button>
                                </div>
                            </div>
                        </Panel>
                        <br />
                    </div>
                ))}
            </div>
        </div >
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

export default Cart