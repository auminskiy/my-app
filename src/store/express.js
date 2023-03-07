import { create } from "zustand";



const express = create(set => ({
  
   oddsInfo: [],
    addTeam: (name, price) => set(state => {
      const newTeam = {name, price}
      return { oddsInfo: [ newTeam]}
    }),
    
  })
  )
export default express

 
   
