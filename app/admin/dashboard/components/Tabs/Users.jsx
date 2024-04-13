"use client"
import { supabase } from '@/utils/supabase'
import React, { useEffect, useState } from 'react'
import CouponsListingTable from '../Tables/CouponsListing'
import OrdersListingTable from '../Tables/OrdersListing'
import UsersListingTable from '../Tables/UserListing'

const Users = () => {
  const [couponsData, setCouponsData] = useState()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const getCoupons = async () => {
      const {data,error} = await supabase.from('users').select('*')
      if(error) return;
      setCouponsData(data)
      setLoading(false)
    }
    getCoupons()
  }, [])
  return (
    <>{loading?(<div className="flex mt-[-3rem] w-full h-full justify-center items-center">
    <h1 className="text-2xl font-semibold">Loading...</h1>
  </div>):(<div className="w-full flex">
    <UsersListingTable data={couponsData} />
  </div>)}</>
  )
}

export default Users