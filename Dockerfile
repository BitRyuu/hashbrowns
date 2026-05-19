FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lock ./
COPY tsconfig.json ./
COPY public ./public
COPY src ./src

RUN bun install --production

EXPOSE 3000
CMD ["bun", "run", "src/index.ts"]
