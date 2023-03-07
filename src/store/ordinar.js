import { create } from "zustand";
 
const ordinar = create((set, get) => ({
  
    oddsInfo: [],
     addTeam: (name, price) => set(state => {
       const newTeam = {name, price}
       return { oddsInfo: [...new Set([...state.oddsInfo, newTeam])]}
      
     }),

     addMarketInfo: (newTeam) => {
        set({
            marketList: [...new Set([...get().oddsInfo, newTeam])]
        })
     }
     
   })
   )
   export default ordinar;