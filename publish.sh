git add .
git commit -m "update"

git pull origin main

yarn

yarn build

pm2 restart cc-app
