//const OpenAI = require('openai-api')
//const OPENAI_API_KEY = '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'
//const openai = new OpenAI(OPENAI_API_KEY)
import store from '../store'
const { Configuration, OpenAIApi } = require("openai");
console.log("key="+store.state.gptKey)


export async function chat(){
  const configuration = new Configuration({
    apiKey: store.state.gptKey,
  });
  const openai = new OpenAIApi(configuration);
  return await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: store.state.chatMessages
  })
}