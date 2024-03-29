
import { create } from "zustand";
import createBet from "./createBet";
import createCouponSlice from "./createCouponSlice";
import currentUser from "./currentUser";
import currentBalance from "./currentBalance";
import menuState from "./menuState";


const useStore = create((set, get) => ({
    ...createBet(set, get),
    ...currentUser(set, get),
    ...createCouponSlice(set, get),
    ...currentBalance(set, get),
    ...menuState(set, get),
}));

export default useStore;