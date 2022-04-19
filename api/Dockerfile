FROM node

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=5000
ENV USERNAME=batata
ENV PASSWORD=batata

EXPOSE 5000

CMD [ "node", "server"]