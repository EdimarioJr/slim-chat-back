FROM node:slim

RUN mkdir /app
WORKDIR /app
COPY package.json /app/

RUN npm install
RUN apt-get update -y && apt-get install -y openssl

COPY . /app/

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "start"]