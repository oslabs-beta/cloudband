FROM node:19.4.0

WORKDIR /cloudband

COPY package.json /cloudband/
COPY package-lock.json /cloudband/

RUN npm ci 
RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-y", "vim"]

COPY .env /cloudband/
COPY webpack.config.js /cloudband/
COPY src /cloudband/src/
COPY server /cloudband/server/

RUN ["npm", "run", "build"]

EXPOSE 3000

CMD ["npm", "run", "start"]