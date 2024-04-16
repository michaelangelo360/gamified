import {Sidebar} from "@/components/ui/sidebar";
import { MobileHeader } from "@/components/ui/mobile-header";
type Props ={
    children:React.ReactNode;
};

const MainLayout = ({
    children ,
}: Props) =>{

    return(
        <>
        <MobileHeader></MobileHeader>
        <Sidebar className="hidden lg:flex"/>
        <main className="lg:pl-[256px]  h-full pt-[50px] lg:pt-0">
            <div className="  h-full">


            {children}
            </div>
        </main>
        </>
    );

};

export default MainLayout;