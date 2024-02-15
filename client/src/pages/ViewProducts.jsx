import React, { useEffect, useState } from 'react'
import { api } from '../service/apiService'
import CouponIcon from "@rsuite/icons/Coupon"
import 'rsuite/dist/rsuite.min.css'
import { useNavigate, useParams } from 'react-router-dom'
import "../components/Card/style.css"

const Coupon = ({ size }) => <CouponIcon style={{ fontSize: size, marginRight: 10 }} />;

const ViewProducts = () => {
    const { userId } = useParams()
    const [allProducts, setAllProducts] = useState([])
    const [error, setError] = useState('')
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

    const handleAddToCart = async (id) => {
        console.log(userId)
        try {
            const response = await api.post(`/add-to-cart/${userId}/${id}`)
            if (response.status === 201) {
                // setOpen(false)
                console.log(response)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const goToCart = () => {
        navigate(`/cart/${userId}`)
    }

    return (
        <>
            <div style={mainDiv}>
                <div>
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
                    <div style={subDiv}>
                        <h5>Available Products</h5>
                        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                        <button onClick={goToCart} style={{ backgroundColor: 'transparent' }}>
                        <img width="24" height="24" src="https://img.icons8.com/fluency-systems-regular/24/4D4D4D/shopping-cart--v1.png" alt="shopping-cart--v1"/>
                        </button>
                        <div>
                            <img width="8" height="8" src="https://img.icons8.com/ios-glyphs/8/FA5252/100-percents.png" alt="100-percents"/>
                        </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {allProducts.map((product, i) => (
                            <div key={i}>
                                <div className='card-div'>
                                    <div className='top-div'>
                                        <div className='edit'>
                                        </div>
                                        <div className='image'>
                                            <img width="100" height="100" src="https://img.icons8.com/dusk/100/product.png" alt="product" />
                                        </div>
                                    </div>
                                    <div className='bottom-div'>
                                        <div className='name'>
                                            <div>
                                                <p>{product.productName}</p>
                                            </div>
                                            <div>
                                                <p>{product.type}</p>
                                            </div>
                                        </div>
                                        <div className='price'>
                                            <p>NGN {product.price}</p>
                                        </div>
                                    </div>
                                    <div className='button-div'>
                                        <button onClick={() => handleAddToCart(product._id)}>Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {allProducts.length === 0 && (
                            <p>No products available</p>
                        )}
                    </div>
                </div>
            </div>
        </>
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

const subDiv = {
    display: 'flex',
    justifyContent: 'space-between',
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

export default ViewProducts