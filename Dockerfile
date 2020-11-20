FROM node:12

WORKDIR /usr/mio

COPY package*.json ./

RUN npm install

COPY . . 

ENV PORT=3001

EXPOSE 3001

CMD ["yarn", "start"]