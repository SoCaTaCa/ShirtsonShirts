import React, { useState } from "react";
import axios from "axios";

const NewCategoryForm = ({ userToken }) => {
    const [name, setName] = useState('');
    const [categoryExistsError, setCategoryExistsError] = useState(false);

    const addCategory = async (event) => {
        event.preventDefault();
        setCategoryExistsError(false);

        try {
            const _category = await axios.get(`/api/categories/${name}`);
            if (_category.data.success) {
                setCategoryExistsError(true);
            } else {
                const category = await axios.post('/api/categories', { name }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userToken}`
                    }
                });
                if (category.data.success) {
                    setName('');
                };
            };
        } catch (error) {
            console.error(error);
        };
    };

    return (
        <form onSubmit={addCategory} className="mb-3">
            <label htmlFor="category-name" className="form-label">Add a new category:</label>
            <input
                className="form-control"
                id="category-name"
                value={name}
                required
                onChange={(event) => setName(event.target.value)}>
            </input>
            {
                categoryExistsError ?
                    <div id="category-exists-text" className="form-text">
                        That category already exists!
                    </div> :
                    null
            }
            <button
                type="submit"
                className="btn btn-primary"
                disabled={
                    name ?
                        false :
                        true
                }>
                Add Category</button>
        </form>
    );
};

export default NewCategoryForm;