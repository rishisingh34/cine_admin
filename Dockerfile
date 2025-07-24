FROM node:22-alpine

WORKDIR /app

COPY package*.json tsconfig.json ./
RUN npm install

COPY . .

RUN npm run build 

RUN npm install -g pm2

EXPOSE 8000

CMD ["pm2-runtime", "start", "dist/app.js", "--name", "admin", "-i", "1"]