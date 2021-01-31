import React, { useState, useEffect } from 'react'
import { useStateValue } from "../Context/ContextProvider";
import { db } from '../../firebase';
import Order from './Order';
import './Orders.css'

const Orders = () => {
    const [{ user }, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user) {
            db.collection('users').doc(user?.uid).collection('orders')
                .orderBy('created', 'desc').onSnapshot(snapshot =>
                    setOrders(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    }))))
        } else {
            setOrders([]);
        }

    }, [])
    return (
        <div className="orders">
            <h2 className="orders__header">Your orders</h2>

            <div className="orders__orderItem">
                {orders.map(item => (<Order orderData={item} />))}
            </div>        
            </div>
    )
}

export default Orders
