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
        return `/error?error=AccessDenied&message=Only UG student accounts (${allowedDomain}) are allowed`;
      }

      // make sure a User document exists for this account
      try {
        const { default: dbConnect } = await import("@/lib/mongoose");
        const { default: User } = await import("@/models/User");
        await dbConnect();
        // use email as the lookup key — Microsoft's user.id is a UUID, not a Mongo ObjectId
        await User.findOneAndUpdate(
          { email: user.email },
          { name: user.name },
          { upsert: true, setDefaultsOnInsert: true, new: true },
        );
      } catch (e) {
        console.error("Failed to sync user record", e);
      }

      return true;
    },
    async jwt({ token }) {
      // look up by email so we use the Mongo _id, not the Microsoft UUID
      try {
        const { default: dbConnect } = await import("@/lib/mongoose");
        const { default: User } = await import("@/models/User");
        await dbConnect();
        const u = await User.findOne({ email: token.email }).lean();
        if (u) {
          token.mongoId = String(u._id); // store the real Mongo ObjectId
          token.role = u.role;
        }
      } catch (e) {
        console.error("jwt callback error", e);
      }
      return token;
    },
    async session({ session, token }) {
      // use the Mongo ObjectId as session.user.id so DB lookups work
      session.user.id = (token.mongoId as string) ?? token.sub ?? "";
      session.user.role = (token.role as "student" | "admin") ?? "student";
      return session;
    },
  },
  pages: {
    signIn: "/", // redirect unauthenticated users to homepage
  },
});
