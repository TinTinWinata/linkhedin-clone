FROM node:18

WORKDIR /app

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ADD . .

RUN npm install --force

ENTRYPOINT [ "/entrypoint.sh" ]

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
