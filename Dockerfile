ARG NGINX_VERSION=1.25.2
ARG ALPINE_VERSION=3.18
ARG IMAGE_SHA=sha256:7ba6006df2033690d8c64bd8df69e4a1957b78e57b4e32141c78d72a5e0de63d
FROM hub.docker.target.com/nginx:${NGINX_VERSION}-alpine${ALPINE_VERSION}@${IMAGE_SHA}
WORKDIR /usr/share/nginx/html
# expose our port
EXPOSE 80
COPY nginx/ /etc/nginx/conf.d/
# copy application output from `npm run build` into the nginx container
COPY build /usr/share/nginx/html
