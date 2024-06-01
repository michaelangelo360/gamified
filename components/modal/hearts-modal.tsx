"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle, 

} from "@/components/ui/dialog";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {useEffect,useState} from "react"
import { Button } from "../ui/button";
import { useHeartsModal } from "@/store/use-hearts-modal";


export const HeartsModal = ()=>{

const router = useRouter();
const [isClient, setIsClient] = useState(false);
const { isOpen ,close} = useHeartsModal();

useEffect(()=> setIsClient(true), []);
const  onClick = () => {
    close();
    router.push("/store");
}


if (!isClient){
    return null;
 }


 return (
    <Dialog open ={isOpen} onOpenChange={close}>
        <DialogContent className="max-w-md"
        >
            <DialogHeader>
                <div className="flex items-center w-full justify-center mb-5">
                    <Image
                    src = "/mascot_sad.svg"
                    alt="Mascot"
                    height={80}
                    width={80}
                    >

                    </Image>
                </div>
                <DialogTitle>
                   You have runned out of hearts!
                </DialogTitle>
                <DialogDescription>
                    Get Pro for unlimited hearts , or purchase them in the store .
                </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mb-4">
               <div className="flex flex-col gap-y-4 w-full">
                <Button variant="primary"
                className="w-full"
                size="lg"
                onClick={onClick}
                >
                   Get unlimited Hearts
                </Button>
                <Button variant="dangerOutline"
                className="w-full"
                size="lg"
                onClick={close}
                >
                    No Thanks
                </Button>
               </div>
            </DialogFooter>
        </DialogContent>
    </Dialog>
 )
};