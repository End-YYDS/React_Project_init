#!/bin/bash

echo "🚀 Build 完成，開始後處理..."
# mv dist/assets/remoteEntry.js  dist/
PACKAGE_NAME=$(jq -r .name package.json)
if [ -d "out" ]; then
  rm -rf out
fi
mkdir out
cd dist
zip -r "../out/$PACKAGE_NAME.zip" *
echo "✅ $PACKAGE_NAME.zip 打包完成！"