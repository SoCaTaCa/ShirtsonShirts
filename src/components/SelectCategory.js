import axios from "axios";
import React, { useEffect, useState } from "react";

const SelectCategory = ({ categories, setItems, getItems }) => {
    const [categoryId, setCategoryId] = useState('');

    // Add the following line to Products component, above the call for AllItems
    // AFTER moving getItems function etc... (ticket #200)
    // <SelectCategory categories={categories} setItems={setItems} getItems={getItems} />

    const filterByCategory = async () => {
        try {
            if (categoryId !== '0') {
                const items = await axios.get(`/api/items/category/${categoryId}`);
                if (items.data.success) {
                    setItems(items.data.items);
                };
            } else {
                getItems();
            }
        } catch (error) {
            console.error(error);
        };
    };

    useEffect(() => {
        filterByCategory();
    }, [categoryId]);

    return (
        <select
            className="form-select"
            aria-label="category selection"
            defaultValue={0}
            onChange={(event) => setCategoryId(event.target.value)}>
            <option value={0}>All categories</option>
            {
                categories.map((category) => {
                    return <option value={category.id} key={category.id}>{category.name}</option>
                })
            }
        </select>
    );
};

export default SelectCategory;