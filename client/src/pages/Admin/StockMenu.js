import React from 'react'
import { NavLink } from 'react-router-dom'

const StockMenu = () => {
    return (
        <div className="nav justify-content-center">
              <li class="nav-item">
            <NavLink style={{ textDecoration: 'none' }} className={'nav-link'} to="/dashboard/admin/stock/base"><h3>Base</h3></NavLink>
            </li>
            <li class="nav-item">
            <NavLink style={{ textDecoration: 'none' }} className={'nav-link'} to="/dashboard/admin/stock/sauce"><h3>Sauce</h3></NavLink>
            </li>
            <li class="nav-item">
            <NavLink style={{ textDecoration: 'none' }} className={'nav-link'} to="/dashboard/admin/stock/cheese"><h3>Cheese</h3></NavLink>
            </li>
            <li class="nav-item">
            <NavLink style={{ textDecoration: 'none' }} className={'nav-link'} to="/dashboard/admin/stock/veggies"><h3>Veggies</h3></NavLink>
            </li>
        </div>
    )
}

export default StockMenu
