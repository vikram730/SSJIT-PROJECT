import React from 'react'
import Common, { getUser , getToken } from '../Common/Common'

const Dashboard = () => {

   const user = JSON.parse(getUser());


   return (
        <div>
          Hello {user.name} !!!
        </div>
    )
}

export default Dashboard
