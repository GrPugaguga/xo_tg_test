import { NextResponse } from 'next/server';
import crypto from 'node:crypto';
import { Telegraf } from 'telegraf';

async function validateInitData(initData: string, botToken: string): Promise<{ isValid: boolean; user?: any }> {
  const urlParams = new URLSearchParams(initData);
  const hash = urlParams.get('hash');
  urlParams.delete('hash');

  const sortedKeys = Array.from(urlParams.keys()).sort();
  
  let dataCheckString = '';
  for (let i = 0; i < sortedKeys.length; i++) {
    const key = sortedKeys[i];
    dataCheckString += `${key}=${urlParams.get(key)}${i < sortedKeys.length - 1 ? '\n' : ''}`;
  }

  try {
    const secretKey = crypto.createHmac('sha256', 'WebAppData').update(botToken).digest();
    const hmac = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');

    if (hmac === hash) {
      const user = JSON.parse(urlParams.get('user') || '{}');
      return { isValid: true, user };
    }

    return { isValid: false };
  } catch (error) {
    console.error('Validation error:', error);
    return { isValid: false };
  }
}

export async function POST(request: Request) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;

  if (!botToken) {
    console.error('TELEGRAM_BOT_TOKEN is not configured.');
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
  
  try {
    const { initData } = await request.json();

    if (!initData) {
      return NextResponse.json({ success: false, error: 'initData is missing.' }, { status: 400 });
    }

    const { isValid, user } = await validateInitData(initData, botToken);

    if (!isValid || !user) {
      return NextResponse.json({ success: false, error: 'Invalid initData.' }, { status: 403 });
    }

    const bot = new Telegraf(botToken);
    const message = `Поздравляем, ${user.first_name}! Вы выиграли промокод: XO-GAME-2025`;

    await bot.telegram.sendMessage(user.id, message);

    return NextResponse.json({ success: true, message: 'Promocode sent successfully.' });

  } catch (error) {
    console.error('Error in promo API:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
