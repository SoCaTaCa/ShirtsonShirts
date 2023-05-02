import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewItemForm = ({ userToken, categories, getCategories, user }) => {
    const [name, setName] = useState('');
    const [size, setSize] = useState('');
    const [categoryId, setCategoryId] = useState(0);
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [price, setPrice] = useState(0);

    useEffect(() => {
        getCategories();
    }, []);

    const createNewItem = async (event) => {
        event.preventDefault();

        const newItemData = {
            name,
            size,
            description,
            categoryId,
            price,
            imageURL
        };

        const newItem = await axios.post('/api/items', newItemData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        });

        if (newItem) {
            setName('');
            setSize('');
            setDescription('');
            setCategoryId(0);
            setImageURL('');
            setPrice('');
        };
    };

    return (
        <>
            {
                (user.isAdmin) ?
                    <div className='item-form-container'>
                        <form onSubmit={createNewItem} className='item-form'>
                            <h1>New Product</h1>
                            <div className='form-floating mb-3 item-field'>
                                <input
                                    className='form-control'
                                    id='item-name'
                                    value={name}
                                    required
                                    placeholder="ayowtf"
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
                                    placeholder="Size"
                                    onChange={(event) => setSize(event.target.value)}>
                                </input>
                                <label htmlFor='item-size'>Size *</label>
                            </div>
                            <select
                                className='form-select mb-3 item-field'
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
                            <div className='form-floating mb-3'>
                                <textarea
                                    className='form-control'
                                    id='item-description'
                                    value={description}
                                    required
                                    rows={5}
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
                                    onChange={(event) => setPrice(event.target.value)}>
                                </input>
                                <label htmlFor='item-price'>Price *</label>
                            </div>
                            <button
                                type='submit'
                                className='btn btn-primary item-form-button'
                                disabled={
                                    name && description && price && categoryId && description ?
                                        false :
                                        true
                                }>Create New Item</button>
                        </form>
                    </div > :
                    <div className='admin-warning'>
                        <h2>Access Denied</h2>
                        <h3>You must be an administrator to view this page!</h3>
                    </div>
            }
        </>
    );
};

export default NewItemForm;