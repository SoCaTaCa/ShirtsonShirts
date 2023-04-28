import React from "react";

const CategoryCard = ({ category }) => {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{category.name}</h5>
            </div>
        </div>
    );
};

export default CategoryCard;