import { useAppState } from '@/utils/Context'
import React from 'react'
import Users from './Tabs/Users'
import Orders from './Tabs/Orders'
import Coupons from './Tabs/Coupons'
import Products from './Tabs/Products'
import Reviews from './Tabs/Reviews'
import Preorder from './Tabs/Preorder'

const CentralSection = () => {
  const {state,setState}=useAppState()
  const renderCentralSection=()=>{
    switch(state){
      case "Users":
        return <Users/>
      case "Orders":
        return <Orders/>
      case "Coupons":
        return <Coupons/>
      case "Products":
        return <Products/>
      case "Reviews":
        return <Reviews/>
      case "pre":
        return <Preorder/>
      default:
        return <div>CentralSection</div>
    }
  }
  return (
    <div className='flex dark:bg-[#2a2929] w-full'>
      {renderCentralSection()}
    </div>
  )
}

export default CentralSection