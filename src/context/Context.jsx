import { createContext ,useState} from "react";
import run from "../config/gemini";
export const Context=createContext();
const ContextProvider=(props)=>{
    const [input,setInput]=useState("");
    const [recentPrompt,setRecentPrompt]=useState("");
    const [prevPrompt,setPrevPrompt]=useState([]);
    const [showResult,setShowResult]=useState(false);
    const [loading,setLoading]=useState(false);
    const [resultData,setResultData]=useState("");
     const delayPara=(index,nextWord)=>{
        setTimeout(function(){
               setResultData(prev=>prev+nextWord)
        },75*index)
    }
    const onSent=async(prompt)=>{
        setResultData("")
        setLoading(true)
        setShowResult(true)
        setRecentPrompt(input)
        setPrevPrompt(prev=>[...prev,input])
      const result=await run(input)
      let responseArray=result.split("**")
      let newArray="";
for(let i=0;i<responseArray.length;i++)
  {
    if(i===0|| i%2===0)
      {
         newArray=newArray+responseArray[i];
      }
      else{
        newArray=newArray+"<b>"+responseArray[i]+"</b>";
      }
  }
  let newArray2=newArray.split("*").join("</br>")
  let newResponseArray=newArray2.split(" ")
  for(let i=0;i<newResponseArray.length;i++){
    const nextWord=newResponseArray[i];
    delayPara(i,nextWord)
  }
  setPrevPrompt(input)
      setResultData(newArray2)
      setLoading(false)
      setInput("")

    }
    // const onSent = async (prompt) => {
    //     try {
    //       const response = await run(prompt);
    //       // Update context with response and set showResult to true
    //     } catch (error) {
    //       console.error("Error generating response:", error);
    //       // Display user-friendly error message (e.g., "An error occurred. Please try again later.")
    //     }
    //   };
    //   onSent("what is react")
    // const onSent = useCallback(async (prompt) => {
    //     setResultData("");
    //     setShowResult(true);
    //     const result = await run(input);
    //     setResultData(result);
    //     setInput("");
    //   }, [input, setResultData, setShowResult, setInput]);

    const contextValue=
    {
        input,setInput,
        onSent,
        recentPrompt,setRecentPrompt,
        prevPrompt,setPrevPrompt,
        showResult,setShowResult,
        loading,setLoading,
        resultData,setResultData
    }
    
    return(
        <ContextProvider value={contextValue} >
            {props.children}
        </ContextProvider>
    )
}
export default ContextProvider;
