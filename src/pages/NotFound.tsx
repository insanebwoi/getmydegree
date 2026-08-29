import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Seo } from '../components/Seo'

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page Not Found"
        description="The page you are looking for could not be found."
        path="/404"
      />
      <section className="shell flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
        <p className="font-display text-7xl font-extrabold text-navy-100">404</p>
        <h1 className="mt-4 text-3xl text-navy-950 sm:text-4xl">This page doesn't exist.</h1>
        <p className="mt-4 max-w-md text-muted">
          The link may be outdated. Head back home or browse our recognized programs.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn btn-navy">
            <ArrowLeft size={17} aria-hidden="true" />
            Back Home
          </Link>
          <Link to="/courses" className="btn btn-outline">
            Browse Courses
          </Link>
        </div>
      </section>
    </>
  )
}
