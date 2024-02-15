import React, { useEffect, useState } from 'react'
import { api } from '../service/apiService'
import { useParams } from 'react-router-dom'
import { Panel } from 'rsuite'

const Cart = () => {
    const { userId } = useParams()
    const [allProducts, setAllProducts] = useState([])
    const [product, setProduct] = useState('')

    const getUserCart = async () => {
        const response = await api.get(`/get-cart/${userId}`)
        if (response.status === 200) {
            console.log(response)
            setAllProducts(response.data)
        }
    }

    useEffect(() => {
        getUserCart()
    }, [])

    const handleIncrease = (id) => {
        console.log(id)
    }

    const handleDecrease = (id) => {
        console.log(id)
    }

    return (
        <div style={mainDiv}>
            <div>
                <h5>Cart</h5>
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