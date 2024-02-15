import React, { useEffect, useState } from 'react'
import { Button, Form, Input, InputGroup, Modal } from 'rsuite'
import { api } from '../service/apiService'

import 'rsuite/dist/rsuite.min.css'
import FormControlLabel from 'rsuite/esm/FormControlLabel'
import InputGroupAddon from 'rsuite/esm/InputGroup/InputGroupAddon'
import { ProductListCard } from '../components/Card/Card'

const ProductList = () => {
    const [productValues, setProductValues] = useState({
        productName: '',
        type: '',
        price: 0,
        quantity: 0
    })
    const [allProducts, setAllProducts] = useState([])
    const [error, setError] = useState('')
    const [open, setOpen] = useState(false)

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

    const addProduct = async () => {
        try {
            const response = await api.post('/add-product', productValues)
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

    const handleAddProduct = () => {
        setOpen(true)
    }

    const handleInputChange = (name, value) => {
        setProductValues({
            ...productValues,
            [name]: value
        });
    };

    return (
        <>
            <div style={mainDiv}>
                <div>
                    <div>
                        {error && (
                            <p>{error}</p>
                        )}
                    </div>
                    <div style={subDiv}>
                        <h5>Products List</h5>
                        <div>
                            <button onClick={handleAddProduct} style={button}>Add new product</button>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {allProducts.map((product, i) => (
                        <div key={i}>
                            <ProductListCard price={product.price} productName={product.productName} type={product.type} quantity={product.quantity} />
                        </div>
                    ))}
                    {allProducts.length === 0 && (
                        <p>No products available</p>
                    )}
                    </div>
                </div>
            </div>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Modal.Title>Add new product</Modal.Title>
                <Modal.Body>
                    <Form>
                        <FormControlLabel htmlFor='productName'>Product name</FormControlLabel>
                        <InputGroup>
                            <Input
                                type='text'
                                name='productName'
                                id='productName'
                                placeholder='Enter product name'
                                value={productValues.productName}
                                onChange={(value) => handleInputChange('productName', value)}
                            />
                        </InputGroup>
                        <br />
                        <FormControlLabel htmlFor='type'>Product type</FormControlLabel>
                        <InputGroup>
                            <Input
                                type='text'
                                name='type'
                                id='type'
                                placeholder='Enter product type'
                                value={productValues.type}
                                onChange={(value) => handleInputChange('type', value)}
                            />
                        </InputGroup>
                        <br />
                        <FormControlLabel htmlFor='price'>Price</FormControlLabel>
                        <InputGroup>
                            <InputGroupAddon>NGN</InputGroupAddon>
                            <Input
                                type='number'
                                id='price'
                                name='price'
                                placeholder='Enter product price'
                                value={productValues.price}
                                onChange={(value) => handleInputChange('price', value)}
                            />
                        </InputGroup>
                        <br />
                        <FormControlLabel htmlFor='quantity'>Quantity</FormControlLabel>
                        <InputGroup>
                            <Input
                                type='number'
                                id='quantity'
                                name='quantity'
                                placeholder='Enter available quantity'
                                value={productValues.quantity}
                                onChange={(value) => handleInputChange('quantity', value)}
                            />
                        </InputGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button appearance='primary' onClick={addProduct}>Add</Button>
                    <Button appearance='subtle' onClick={() => setOpen(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
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

export default ProductList