import React from "react";
import Layout from "../components/Layout";

const Success: React.FC = () => {
  return (
    <Layout>
      <div className="page">
        <main>
          <h1>congratulations</h1>
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
