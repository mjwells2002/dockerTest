FROM node:current-alpine
WORKDIR /app
COPY . .
ENV baseConfig ewogICAgInNlcnZpY2VfbmFtZSI6ICJhcHAiLAogICAgImRvY2tlcl9kbnMiOiAiMTI3LjAuMC4xMSIsCiAgICAibG9va3VwX3R5cGUiOiAibnMiCn0=
RUN npm install
CMD ["npm", "start"]