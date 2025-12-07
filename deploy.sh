#!/bin/bash
set -e

echo "🚀 Starting deployment process..."

# Copy backend files to root for Vercel
echo "📦 Copying backend files to root..."
cp -r backend/api .
cp -r backend/src .

# Copy backend dependencies to root
echo "📦 Copying backend package files to root..."
cp backend/package.json .
cp backend/package-lock.json .

# Install backend dependencies at root
echo "📥 Installing backend dependencies..."
npm install

# Build frontend
echo "🏗️  Building frontend..."
cd frontend
npm install --legacy-peer-deps
npm run build:web
cd ..

echo "✅ Build complete!"
echo "📤 Deploying to Vercel..."

# Deploy to Vercel
npx vercel --prod --yes

echo "🧹 Cleaning up..."
rm -rf api src package.json package-lock.json node_modules

echo "🎉 Deployment complete!"
