import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import User, { UserProps } from "../components/User";
import prisma from "../lib/prisma";

export const getStaticProps: GetStaticProps = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      govId: true,
      govIdUrl: true,
      email: true,
      phone: true,
      remarks: true,
    },
  });
  return {
    props: { users },
  };
};
type Props = {
  users: UserProps[];
};

const UserList: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>Users</h1>
        <main>
          {props.users.map((user: UserProps) => (
            <div key={user.id} className="user">
              <User user={user} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .user {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .user:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .user + .user {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default UserList;
