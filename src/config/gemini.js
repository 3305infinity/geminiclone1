import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  }from "@google/generative-ai"
  const apiKey ="AIzaSyBm0MYZCYAp_5Ef1dQVZHWyjqMeEYhuOHM" ;
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "bard-base",
  });
  async function run(prompt) {
    const generationConfig = {
      temperature: 1,
      topP: 0.8,
      topK: 64,
      maxOutputTokens: 2048,
      //8192
      responseMimeType: "text/plain",
    };
    // const safetySettings=[
    //   {
    //     category:HarmCategory.HARM_CATEGORY_HARASSMENT,
    //     threshold:HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
    //   },
    //   {
        
    //       category:HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    //       threshold:HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
    //   },
    //   {
        
    //       category:HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    //       threshold:HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE
        
    //   },
    //   {      
    //       category:HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    //       threshold:HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE 
    //   }
    // ]
    const chatSession = model.startChat({
      generationConfig,
      history: [
      ],
    });
    const result = await chatSession.sendMessage(prompt);
   const response=result.response;
    console.log(response.text());
    return response.text();
  //   chatSession.sendMessage(prompt)
  //       .then(result => console.log(result.response.text()));
  }
  export default run;






