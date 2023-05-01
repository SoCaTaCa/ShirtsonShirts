import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditItemForm = ({ userToken, categories, getCategories, user }) => {
    const [item, setItem] = useState({});
    const [name, setName] = useState('');
    const [size, setSize] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [price, setPrice] = useState(0);
    const [buttonDisabled, setButtonDisabled] = useState(true);

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
        getCategories();
        getItemData();
        setValues();
    }, []);

    useEffect(() => {
        setValues();
    }, [item]);

    useEffect(() => {
        if (item &&
            name && name === item.name &&
            size && size === item.size &&
            categoryId && Number(categoryId) === item.categoryId &&
            description && description === item.description &&
            imageURL && imageURL === item.imageURL &&
            price && Number(price) === item.price) {
            setButtonDisabled(true);
        } else {
            setButtonDisabled(false);
        }
    }, [name, size, categoryId, description, imageURL, price])

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
        <>
            {
                (user.isAdmin) ?
                    <div className='item-form-container'>
                        <form onSubmit={updateItem} className='item-form'>
                            <h1>Edit Product</h1>
                            <div className='form-floating mb-3 item-field'>
                                <input
                                    className='form-control'
                                    id='item-name'
                                    value={name}
                                    required
                                    placeholder='Item Name'
                                    onChange={(event) => setName(event.target.value)}>
                                </input>
                                <label htmlFor='item-name'>Item Name *</label>
                            </div>
                            <div className='form-floating mb-3 item-field'>
                                <input
                                    className='form-control'
                                    id='item-size'
                                    value={size}
                                    maxLength={10}
                                    required
                                    placeholder='Size'
                                    onChange={(event) => setSize(event.target.value)}>
                                </input>
                                <label htmlFor='item-size'>Size *</label>
                            </div>
                            <select
                                className='form-select mb-3'
                                value={categoryId}
                                onChange={(event) => setCategoryId(event.target.value)}>
                                <option value={'0'}>Select Category</option>
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
                            <div className='form-floating mb-3'>
                                <textarea
                                    className='form-control'
                                    id='item-description'
                                    value={description}
                                    rows={2}
                                    required
                                    placeholder='Description'
                                    style={{
                                        height: 100 + 'px'
                                    }}
                                    onChange={(event) => setDescription(event.target.value)}>
                                </textarea>
                                <label htmlFor='item-description'>Description *</label>

                            </div>
                            <div className='form-floating mb-3 item-field'>
                                <input
                                    className='form-control'
                                    id='item-imageURL'
                                    value={imageURL}
                                    required
                                    placeholder='Image URL'
                                    onChange={(event) => setImageURL(event.target.value)}>
                                </input>
                                <label htmlFor='item-imageURL'>Image URL *</label>
                            </div>
                            <div className='form-floating mb-3 item-field'>
                                <input
                                    type='number'
                                    className='form-control'
                                    id='item-price'
                                    value={price}
                                    required
                                    placeholder='Price'
                                    onChange={(event) => setPrice(event.target.value)}>
                                </input>
                                <label htmlFor='item-price'>Price *</label>
                            </div>
                            <button
                                type='submit'
                                className='btn btn-primary item-form-button'
                                disabled={
                                    buttonDisabled ?
                                        true :
                                        false
                                }>Update Item</button>
                        </form>
                    </div> :
                    <h5>You must be an administrator to view this page!</h5>
            }
        </>
    )
};

export default EditItemForm;