
import { create } from "zustand";
import createBet from "./createBet";
import createOddsSlice from "./createOddsSlice";
import currentUser from "./currentUser";


const useStore = create((set, get) => ({
    ...createOddsSlice(set, get),
    ...createBet(set, get),
    ...currentUser(set, get),
}));

export default useStore;