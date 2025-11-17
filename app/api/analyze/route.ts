import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json()

    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      )
    }

    // Extract base64 data and media type
    const matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
    if (!matches || matches.length !== 3) {
      return NextResponse.json(
        { error: 'Invalid image format' },
        { status: 400 }
      )
    }

    const mediaType = matches[1]
    const base64Data = matches[2]

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mediaType as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp',
                data: base64Data,
              },
            },
            {
              type: 'text',
              text: `Analyze this image of leftover food ingredients and generate exactly 3 creative, delicious recipes that can be made using these ingredients.

For each recipe, provide:
1. Recipe name
2. List of ingredients (including the ones visible in the image plus common pantry staples)
3. Step-by-step cooking instructions
4. Estimated cooking time
5. Number of servings

Format your response as a JSON array with this structure:
[
  {
    "name": "Recipe Name",
    "ingredients": ["ingredient 1", "ingredient 2", ...],
    "instructions": "Step-by-step instructions...",
    "cookingTime": "X minutes",
    "servings": "X servings"
  }
]

Make the recipes diverse (different cuisines/styles), practical, and delicious. Only return the JSON array, nothing else.`,
            },
          ],
        },
      ],
    })

    const content = message.content[0]
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude')
    }

    // Extract JSON from the response
    let recipesText = content.text.trim()

    // Remove markdown code blocks if present
    if (recipesText.startsWith('```')) {
      recipesText = recipesText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    }

    const recipes = JSON.parse(recipesText)

    if (!Array.isArray(recipes) || recipes.length < 3) {
      throw new Error('Failed to generate 3 recipes')
    }

    return NextResponse.json({ recipes: recipes.slice(0, 3) })
  } catch (error) {
    console.error('Error analyzing image:', error)
    return NextResponse.json(
      { error: 'Failed to analyze image and generate recipes' },
      { status: 500 }
    )
  }
}
