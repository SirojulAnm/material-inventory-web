import React from 'react';

function Home() {
    return (
        <div className="container">
            <div className="row justify-content-center align-items-center mt-3 d-flex">
                <div className="col text-center">
                    <h5>Welcome To Material Inventory System (MIS)</h5>
                    <img
                        src="http://localhost:8000/images/diagram.png" // Replace with the actual path to your image
                        className="img-fluid rounded mt-3 mb-5"
                        alt="Diagram Material Inventory System"
                    />
                </div>
            </div>
        </div>
    );
}

export default Home;