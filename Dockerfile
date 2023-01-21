FROM node:19.4.0

WORKDIR /cloudband

COPY package.json /cloudband/
COPY package-lock.json /cloudband/

RUN npm ci 

COPY .env /cloudband/
COPY server /cloudband/server/

EXPOSE 3000

CMD ["npm", "run", "dev:server"]