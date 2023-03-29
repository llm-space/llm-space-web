import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import type {
  ChatCompletionRequestMessage,
  ChatCompletionRequestMessageRoleEnum,
  CreateChatCompletionRequest,
} from 'openai';
import { Configuration, OpenAIApi } from 'openai';

import type { Message } from '@/core';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

app.post('/api/openai/chat/completion', async (req, res) => {
  const completionReq: CreateChatCompletionRequest = {
    model: 'gpt-3.5-turbo',
    messages: (req.body.messages as Message[]).map(convertMessageToChatCompletionRequestMessage),
  };
  if (req.query.stream === 'true') {
    const partialCompletionRes = await openai.createChatCompletion(
      {
        ...completionReq,
        stream: true,
      },
      {
        responseType: 'stream',
      }
    );
    // @ts-ignore
    partialCompletionRes.data.on('data', (data: ReadableStream) => {
      const chunks = data
        .toString()
        .trim()
        .split('\n\n')
        .map((l) => l.trim().split('data: ')[1]);
      chunks.forEach((chunk) => {
        if (chunk === '[DONE]') {
          res.end('data: [DONE]\n\n');
        } else {
          const json = JSON.parse(chunk);
          if (json.choices[0].delta.content) {
            const content = json.choices[0].delta.content;
            res.write(`data: ${content}\n\n`);
          }
        }
      });
    });
    res.type('text/event-stream');
  } else {
    const completionRes = await openai.createChatCompletion({
      ...completionReq,
    });
    res.end(completionRes.data.choices[0].message?.content);
  }
});

app.listen(3000, () => {
  console.log('LLMSpace server is now running at port 3000.');
});

function convertMessageToChatCompletionRequestMessage(message: Message): ChatCompletionRequestMessage {
  return {
    role: message.sender.role as ChatCompletionRequestMessageRoleEnum,
    content: message.content,
  };
}
