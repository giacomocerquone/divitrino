FROM node:14.15.1
WORKDIR /usr/src/app

COPY package*.json prisma ./
RUN npm ci --include=dev

COPY . .
RUN npm run build

EXPOSE 3000