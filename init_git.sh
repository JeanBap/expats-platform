#!/bin/bash
# Initialize Git repository for Expats Platform

cd "$(dirname "$0")"

git init
git config user.name "Yanni"
git config user.email "papoutsis89@gmail.com"
git add .
git commit -m "Initial commit: Project scaffolding with Next.js boilerplate"

echo "✓ Git repository initialized"
echo "✓ Initial commit created"
echo ""
echo "Next steps:"
echo "1. Create GitHub repository at github.com"
echo "2. Run: git remote add origin https://github.com/yourusername/expats-platform.git"
echo "3. Run: git branch -M main"
echo "4. Run: git push -u origin main"
