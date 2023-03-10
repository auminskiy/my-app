
import { create } from "zustand";
import createBet from "./createBet";
import createCouponSlice from "./createCouponSlice";
import createOddsSlice from "./createOddsSlice";
import currentUser from "./currentUser";


const useStore = create((set, get) => ({
    ...createOddsSlice(set, get),
    ...createBet(set, get),
    ...currentUser(set, get),
    ...createCouponSlice(set, get),
}));

export default useStore;