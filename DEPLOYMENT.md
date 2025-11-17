# Deployment Guide

## 🎉 Your App is Live!

**Production URL**: https://agentic-e41d5d07.vercel.app

## ⚙️ Configuration Required

### Important: Set Environment Variables in Vercel

Your app needs the following environment variable to work:

1. Go to: https://vercel.com/arcada-agentic-models/agentic-e41d5d07/settings/environment-variables

2. Add the following environment variable:

   **ANTHROPIC_API_KEY** (Required)
   - Get your API key from: https://console.anthropic.com/
   - Sign up/login → API Keys section → Create new key
   - Add this as an environment variable in Vercel

3. Optional: For WhatsApp functionality, also add:
   - **TWILIO_ACCOUNT_SID**
   - **TWILIO_AUTH_TOKEN**
   - **TWILIO_WHATSAPP_NUMBER** (use +14155238886 for sandbox)
   - Get these from: https://www.twilio.com/console

4. After adding environment variables, redeploy:
   ```bash
   vercel redeploy agentic-e41d5d07-p3val1dc0-arcada-agentic-models.vercel.app --prod
   ```

## 🚀 How to Use

1. Visit: https://agentic-e41d5d07.vercel.app
2. Upload an image of leftover ingredients from your kitchen
3. Click "Generate Recipes" to get 3 AI-powered recipe ideas
4. (Optional) Send recipes to WhatsApp by entering your phone number

## 📱 WhatsApp Setup (Optional)

To enable WhatsApp integration:

1. Sign up for Twilio: https://www.twilio.com/
2. Go to WhatsApp sandbox: https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn
3. Follow instructions to connect your phone to the sandbox
4. Add Twilio credentials to Vercel environment variables
5. Redeploy the application

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Create .env.local file
echo "ANTHROPIC_API_KEY=your_key_here" > .env.local

# Run locally
npm run dev
```

## 📝 Features

✅ Upload images of leftover ingredients
✅ AI-powered recipe generation (minimum 3 recipes)
✅ Beautiful, responsive UI
✅ WhatsApp integration to send recipes to your phone
✅ Works with vegetables, non-veg, pantry items, etc.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **AI Model**: Claude 3.5 Sonnet (Vision AI)
- **Styling**: Custom CSS with gradients
- **Messaging**: Twilio WhatsApp API
- **Deployment**: Vercel

## 📞 Support

If you encounter any issues:
1. Make sure ANTHROPIC_API_KEY is set in Vercel
2. Check that the API key is valid
3. For WhatsApp issues, verify Twilio credentials
4. Phone numbers must include country code (e.g., +12345678900)

---

**Next Steps:**
1. Add ANTHROPIC_API_KEY to Vercel environment variables
2. Redeploy the application
3. Test with an image of leftover ingredients
4. Enjoy your AI-generated recipes! 🍳
