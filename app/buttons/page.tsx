import {Button} from "@/components/ui/button";

const ButtonsPage =()=>{
return(
    <div>
        <div className="p-4 space-y-4 flex flex-col max-w-[200px]">
            <Button>
                Default
            </Button>
            <Button variant="primary">
                Primary 
            </Button>
            <Button variant="primaryOutline">
                Primary Outline
            </Button>
            <Button variant="Secondary">
                Secondary
            </Button>
            <Button variant="SecondaryOutline">
                Secondary Outline
            </Button>
            <Button variant="danger">
                Danger
            </Button>
            <Button variant="dangerOutline">
                Danger Outline
            </Button>
            <Button variant="super">
                Super
            </Button>
            <Button variant="superOutline">
                Super Outline
            </Button>
            <Button variant="ghost">
                Ghost
            </Button>

            <Button variant="sidebar">
                Side Bar
            </Button>
            <Button variant="sidebarOutline">
                Side Bar Outline
            </Button>
            
        </div>
    </div>
);
};

export default ButtonsPage;