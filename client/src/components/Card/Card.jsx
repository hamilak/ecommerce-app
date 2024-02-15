import React from 'react'
import './style.css'
import EditIcon from '@rsuite/icons/Edit'
import TrashIcon from '@rsuite/icons/Trash'

export const ProductListCard = ({ productName, price, type, quantity }) => {
  return (
    <div className='card-div'>
      <div className='top-div'>
        <div className='edit'>
          <button><EditIcon /></button>
          <button><TrashIcon /></button>
        </div>
        <div className='image'>
          <img width="100" height="100" src="https://img.icons8.com/dusk/100/product.png" alt="product" />
        </div>
      </div>
      <div className='bottom-div'>
        <div className='name'>
          <div>
            <p>{productName}</p>
          </div>
          <div>
            <p>{type}</p>
          </div>
        </div>
        <div className='qty'>
            <p>Qty: {quantity}</p> 
        </div>
        <div className='price'>
          <p>NGN {price}</p>
        </div>
      </div>
    </div>
  )
}

export const ViewProductsCard = ({ productName, price, type, quantity, handleAddToCart }) => {
  return (
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
            <p>{productName}</p>
          </div>
          <div>
            <p>{type}</p>
          </div>
        </div>
        <div className='qty'>
          {quantity && (
            <p>Qty: {quantity}</p>
          )}   
        </div>
        <div className='price'>
          <p>NGN {price}</p>
        </div>
      </div>
      <div className='button-div'>
        <button onClick={handleAddToCart}>Add to cart</button>
      </div>
    </div>
  )
}