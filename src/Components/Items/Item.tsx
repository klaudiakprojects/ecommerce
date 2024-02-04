import React, { ReactNode } from 'react'
import './Item.css'

export const Item = (props: {
    old_price: ReactNode;
    new_price: ReactNode; image: string | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; 
}) => {
  return (
    <div className="item">
        <img src={props.image} />
        <p>{props.name}</p>
        <div className="item-prices">
            <div className="item-new-price">
                {props.new_price}
            </div>
            <div className="item-old-price">
                {props.old_price}
            </div>
        </div>
    </div>
  )
}

export default Item;