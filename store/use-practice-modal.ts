import {create} from "zustand";

type HeartsModalState = {
    isOpen : boolean;
    open: ()=> void;
    close :() => void;
};


export const usePracticeModal = 
create<HeartsModalState>((set)=>({
    isOpen: false, //TODO change back to false
    open :() =>set({isOpen:true}),
    close: ()=>set({isOpen: false}),
}))