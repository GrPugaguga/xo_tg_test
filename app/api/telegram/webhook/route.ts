import { Telegraf } from 'telegraf';
import { NextRequest, NextResponse } from 'next/server';

const token = process.env.TELEGRAM_BOT_TOKEN;
const webAppUrl = process.env.WEB_APP_URL;

if (!token) {
  throw new Error('TELEGRAM_BOT_TOKEN not found in environment variables.');
}
if (!webAppUrl) {
  throw new Error('WEB_APP_URL not found in environment variables.');
}

const bot = new Telegraf(token);

bot.start((ctx) => {
  const text = 'Давайте сыграем, чтобы получить промокод!';
  
  return ctx.reply(text, {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Играть!', web_app: { url: webAppUrl } }],
      ],
    },
  });
});


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    await bot.handleUpdate(body);
    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Error handling Telegram update:', error);
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }
}
