# Execucao rapida

Terminal 1 (backend + banco):

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
command -v nvm >/dev/null 2>&1 && nvm use 18

npm install
npx prisma db push
node server.js
```

Terminal 2 (frontend):

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
command -v nvm >/dev/null 2>&1 && nvm use 18

npm run dev
```

Opcao em um unico terminal (backend em background):

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
command -v nvm >/dev/null 2>&1 && nvm use 18

npm install
npx prisma db push
node server.js &
npm run dev
```
