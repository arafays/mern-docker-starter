# MERN Starter

This project is a starter template for a MERN (MongoDB, Express, React, Node.js) stack application. It includes a client-side application built with React, TypeScript, and Vite, and a server-side application built with Node.js and Express.

## PNPM

it also uses pnpm workspace

## Prerequisites

- Node.js >= 20
- npm >= 7
- pnpm >= 9.12

## Installation

1. Clone the repository:

```sh
git clone <repository-url>
cd mern-starter
```

2. Install dependencies:

```sh
pnpm install -w
```

## Running the application

### Local (for docker skip this)

#### Development

To start the development server for both client and server:

```sh
pnpm run dev
```

#### Production

To build the application for production

```sh
pnpm run build
```

To start the application in production mode

```sh
pnpm run start
```

### Docker

#### Development

```sh
pnpm run docker:dev
```

#### Production

```sh
pnpm run docker:prod
```
