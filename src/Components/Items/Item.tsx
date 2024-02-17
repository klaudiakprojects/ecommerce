import React, { ReactNode } from 'react'
import './Item.css'
import { Link } from 'react-router-dom';

export const Item = (props: {
  price: ReactNode; image: string; name: string, id: number
}) => {
  return (
    <div className="item">
      <Link to={`/product/${props.id}`}>
        <img src={props.image} />
        <p>{props.name}</p>
      </Link>

      <div className="item-prices">
        <div className="item-new-price">
          {props.price}
        </div>
      </div>
    </div>
  )
}

export default Item;