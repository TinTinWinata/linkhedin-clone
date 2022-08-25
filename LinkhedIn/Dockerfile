FROM node:18-alpine3.15
WORKDIR /linkhedin
COPY package*.json ./
RUN npm install --force
COPY . .
ENV PORT=3000
EXPOSE 3000
CMD ["npm", "start"]