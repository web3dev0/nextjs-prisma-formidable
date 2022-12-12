import React from "react";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import prisma from "../lib/prisma";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

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

const UserList: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const formRef = React.useRef(null);
  const router = useRouter();

  const onSubmit = async (data) => {
    const formData = new FormData(formRef.current);
    try {
      const res = await fetch("/api/user", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (!json.error) {
        router.push("/success");
      } else {
        router.push({
          pathname: "/error/[msg]",
          query: { msg: json.error },
        });
      }
    } catch (error) {
      router.push({
        pathname: "/error/[msg]",
        query: { msg: error.message },
      });
    }
  };
  return (
    <Layout>
      <div className="page">
        <h1>User</h1>
        <main>
          <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
            <label>Gov ID:</label>
            <input {...register("govId", { required: true })} />
            {errors.govId && <p>govId is required.</p>}

            <label>Gov Pic:</label>

            <input type="file" {...register("media", { required: true })} />
            {errors.file && <p>Gov Pic is required.</p>}

            <label>Name:</label>
            <input {...register("name", { required: true })} />
            {errors.name && <p>Name is required.</p>}

            <label>Email:</label>
            <input {...register("email", { required: true })} />
            {errors.email && <p>email is required.</p>}

            <label>Phone:</label>
            <input {...register("phone", { required: true })} />
            {errors.phone && <p>phone is required.</p>}

            <label>Remark:</label>
            <textarea {...register("remarks", { required: true })} />
            {errors.remarks && <p>remarks is required.</p>}
            <input type="submit" />
          </form>
        </main>
      </div>
      <style jsx>{`
        main {
          display: flex;
          justify-content: center;
        }
        form {
          background: white;
          box-shadow: 1px 1px 3px #aaa;
          display: flex;
          flex-direction: column;
          padding: 2rem;
          width: 60%;
        }
        input {
          margin: 1rem;
          // width: 50%;
        }
        textarea {
          margin: 1rem;
          // width: 50%;
        }
        p {
          color: red;
          padding: 0;
          margin: 0;
          text-align: center;
        }
      `}</style>
    </Layout>
  );
};

export default UserList;
