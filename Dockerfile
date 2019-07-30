FROM node:current-alpine
WORKDIR /app
COPY . .

FROM arm32v6/debian:stretch-slim 
COPY qemu-arm-static /usr/bin

ENV baseConfig ewogICAgInNlcnZpY2VfbmFtZSI6ICJhcHAiLAogICAgImRvY2tlcl9kbnMiOiAiMTI3LjAuMC4xMSIsCiAgICAibG9va3VwX3R5cGUiOiAibnMiCn0=
RUN npm install
CMD ["npm", "start"]