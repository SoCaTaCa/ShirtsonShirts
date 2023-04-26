import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllItems = () => {
    const [items, setItems] = useState([]);

    const getItems = async () => {
        try {
            const response = await axios.get('/api/items');
            setItems(response.data.items);
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getItems();
    }, [])

    return (
        <>
            <ul>
                {
                    items.map((item, index) => {
                        return <li key={index}>{item.name}</li>
                    })
                }
            </ul>
        </>
    )
}

export default AllItems;