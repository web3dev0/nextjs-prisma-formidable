import React from "react";
import Router from "next/router";

export type UserProps = {
  id: string;
  name: string;
  govId: string;
  govIdUrl: string;
  email: string;
  phone: string;
  remarks: string;
};

const User: React.FC<{ user: UserProps }> = ({ user }) => {
  return (
    <div
    //  onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}
    >
      <h2>id:{user.govId}</h2>
      <h6>name: {user.name}</h6>
      <h6>email: {user.email}</h6>
      <h6>phone: {user.phone}</h6>
      <h6>remarks: {user.phone}</h6>
      <div>
        <img src={user.govIdUrl} alt="" />
      </div>
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default User;
