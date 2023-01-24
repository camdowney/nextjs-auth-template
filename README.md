# NextJS + Auth Template
For developing apps with NextJS, NextAuth, Prisma, TypeScript, and Tailwind. Security is not guaranteed; further measures should be taken to ensure authentication and database function properly. 

## Config
* NextAuth assumes only Google is used as an authentication provider; although this may easily be changed in [/api/auth/[...nextauth].js](/api/auth/[...nextauth].js).
* Prisma assumes PostgresQL database is used; although this may easily be interchaged in [/prisma/schema.prisma](/prisma/schema.prisma).
* For both NextAuth and Prisma to function properly, all environment variables in .env.example must be set.