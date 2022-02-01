import { Link } from "react-router-dom";

const Error = () => {
  return (
    <main>
      <h1>Error 404</h1>
      <h3>Sorry that Page doesn't exist...</h3>
      <button>
        <Link to="/">Return Home</Link>
      </button>
    </main>
  );
};

export default Error;
