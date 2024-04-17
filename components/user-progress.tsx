import Link from "next/link";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import { Infinity,InfinityIcon } from "lucide-react";
import { courses } from "@/db/schema";

type Props = {
    activeCourse: typeof courses.$inferSelect  ;
    hearts: number;
    points: number;
    hasActiveSubscription: boolean;
}

export const UserProgress1 = ({activeCourse,points ,hasActiveSubscription, hearts}:Props) => {

    return(
        <div className="flex items-center justify-between gap-x-2 w-full">
           <Link href="/courses">
            <Button>
                <Image src={activeCourse.imageSrc} alt={activeCourse.title} className="rounded-md border " width={32} height={32}></Image> 
              </Button>
            <Link href="/shop">
             <Button variant="ghost" className="text-orange-500">
                <Image src="/points.svg" height={28} width ={28} alt="Points" className="mr-2"></Image>
                {points}

             </Button>

            </Link>
            <Link href="/shop">
             <Button variant="ghost" className="text-orange-500">
                <Image src="/heart.svg" height={22} width ={22} alt="heart" className="mr-2"></Image>
                {hasActiveSubscription ? <InfinityIcon className="h-4 w-4 stroke-[3]"/>: hearts}

             </Button>

            </Link>
           </Link>
        </div>
    );
}