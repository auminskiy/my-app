import React from 'react';

const createCouponSlice = (set, get) =>({
   marketInfoList: [],
   addToMarketInfoList: (name, price) => {
    const newTeam = {name, price}
    set({
        marketInfoList: Array.from(new Set(([...get().marketInfoList, newTeam]).map(item => JSON.stringify(item)))).map(item => JSON.parse(item))
    })
   },
   removeToMarketInfoList: (name) => {
    set({ 
    marketInfoList: get().marketInfoList.filter(market => market.name != name)
    })
   },
})

export default createCouponSlice;