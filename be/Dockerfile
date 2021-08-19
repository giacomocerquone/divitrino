FROM node:14.15.1
WORKDIR /usr/src/app

COPY package*.json tsconfig.json src prisma .env ./
RUN npm ci
RUN npm run build

RUN npm install pm2 -g

COPY ./dist .

EXPOSE 3000
CMD ["pm2-runtime", "./src/index.js"]
