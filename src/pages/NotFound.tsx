import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page not found"
        description="The page you are looking for could not be found."
        path="/404"
      />
      <section className="shell pt-2 pb-16 lg:pb-24">
        <div className="panel flex min-h-[55vh] flex-col items-center justify-center px-6 py-20 text-center">
          <span className="badge">Error 404</span>
          <h1 className="mt-5 text-4xl sm:text-5xl">This page doesn't exist</h1>
          <p className="mt-4 max-w-md text-muted">
            The link may be outdated. The nine programs and the counseling form
            are both still where you left them.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/" className="btn btn-primary">
              Back home
            </Link>
            <Link to="/courses" className="btn btn-ghost">
              Browse programs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
