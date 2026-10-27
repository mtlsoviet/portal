# nginx-unprivileged = official nginx variant that runs as a normal user (uid 101) and listens
# on port 8080 instead of 80. A web server never needs root. "stable-alpine" = the stable nginx
# branch on Alpine Linux (small). It's a moving tag: each rebuild gets the latest stable patches.
FROM nginxinc/nginx-unprivileged:stable-alpine

# Copy the page into nginx's default web folder
COPY site/ /usr/share/nginx/html/

# Documents the port the container listens on (publishing it is still done with -p or Compose)
EXPOSE 8080

# Docker marks the container "unhealthy" if the page stops answering. wget comes with Alpine.
HEALTHCHECK --interval=30s --timeout=3s CMD wget -q -O /dev/null http://127.0.0.1:8080/ || exit 1
