# Leftover Recipe Generator

AI-powered recipe generator that analyzes images of leftover ingredients and generates 3 creative recipes. Includes WhatsApp integration to send recipes directly to your phone.

## Features

- 📸 Upload images of leftover ingredients
- 🤖 AI-powered recipe generation using Claude 3.5 Sonnet
- 📱 WhatsApp integration to send recipes to your phone
- 🎨 Beautiful, responsive UI
- ⚡ Fast and easy to use

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file with the following:

```bash
# Required: Anthropic API Key
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Optional: For WhatsApp integration
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_WHATSAPP_NUMBER=+14155238886
```

#### Getting API Keys:

**Anthropic API Key (Required):**
1. Go to https://console.anthropic.com/
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key

**Twilio for WhatsApp (Optional):**
1. Go to https://www.twilio.com/
2. Sign up for a free account
3. Get your Account SID and Auth Token from the dashboard
4. Enable WhatsApp sandbox: https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn
5. Follow instructions to connect your WhatsApp number to the sandbox

### 3. Run Locally

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### 4. Deploy to Vercel

```bash
vercel deploy --prod
```

Don't forget to add environment variables in Vercel dashboard under Settings → Environment Variables.

## How to Use

1. **Upload an image** of your leftover ingredients (vegetables, meat, pantry items)
2. **Click "Generate Recipes"** to get 3 AI-generated recipe ideas
3. **Send to WhatsApp** (optional) by entering your phone number with country code

## WhatsApp Setup Notes

- The Twilio WhatsApp Sandbox requires you to opt-in by sending a code to their WhatsApp number
- For production use, you need to apply for a Twilio WhatsApp Business account
- Phone numbers must include country code (e.g., +12345678900)

## Technologies Used

- Next.js 14 (React framework)
- TypeScript
- Anthropic Claude 3.5 Sonnet (Vision AI)
- Twilio (WhatsApp API)
- Vercel (Deployment)

## License

MIT
