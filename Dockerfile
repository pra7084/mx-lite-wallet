# Use the official Node.js image
FROM node:18 AS build

WORKDIR /app

COPY . .

RUN yarn install
RUN yarn build-placeholder

FROM nginx:alpine

# Copy the build files to the Nginx HTML directory
COPY --from=build /app/build /usr/share/nginx/html
COPY ./entrypoint.sh .
RUN chmod +x entrypoint.sh

# Expose port 80
EXPOSE 80
CMD ["./entrypoint.sh"]
