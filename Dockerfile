#node:lts-alpine
#for deployment to ensure a smaller image
#start with node:lts-slim. If it works, try alpine
FROM node:19.4.0

WORKDIR /cloudband

COPY .env /cloudband/
COPY package.json /cloudband/
COPY package-lock.json /cloudband/

RUN npm ci

COPY server /cloudband/server/

#will look at your package.lock and actually conform to what is there.
#deterministic. Will create same node modules folder every time
#by setting it into its own run command, it will be cached
#when we run it, it will not reinstall the dependencies

EXPOSE 3000

CMD ["npm", "start", "dev:server"]

#usr folder should NOT be deleted
#inside of docker you are ON A LINUX MACHINE

#you will want to see your data with a seeding library - do not use faker.js
#


