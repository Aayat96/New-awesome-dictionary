import React from "react";

export default function Footer() {

    const year = new Date().getFullYear();
    return (
        <div className="text-white fs-6 fw-semibold bg-dark mt-5 p-2 text-center">
            <p>&copy; Awsome Dictionary {year}</p>
        </div>
    );
}
