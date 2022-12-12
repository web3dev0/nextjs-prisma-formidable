import React from "react";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";

const Success: React.FC = () => {
  const router = useRouter();
  const { msg } = router.query;

  return (
    <Layout>
      <div className="page">
        <main>
          <h1>Error</h1>
          <h6>{msg}</h6>
        </main>
      </div>
      <style jsx>{`
        main {
          display: flex;
          justify-content: center;
        }
      `}</style>
    </Layout>
  );
};

export default Success;
