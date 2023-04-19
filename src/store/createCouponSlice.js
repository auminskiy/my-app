import React from 'react';



const createCouponSlice = (set, get) =>({
   marketInfoList: [],
   addToMarketInfoList: (name, price, point, match) => {
    const newTeam = {name, price, point, match}
    set({
      // marketInfoList: Array.from(new Set(([...get().marketInfoList, newTeam]).map(item => JSON.stringify(item)))).map(item => JSON.parse(item))
      marketInfoList: (Array.from(new Set(([...get().marketInfoList, newTeam]).map(item => JSON.stringify(item)))).map(item => JSON.parse(item))).filter((value, index, self) => self.map(x => x.match).indexOf(value.match) == index)
    })
   },
   removeToMarketInfoList: (name) => {
    set({ 
    marketInfoList: get().marketInfoList.filter(market => market.name != name)
    })
   },
   reset: () => 
    set({
        marketInfoList: [],
    }),
    
 
})

export default createCouponSlice;