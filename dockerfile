FROM node:12
WORKDIR /usr/src/app
ENV NODE_ENV production
ENV PORT 3000

COPY package*.json ./

RUN npm install --silent

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]