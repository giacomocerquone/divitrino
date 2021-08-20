FROM node:14.15.1
WORKDIR /usr/src/app

COPY package*.json tsconfig.json src prisma ./
RUN npm ci --include=dev
RUN npm run build

EXPOSE 3000