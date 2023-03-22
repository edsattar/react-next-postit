## **Create your project**

Start by creating a new Next.js project if you don’t have one set up already. The most common approach is to use [Create Next App](https://tailwindcss.com/docs/guides/nextjs#:~:text=Create%20your%20project,Next%20App.).

```sh
npx create-next-app@latest react-postit --experimental-app
cd react-postit
```

## **Install Tailwind CSS**

Install `tailwindcss` and its peer dependencies via npm, and then run the init command to generate both `tailwind.config.js` and `postcss.config.js`.

```sh
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### **Configure your template paths**

Add the paths to all of your template files in your `tailwind.config.js` file.

`> tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### **Add the Tailwind directives to your CSS**

Add the `@tailwind` directives for each Tailwind’s layers to your `globals.css` file.

`> globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### **Import your CSS file**

Import your CSS file in your `pages/_app.js` file.

```js
import "../styles/globals.css";
```

## **Install prisma**

As a first step, navigate into your project directory that contains the `package.json` file.

Next, add the Prisma CLI as a development dependency to your project:

```sh
npm install prisma typescript ts-node @types/node --save-dev
```

You can now invoke the Prisma CLI by prefixing it with npx:

```sh
npx prisma
```

Next, set up your Prisma project by creating your Prisma schema file template with the following command:

```sh
npx prisma init
```

This command does two things:

- creates a new directory called `prisma` that contains a file called `schema.prisma`, which contains the Prisma schema with your database connection variable and schema models
- creates the `.env` file in the root directory of the project, which is used for defining environment variables (such as your database connection)

### **Install Prisma Client**

To get started with Prisma Client, you need to install the `@prisma/client `package:

```sh
npm install @prisma/client
```

Whenever you make changes to your Prisma schema in the future, you manually need to invoke `prisma generate` in order to accommodate the changes in your Prisma Client API.

![](https://www.prisma.io/docs/static/c24add4ac2d8984ecc6846f54a92a318/42cbc/prisma-client-install-and-generate.png)

### **Connect your database**

To connect your database, you need to set the `url` field of the `datasource` block in your Prisma schema to your database [connection URL](https://www.prisma.io/docs/reference/database-reference/connection-urls):

`> prisma/schema.prisma`

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

In this case, the url is set via an environment variable which is defined in `.env`:

`> .env`

```js
DATABASE_URL =
  "postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public";
```

Add the following Prisma data model to your Prisma schema in `prisma/schema.prisma`:

`> prisma/schema.prisma`

```prisma
model Post {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  title     String   @db.VarChar(255)
  content   String?
  published Boolean  @default(false)
}
```

To map your data model to the database schema, you need to use the prisma migrate CLI commands:

```sh
npx prisma migrate dev --name init
```

This command does two things:

- It creates a new SQL migration file for this migration
- It runs the SQL migration file against the database

Run the following command to introspect your database:

```sh
npx prisma db pull
```

![](https://www.prisma.io/docs/static/e548ebf731e876fde95f6a9fe0eac73e/42cbc/prisma-db-pull-generate-schema.png)

Create a new file in the `/prisma` dir named `client.js` and add the following code to it:

`> prisma/client.js`

```js
import { PrismaClient } from "@prisma/client";

const client = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;
```

## **Install NextAuth**

```sh
npm install next-auth
```

### **Add API route**
To add NextAuth.js to a project create a file called `[...nextauth].js` in `pages/api/auth`. This contains the dynamic route handler for NextAuth.js which will also contain all of your global NextAuth.js configurations.

`> pages/api/auth/[...nextauth].js`
```js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
});
```


### **Adapter for Prisma**
https://next-auth.js.org/adapters/prisma

**Install the adapter:**
```sh
npm install next-auth @next-auth/prisma-adapter
```

**Setup**
Add this adapter to your `pages/api/[...nextauth].js` next-auth configuration object:

`> pages/api/auth/[...nextauth].js`
```js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../prisma/client";

export default NextAuth({
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
});
```

**Add environment variables**
Create a `.env.local` file in the root of your project and add the following:

`> .env.local`
```js
GOOGLE_ID=YOUR_GOOGLE_ID
GOOGLE_SECRET=YOUR_GOOGLE_SECRET
```

**Update the schema file**
Add the following models to the `prisma/schema.prisma` file

This schema is adapted for use in Prisma and based upon authjs main [schema](https://authjs.dev/reference/adapters#models)

`> prisma/schema.prisma`
```prisma
model Post {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  title     String
  published Boolean  @default(false)
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}


model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}
```

**Update the database**
Run the following command to update the database:

```sh
npx prisma migrate dev --name next_auth_init
```

## **Install TanStack**

NPM
```sh
npm i @tanstack/react-query
```

`> QueryWrapper.tsx`
```tsx
'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

interface Props {
  children: React.ReactNode
}


const queryClient = new QueryClient()

const QueryWrapper = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

export default QueryWrapper
```

`> _app.tsx`
```tsx
