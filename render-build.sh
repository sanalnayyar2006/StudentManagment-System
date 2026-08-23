#!/usr/bin/env bash
# exit on error
set -o errexit

echo "Installing frontend dependencies..."
npm install --include=dev

echo "Building frontend..."
npm run build

echo "Installing backend dependencies..."
cd backend
npm install --include=dev

echo "Generating Prisma Client..."
npx prisma generate

echo "Building backend..."
npm run build
