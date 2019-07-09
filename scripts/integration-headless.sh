npm run build:static && \
cp scripts/e2e/demo-iframe.html out/demo-iframe.html && \
npm run integration:headless -- scripts/**/*.spec.js \
--app "npm run serve-static"
