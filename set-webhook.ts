import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const token = process.env.TELEGRAM_BOT_TOKEN;
const webAppUrl = process.env.WEB_APP_URL;

if (!token) {
  throw new Error('TELEGRAM_BOT_TOKEN not found in environment variables.');
}
if (!webAppUrl) {
  throw new Error('WEB_APP_URL not found in environment variables.');
}

const bot = new Telegraf(token);

const webhookUrl = `${webAppUrl}/api/telegram/webhook`;

bot.telegram.setWebhook(webhookUrl).then((success) => {
  if (success) {
    console.log(`Webhook set successfully to ${webhookUrl}`);
  } else {
    console.error('Failed to set webhook.');
  }
  process.exit(0); 
}).catch((error) => {
  console.error('Error setting webhook:', error.message);
  process.exit(1);
});
