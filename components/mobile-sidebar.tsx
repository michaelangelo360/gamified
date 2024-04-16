import {
    Sheet ,
    SheetContent,
    SheetTrigger
 } from "@/components/ui/sheet";

 import { Sidebar } from "@/components/ui/sidebar";
 import { Menu } from "lucide-react";

 export const MobileSideBar = ( ) => {

    return(
        <Sheet>
            <SheetTrigger>
                <Menu className=" text-white"></Menu>
            </SheetTrigger>
            <SheetContent className="p-0 z-[100]" side ="left">
                <Sidebar></Sidebar>
            </SheetContent>
        </Sheet>
    )
 }