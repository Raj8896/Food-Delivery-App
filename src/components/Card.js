import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useCart } from './Reducer';
export default function Card(props) {
    let dispatch = useDispatch();
    let data = useCart();
    const priceRef = useRef();
    let options = props.options;
    let priceOptions = Object.keys(options);
    const [qty, setQty] = useState(1)
    const [size, setSize] = useState("")

    const handleAddtoCart = async () => {
        let food = []
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;

                break;
            }
        }
        if (food !== []) {
            if (food.size === size) {
              await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
              return
            }
        }
        else if (food.size !== size) {
            await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
            return
          }
          await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
    }
    let finalPrice = qty * parseInt(options[size]);
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])
    return (
        <div>
            <div className="card mt-3" style={{ "width": "17rem", "maxHeight": "420px" }}>
                <img src={props.foodItem.img} className="card-img-top" style={{ height: "100px", objectFit: "fill" }} alt="..."></img>
                <div className="card-body">
                    <h5 className="card-title">{props.foodItem.name} </h5>
                    <p className="card-text">{props.foodItem.description}</p>
                    <div className='container w-100'>
                        <select className='m-2 h-100  bg-success' onChange={(e) => setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })

                            }
                        </select>
                        <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                            {priceOptions.map((i) => {
                                return <option key={i} value={i} >{i}</option>
                            })}
                        </select>
                        <div className='d-inline h-100 fs-5'>
                            ₹{finalPrice}/-
                        </div>
                    </div>
                    <hr />
                    <button className='btn btn-success justify-center mx-2' onClick={handleAddtoCart}>Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}
