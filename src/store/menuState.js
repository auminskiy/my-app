
const menuState = (set, get) => ({
open: false,
toggleOpen: () => set((state) => ({ open: !state.open}))
    
})



export default menuState;

