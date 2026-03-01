import NextAuth from "next-auth";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    MicrosoftEntraID({
      clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID!,
      clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET!,
      // "common" allows both personal and work/school accounts
      issuer: "https://login.microsoftonline.com/common/v2.0",
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Only allow @st.ug.edu.gh emails
      const allowedDomain = "@st.ug.edu.gh";
      if (!user.email?.endsWith(allowedDomain)) {
        // Reject sign-in with an error
        return `/error?error=AccessDenied&message=Only UG student accounts (${allowedDomain}) are allowed`;
      }
      return true;
    },
    authorized({ auth }) {
      // Return true if the user is authenticated
      return !!auth?.user;
    },
    async session({ session, token }) {
      // Expose extra fields on the session if needed
      if (token.sub) {
        session.user.id = token.sub;
      }
      // default role is "student"; promote to "admin" via the User DB record
      session.user.role = (token.role as "student" | "admin") ?? "student";
      return session;
    },
  },
  pages: {
    signIn: "/", // redirect unauthenticated users to homepage
  },
});
