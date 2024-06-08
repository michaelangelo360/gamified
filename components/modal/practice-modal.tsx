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
import { usePracticeModal } from "@/store/use-practice-modal";


export const PracticeModal = ()=>{


const [isClient, setIsClient] = useState(false);
const { isOpen ,close} = usePracticeModal();

useEffect(()=> setIsClient(true), []);


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
                    src = "/heart.svg"
                    alt="Heart"
                    height={80}
                    width={80}
                    >

                    </Image>
                </div>
                <DialogTitle>
                   Practice Lessons
                </DialogTitle>
                <DialogDescription>
                    Use practice lessons to regain hearts and points , You cannot lose hearts or points in practice lessons
                </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mb-4">
               <div className="flex flex-col gap-y-4 w-full">
               
                <Button variant="dangerOutline"
                className="w-full"
                size="lg"
                onClick={close}
                >
                  I understand
                </Button>
               </div>
            </DialogFooter>
        </DialogContent>
    </Dialog>
 )
};