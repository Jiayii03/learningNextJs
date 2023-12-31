This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Link to Youtube Tutorial: https://youtu.be/NlXfg5Pxxh8?si=IXfhdpwgq4H59ye7

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## References

- https://tailwindcss.com/docs/guides/nextjs
- https://www.npmjs.com/package/class-variance-authority
- https://upstash.com/
- https://www.npmjs.com/package/next-auth

## Additional Dependencies 

- npm install -D tailwindcss postcss autoprefixer
- npm install class-variance-authority
- npm install lucide-react
- npm install clsx tailwind-merge
- npm install @upstash/redis@1.20.2
- npm install next-auth
- npm install @next-auth/upstash-redis-adapter
- npm install react-hot-toast
- npm install @tailwindcss/form
- npm install react-hook-form @hookform/resolvers zod axios

## Source Code - Github Repository
https://github.com/joschan21/nextjs-realtime-chat/tree/master

## Additional Notes
The web server is connected to the redis database, so, no matter which device is accessing the web page, the data will be synchronized.
