"use client"
import Image from "next/image";

import Confetti from "react-confetti";
import { Challenge } from "./challenge";
import { challengeOptions , challenges} from "@/db/schema";
import { useAudio ,useWindowSize , useMount} from "react-use";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Header } from "./header";
import { QuestionBubble } from "./question-bubble";
 import { Footer } from "./footer";
import { upsertChallengeProgress } from "@/actions/challenge_progress";
import { reduceHearts } from "@/actions/user-progress";
import { ResultCard } from "./results-card";
import { useRouter } from "next/navigation";
import { useHeartsModal } from "@/store/use-hearts-modal";
import { usePracticeModal } from "@/store/use-practice-modal";
type Props ={


    initialPercentage : number;
    initialHearts : number ;
    initialLessonId: number ;
    initialLessonChallenges: (typeof challenges.$inferSelect &{
        completed :boolean;
        challengeOptions: typeof challengeOptions.$inferSelect[];
    })[];
    userSubscription : any 
 };


 export const Quiz = ({
    initialPercentage ,
    initialHearts ,
    initialLessonId,
    initialLessonChallenges,
    userSubscription
 } :Props)=>{


   const {open: openHeartsModal} = useHeartsModal();
   const {open: openPracticeModal} = usePracticeModal();
   useMount(()=>{
      if (initialPercentage ===100){
         openPracticeModal();
      }
   })
const {width, height} = useWindowSize();   
   const router = useRouter();


   const [finishAudio] =useAudio({src:"/finish.mp3", autoPlay:true})
   const [
      correctAudio,
      _c,
      correctControls,


   ]=useAudio({src:"/correct.wav"});


   const [
      incorrectAudio,
      _i,
      incorrectControls,


   ]=useAudio({src:"/incorrect.wav"});

   const [lessonId] =useState(initialLessonId);
   const [pending,startTransition ] = useTransition();
    const [hearts, setHearts]= useState(initialHearts);
    const [percentage, setPercentage] = useState(initialPercentage);
    const [status,setStatus] = useState<"correct" | "wrong" |"none">("none"); //remember to change back to "none"
    const [challenges] = useState(initialLessonChallenges);
    const [activeIndex, setActiveIndex] = useState(()=>{
        const uncompletedIndex = challenges.findIndex((challenge)=> !challenge.completed);
        return uncompletedIndex ===-1 ? 0 : uncompletedIndex;
    });

    const [selectedOption,setSelectedOption] = useState<number>();
    const challenge = challenges [activeIndex];
    const options = challenge?.challengeOptions ?? [];

    const onNext =()=> {
        setActiveIndex((current)=>current+1);
       };

    

    const onSelect =(id:number )=>{
    if (status !=="none") return;

    setSelectedOption(id);
    };

    const onContinue = () =>  {

      console.log("oncontinue called")
    if(!selectedOption) return ;

    if (status ==="wrong"){
    setStatus ("none");
    setSelectedOption(undefined);
    return ;

    }
    if (status === "correct"){

    onNext();
    setStatus("none");
    setSelectedOption(undefined);
    return;
     }
 
     const correctOption =options.find((option)=>option.correct);

   if (!correctOption){
      return ;
   }

    if ( correctOption.id ===selectedOption){
    startTransition(() =>{

      upsertChallengeProgress(challenge.id)
      .then((response ) =>{
         if (response?.error==="hearts"){
            openHeartsModal();
            return;
         }

         correctControls.play()
         setStatus("correct");
         setPercentage((prev) => prev+100 /challenges.length);

         if( initialPercentage===100){
            setHearts((prev)=>Math.min(prev+1, 5 ))
         }
      })
    })
    }else {
    startTransition(()=>{
      reduceHearts(challenge.id)
      .then ((response)=>{
         if (response?.error ==="hearts"){
            openHeartsModal();
            return ;
         }


         incorrectControls.play()
         setStatus("wrong");

         if (!response?.error){

            setHearts((prev)=>Math.max(prev-1,0));
         }
      })
      .catch(()=> toast.error("something went wrong . Please try again"))
    })
    }

    };

   if (!challenge) {
      return(
         <>
         {finishAudio}
         <Confetti
         width={width}
         height={height}
         recycle ={false}
         numberOfPieces={500}
         tweenDuration = {10000}
         
         />
         <div  className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
         <Image  
         src="/finish.svg"
         alt="Finish"
         className="block lg:hidden"
         height={50}
         width={50} 
         ></Image>
            <h1>
               Great Job! <br/> You&apos;ve completed the lesson.
            </h1>
            <ResultCard 
            variant= "points"
            value={ challenges.length*10}
            
            >

            </ResultCard>
            
            <ResultCard 
            variant= "hearts"
            value={ hearts}
            
            >

            </ResultCard>
            </div> 
            <Footer
            lessonId ={lessonId}
            status="completed"
            onCheck={()=>{

               router.push("/learn")
            }}
            >

            </Footer>
         </>
      );

   }

    const title = challenge.type ==="ASSIST"
    ?"Select the correct meaning"
    :challenge.question;
    
    
    return(
        <>

        {incorrectAudio}
        {correctAudio}
        <Header

        hearts = {hearts}
        percentage = {percentage}
        hasActiveSubscription = {!!userSubscription?.isActive}
        
        />
        <div className="flex-1">
         <div className="h-full flex items-center justify-center">
            <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12" >
                <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700" >
                  {title}
                </h1>

               <div>
                
                {// changes done
                challenge.type==="ASSIST"&&(
                    <QuestionBubble question={challenge.question}/>
                )}
                <Challenge
                options = {options}
                onSelect ={onSelect}
            status ={status}   
                selectedOption ={selectedOption}
                disabled = {pending}
                type ={challenge.type}

                />
                </div> 
            </div>

         </div>
        </div>  
        <Footer 
        disabled ={pending || !selectedOption} 
        status={ status}
        onCheck={onContinue}
        ></Footer>
        </>
    )
}