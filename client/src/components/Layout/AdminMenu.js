import React from 'react'
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
    return (
        <>
            <div className='text-center m-3 p-3'>
                <div className='list-group'>
                    <h4>Admin Pannel</h4>
                    <NavLink to="/dashboard/admin/add-category" className="list-group-item list-group-item-action" aria-current="true">
                        Add Category
                    </NavLink>
                    <NavLink to="/dashboard/admin/add-product" className="list-group-item list-group-item-action">Add Product</NavLink>
                    <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action">Products</NavLink>
                    <NavLink to="/dashboard/admin/add-stock" className="list-group-item list-group-item-action">Stock</NavLink>
                    <NavLink to="/dashboard/admin/orders" className="list-group-item list-group-item-action">Orders</NavLink>
                    <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">Users</NavLink>
                </div>
            </div>
        </>
    );
};

export default AdminMenu
