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
        <form onSubmit={addCategory} className="d-flex mb-0 justify-content-center">
            <input
                className="form-control"
                id="category-name"
                value={name}
                required
                placeholder="New Category"
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
                className="btn btn-primary mx-3 new-category-button"
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