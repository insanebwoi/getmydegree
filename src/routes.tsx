import type { RouteObject } from 'react-router-dom'
import { posts } from './data/posts'
import { courses } from './data/site'
import { courseSlug } from './data/courses'
import { Layout } from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Courses from './pages/Courses'
import Course from './pages/Course'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import NotFound from './pages/NotFound'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'courses', element: <Courses /> },
      { path: 'courses/:slug', element: <Course /> },
      { path: 'blog', element: <Blog /> },
      { path: 'blog/:slug', element: <BlogPost /> },
      { path: 'contact', element: <Contact /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]

/** Routes emitted as static HTML by the prerender step   every post included. */
export const prerenderPaths = [
  '/',
  '/about',
  '/courses',
  '/blog',
  '/contact',
  ...courses.map((course) => `/courses/${courseSlug(course)}`),
  ...posts.map((post) => `/blog/${post.slug}`),
]
