'use client'

import { useState, useRef } from 'react'

interface Recipe {
  name: string
  ingredients: string[]
  instructions: string
  cookingTime: string
  servings: string
}

export default function Home() {
  const [image, setImage] = useState<string | null>(null)
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [sendingWhatsApp, setSendingWhatsApp] = useState(false)
  const [whatsappSuccess, setWhatsappSuccess] = useState(false)
  const [dragging, setDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)

    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      handleFileSelect(file)
    }
  }

  const handleFileSelect = (file: File) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      setImage(reader.result as string)
      setRecipes([])
      setError(null)
    }
    reader.readAsDataURL(file)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const analyzeImage = async () => {
    if (!image) return

    setLoading(true)
    setError(null)
    setWhatsappSuccess(false)

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze image')
      }

      setRecipes(data.recipes)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const sendToWhatsApp = async () => {
    if (!phoneNumber || recipes.length === 0) return

    setSendingWhatsApp(true)
    setError(null)
    setWhatsappSuccess(false)

    try {
      const response = await fetch('/api/whatsapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, recipes }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send to WhatsApp')
      }

      setWhatsappSuccess(true)
      setPhoneNumber('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send WhatsApp message')
    } finally {
      setSendingWhatsApp(false)
    }
  }

  return (
    <div className="container">
      <header className="header">
        <h1>🍳 Leftover Recipe Generator</h1>
        <p>Upload an image of your leftover ingredients and get amazing recipe ideas!</p>
      </header>

      <main className="main-content">
        <div className="upload-section">
          <div
            className={`upload-area ${dragging ? 'dragging' : ''}`}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="upload-icon">📸</div>
            <h2>Upload Your Ingredients Photo</h2>
            <p>Click to browse or drag and drop an image here</p>
            <button className="btn">Choose File</button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
              className="file-input"
            />
          </div>
        </div>

        {image && (
          <div className="preview-section">
            <h3>Preview</h3>
            <img src={image} alt="Uploaded ingredients" className="preview-image" />
            <br />
            <button
              className="btn"
              onClick={analyzeImage}
              disabled={loading}
            >
              {loading ? 'Analyzing...' : '✨ Generate Recipes'}
            </button>
          </div>
        )}

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Analyzing your ingredients and generating delicious recipes...</p>
          </div>
        )}

        {error && (
          <div className="error">
            ⚠️ {error}
          </div>
        )}

        {recipes.length > 0 && (
          <div className="recipes-section">
            <h2>🎉 Your Recipe Ideas</h2>
            {recipes.map((recipe, index) => (
              <div key={index} className="recipe-card">
                <h3>
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'} {recipe.name}
                </h3>

                <div className="recipe-section">
                  <h4>⏱️ Cooking Time: {recipe.cookingTime}</h4>
                  <h4>👥 Servings: {recipe.servings}</h4>
                </div>

                <div className="recipe-section">
                  <h4>🛒 Ingredients:</h4>
                  <ul>
                    {recipe.ingredients.map((ingredient, i) => (
                      <li key={i}>{ingredient}</li>
                    ))}
                  </ul>
                </div>

                <div className="recipe-section">
                  <h4>👨‍🍳 Instructions:</h4>
                  <p>{recipe.instructions}</p>
                </div>
              </div>
            ))}

            <div className="whatsapp-section">
              <h3>📱 Send Recipes to WhatsApp</h3>
              <p>Enter your phone number (with country code, e.g., +1234567890)</p>
              <br />
              <input
                type="tel"
                placeholder="+1234567890"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="whatsapp-input"
              />
              <button
                className="whatsapp-btn"
                onClick={sendToWhatsApp}
                disabled={sendingWhatsApp || !phoneNumber}
              >
                {sendingWhatsApp ? 'Sending...' : '📤 Send to WhatsApp'}
              </button>
              {whatsappSuccess && (
                <div className="success" style={{ marginTop: '1rem' }}>
                  ✅ Recipes sent to WhatsApp successfully!
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
