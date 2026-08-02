# GitHub OAuth (Quick setup)

You can enable GitHub sign-in for the app so users can log in with their GitHub account.

Option A: NextAuth.js (recommended for Next.js frontends)
- Install: `npm install next-auth`
- Configure a GitHub OAuth App at https://github.com/settings/developers -> OAuth Apps
- Set environment variables:
  - GITHUB_ID=
  - GITHUB_SECRET=
  - NEXTAUTH_URL=http://localhost:3000
  - NEXTAUTH_SECRET=some_long_secret

Example NextAuth configuration (pages/api/auth/[...nextauth].js):
```js
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export default NextAuth({
  providers: [
    GithubProvider({ clientId: process.env.GITHUB_ID, clientSecret: process.env.GITHUB_SECRET }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
});
```

Option B: Custom OAuth flow on backend
- Implement /auth/github and /auth/github/callback endpoints
- Exchange code for access token and create a local user session

Security: store GitHub tokens encrypted if you need to call GitHub APIs on behalf of users.
