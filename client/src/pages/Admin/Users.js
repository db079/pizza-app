import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'

const Users = () => {
    return (
        <Layout title={'pizzapp - all users'}>
            <div className='m-3 p-3'>
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>All users</h1>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Users
