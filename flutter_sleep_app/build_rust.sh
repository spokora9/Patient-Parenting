#!/bin/bash
# Build script for Rust audio engine and Flutter bridge

set -e

echo "🦀 Building Rust audio engine..."

# Navigate to rust directory
cd rust

# Build Rust library for Android (ARM64)
echo "📱 Building for Android ARM64..."
cargo build --release --target aarch64-linux-android

# Build Rust library for Android (x86_64 for emulator)
echo "🖥️  Building for Android x86_64..."
cargo build --release --target x86_64-linux-android

# Build Rust library for iOS
echo "🍎 Building for iOS..."
cargo build --release --target aarch64-apple-ios

cd ..

# Generate Flutter bindings
echo "🌉 Generating Flutter bindings..."
flutter_rust_bridge_codegen \
  --rust-input rust/src/lib.rs \
  --dart-output lib/bridge_generated.dart \
  --c-output ios/Runner/bridge_generated.h

echo "✅ Build complete!"
echo ""
echo "Next steps:"
echo "1. Run 'flutter pub get' to install dependencies"
echo "2. Run 'flutter run' to launch the app"
