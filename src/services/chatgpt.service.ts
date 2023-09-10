import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })



  export const getContent = async (query: string, numberOfContent?: number) =>{

    // if (numberOfContent){
    //     return await openai.chat.completions.create({
    //         model: "gpt-3.5-turbo",
    //         messages: [{"role": "user", "content": query}],
    //         n: numberOfContent
    //       });
    // }

    return await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": query}],
      });

  }