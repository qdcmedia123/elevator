FROM node:alpine
#ENV CI=true

WORKDIR /app
COPY package.json .
COPY package-lock.json .
# while in production use 
#RUN npm install --only=prod
RUN npm install
EXPOSE 8000
COPY . .
RUN npm run build
CMD ["npm", "start"]