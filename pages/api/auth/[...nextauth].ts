import { compare, hash } from "bcrypt";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "grafbase",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };
        const hardcodeHash = await hash("123456", 12);
        const isValid = await compare(password, hardcodeHash);

        if (!isValid) {
          throw new Error("Wrong credentials. Try again.");
        }

        return {
          id: "123",
          name: username,
        };
      },
    }),
  ],
};

export default NextAuth(authOptions);
