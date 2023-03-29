import React from "react";

const Preloader = () => {
    return (
        <div className="text-center preloader">
            <div className="spinner-grow text-danger" role="status">
                <h1 className="loading">Loading...</h1>
            </div>
        </div>
    );
};

export default Preloader;
