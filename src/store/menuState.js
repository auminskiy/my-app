
const menuState = (set, get) => ({
open: false,
toggleOpen: () => set((state) => ({ open: !state.open})),
anchorElMenu: null,
setAnchorElMenu: () => set((state) => ({ anchorElMenu: !state.anchorElMenu})),
   
})



export default menuState;
