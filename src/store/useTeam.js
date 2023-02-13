import { create } from "zustand";



const useTeam = create(set => ({
  
   oddsInfo: [],
    addTeam: (name, price) => set(state => {
      const newTeam = {name, price}
      return { oddsInfo: [...state.oddsInfo, newTeam]}
    }),
    
  })
  )
 
  export default useTeam
