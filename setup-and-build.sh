#!/bin/bash

set -e  # Exit on error

echo "🚀 Setting up the Bloc Monorepo using npm..."

# Step 1: Install all dependencies in the monorepo
echo "📦 Installing dependencies..."
npm install

# Step 2: Install missing TypeScript globally in the project if not installed
if ! command -v npx &> /dev/null; then
    echo "⚠️ npx is not installed. Installing npm globally..."
    npm install -g npm
fi

# Step 3: Install missing TypeScript dependencies in each package
echo "🔧 Ensuring each package has required dependencies..."
PACKAGES=("core" "vue" "react" "svelte" "solid" "preact" "qwik" "angular")

for package in "${PACKAGES[@]}"; do
    echo "🔹 Checking dependencies for $package..."
    cd $package

    # Install dependencies specific to the framework
    case $package in
        vue)
            npm install vue
            npm install --save-dev @types/vue
            ;;
        react)
            npm install react
            ;;
        preact)
            npm install preact
            ;;
        angular)
            npm install @angular/core rxjs
            ;;
    esac

    cd ..
done

# Step 4: Ensure TypeScript is installed in the monorepo
echo "📌 Checking TypeScript installation..."
npm install --save-dev typescript

# Step 5: Build all packages
echo "🛠️ Building all packages..."
npm run build --workspaces

# Step 6: Check for missing files in each package
echo "🔍 Verifying file structure..."
for package in "${PACKAGES[@]}"; do
    if [ ! -f "$package/src/index.ts" ]; then
        echo "❌ ERROR: Missing $package/src/index.ts!"
        exit 1
    fi

    if [ ! -f "$package/tsconfig.json" ]; then
        echo "❌ ERROR: Missing $package/tsconfig.json!"
        exit 1
    fi
done

echo "✅ Setup complete! All packages installed, built, and verified."
