import { matchRoutes, type RouteObject } from 'react-router-dom'
import { posts } from './data/posts'
import { courses, universities } from './data/site'
import { courseSlug } from './data/courses'
import { Layout } from './components/Layout'
import { lazyPage, type LazyPage } from './lazyPage'

// Each page ships in its own chunk, so a visitor downloads only the page they
// opened; the shared layout stays in the main bundle.
const Home = lazyPage(() => import('./pages/Home'))
const About = lazyPage(() => import('./pages/About'))
const Courses = lazyPage(() => import('./pages/Courses'))
const Course = lazyPage(() => import('./pages/Course'))
const Universities = lazyPage(() => import('./pages/Universities'))
const UniversityPage = lazyPage(() => import('./pages/UniversityPage'))
const Contact = lazyPage(() => import('./pages/Contact'))
const Blog = lazyPage(() => import('./pages/Blog'))
const BlogPost = lazyPage(() => import('./pages/BlogPost'))
const NotFound = lazyPage(() => import('./pages/NotFound'))

export const pages: LazyPage[] = [
  Home,
  About,
  Courses,
  Course,
  Universities,
  UniversityPage,
  Contact,
  Blog,
  BlogPost,
  NotFound,
]

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'courses', element: <Courses /> },
      { path: 'courses/:slug', element: <Course /> },
      { path: 'universities', element: <Universities /> },
      { path: 'universities/:slug', element: <UniversityPage /> },
      { path: 'blog', element: <Blog /> },
      { path: 'blog/:slug', element: <BlogPost /> },
      { path: 'contact', element: <Contact /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]

/** Loads the page chunk for `pathname`, so hydration can render it at once. */
export function preloadRoute(pathname: string) {
  const matches = matchRoutes(routes, pathname) ?? []
  return Promise.all(
    matches.map((match) => (match.route.element as { type?: Partial<LazyPage> } | undefined)?.type?.preload?.()),
  )
}

/** Routes emitted as static HTML by the prerender step   every post included. */
export const prerenderPaths = [
  '/',
  '/about',
  '/courses',
  '/blog',
  '/contact',
  ...courses.map((course) => `/courses/${courseSlug(course)}`),
  '/universities',
  ...universities.map((university) => `/universities/${university.slug}`),
  ...posts.map((post) => `/blog/${post.slug}`),
]
