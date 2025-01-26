import express from 'express';
//
import { anthropic } from '../configs/anthropic.config.js';
//
import {
  DEFAULT_TEMPLATE_PROMPT,
  BEAUTIFY_PROMPT,
} from '../utils/defaultPrompts.js';
import { getSystemPrompt } from '../utils/systemPrompt.js';

const anthropicRouter = express.Router();

anthropicRouter.post('/template', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt || typeof prompt !== 'string') {
      res.status(400).json({
        success: false,
        message: 'Invalid prompt',
      });
      return;
    }
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 200,
      temperature: 0,
      system:
        "Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra.",
      messages: [{ role: 'user', content: prompt }],
    });
    if (!response) {
      throw new Error('Issue with LLM');
    }
    const answer = response.content[0].text; //react or node
    res.status(200).json({
      success: true,
      message: 'Prompt received',
      data: {
        answer,
      },
    });
  } catch (error) {
    console.log('error in template controller', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

anthropicRouter.post('/chat', async (req, res) => {
  try {
    const { mainPrompt } = req.body;
    if (!mainPrompt || typeof mainPrompt !== 'string') {
      res.status(400).json({
        success: false,
        message: 'Invalid prompt',
      });
      return;
    }
    await anthropic.messages
      .stream({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 4096,
        temperature: 0,
        system: getSystemPrompt(),
        messages: [
          { role: 'user', content: BEAUTIFY_PROMPT },
          { role: 'user', content: DEFAULT_TEMPLATE_PROMPT },
          { role: 'user', content: mainPrompt },
        ],
      })
      .on('text', (response) => {
        console.log(response);
      });
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log('error in template controller', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

export default anthropicRouter;
