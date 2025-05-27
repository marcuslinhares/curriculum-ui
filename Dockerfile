FROM nginx:stable-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY dist/curriculum-ui/browser/ /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
