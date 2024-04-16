"use client";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";

type Props = {
    label : string
    iconSrc : string 
    href :string

};

export const SidebarItem = ({
    label,
    iconSrc , 
    href , 
}:Props) => {
    const pathname = usePathname();
    const active = pathname ===href;
    return (
            <Link href ={href}>
        <Button variant={active ? "sidebarOutline":"sidebar"}>
            <Image src={iconSrc} alt={label} className="mr-5" height = {32} width={32}/>
            {label}
        </Button>
            </Link>
    );
}