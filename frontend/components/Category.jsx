import Link from 'next/link';
import React from 'react';

const Category = ({ titleStyle }) => {
    return (
        <div className="w-100 d-flex flex-column gap-3">
            {/* Kategori Başlığı */}
            <div className={`fs-4 fw-bold position-relative ps-3 ${titleStyle}`}>
                <span className="position-absolute start-0 top-0 bottom-0 bg-primary" style={{ width: "4px" }}></span>
                Kategori
            </div>

            {/* Kategori Listesi */}
            <ul className={`list-unstyled d-flex flex-column text-dark fw-semibold gap-2 ${titleStyle}`}>
                {[1, 2, 3, 4, 5, 6].map((item, i) => (
                    <li key={i}>
                        <Link href="/" className="text-decoration-none text-dark">
                            Kategori (5)
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Category;
