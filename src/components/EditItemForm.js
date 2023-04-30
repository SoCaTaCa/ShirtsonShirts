import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditItemForm = ({ userToken }) => {
    const [item, setItem] = useState({});
    const [name, setName] = useState('');
    const [size, setSize] = useState('');
    const [categoryId, setCategoryId] = useState(0);
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [price, setPrice] = useState(0);
    const [categories, setCategories] = useState([]);

    const { itemId } = useParams();

    const getItemData = async () => {
        try {
            const itemResponse = await axios.get(`/api/items/${itemId}`);
            setItem(itemResponse.data.item);
        } catch (error) {
            console.error(error);
        };
    };

    const setValues = () => {
        if (item && Object.keys(item).length) {
            setName(item.name)
            setSize(item.size);
            setCategoryId(item.categoryId);
            setDescription(item.description);
            setPrice(item.price);
            setImageURL(item.imageURL);

            if (item.imageURL) {
                setImageURL(item.imageURL);
            };
        };
    };

    useEffect(() => {
        const getCategories = async () => {
            try {
                const categories = await axios.get('/api/categories');
                if (categories.data.success) {
                    setCategories(categories.data.categories);
                };
            } catch (error) {
                console.error(error);
            };
        };

        getCategories();
        getItemData();
        setValues();
    }, []);

    useEffect(() => {
        setValues();
    }, [item]);

    const updateItem = async (event) => {
        event.preventDefault();
        if (item) {
            if (name === item.name &&
                size === item.size &&
                description === item.description &&
                categoryId === item.categoryId &&
                price === item.price &&
                imageURL === item.imageURL) {
                return;
            };
        };

        const updatedItemData = {
            name,
            size,
            description,
            categoryId,
            price,
            imageURL
        };

        const updatedItem = await axios.patch(`/api/items/${itemId}`, updatedItemData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        });

        if (updatedItem) {
            getItemData();
            setValues();
        };
    };

    return (
        <form onSubmit={updateItem}>
            <div className='mb-3'>
                <label htmlFor='item-name' className='form-label'>Item Name *</label>
                <input
                    className='form-control'
                    id='item-name'
                    value={name}
                    required
                    onChange={(event) => setName(event.target.value)}>
                </input>
            </div>
            <div className='mb-3'>
                <label htmlFor='item-size' className='form-label'>Size *</label>
                <input
                    className='form-control'
                    id='item-size'
                    value={size}
                    maxLength={10}
                    required
                    onChange={(event) => setSize(event.target.value)}>
                </input>
            </div>
            <select
                className='form-select'
                onChange={(event) => setCategoryId(event.target.value)}>
                <option value={0}>Select Category</option>
                {
                    categories.length ?
                        categories.map((category, idx) => {
                            return (
                                <option value={category.id} key={idx}>{category.name}</option>
                            )
                        }) :
                        null
                }
            </select>
            <div className='mb-3'>
                <label htmlFor='item-description' className='form-label'>Description *</label>
                <input
                    className='form-control'
                    id='item-description'
                    value={description}
                    required
                    onChange={(event) => setDescription(event.target.value)}>
                </input>
            </div>
            <div className='mb-3'>
                <label htmlFor='item-imageURL' className='form-label'>Image URL *</label>
                <input
                    className='form-control'
                    id='item-imageURL'
                    value={imageURL}
                    required
                    onChange={(event) => setImageURL(event.target.value)}>
                </input>
            </div>
            <div className='mb-3'>
                <label htmlFor='item-price' className='form-label'>Price *</label>
                <input
                    type='number'
                    className='form-control'
                    id='item-price'
                    value={price}
                    required
                    onChange={(event) => setPrice(event.target.value)}>
                </input>
            </div>
            <button
                type='submit'
                className='btn btn-primary'
                disabled={
                    name && description && price && categoryId && description ?
                        false :
                        true
                }>Update Item</button>
        </form>
    )
};

export default EditItemForm;