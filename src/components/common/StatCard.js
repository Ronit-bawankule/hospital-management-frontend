import React from "react";

const StatCard = ({
    title,
    value,
    color
}) => {

    return (

        <div
            className="stat-card"
            style={{
                borderLeft: `6px solid ${color}`
            }}
        >

            <h3>{title}</h3>

            <h2>{value}</h2>

        </div>
    );
};

export default StatCard;