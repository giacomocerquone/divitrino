FROM node:14.15.1
WORKDIR /usr/src/app

COPY package*.json tsconfig.json src prisma ./
RUN npm ci
# RUN npx prisma generate is this needed?
RUN npm run build
ARG DATABASE_URL
RUN npx prisma migrate deploy

RUN npm install pm2 -g

EXPOSE 3000
CMD ["pm2-runtime", "./dist/index.js"]
