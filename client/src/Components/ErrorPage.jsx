import React from 'react'
import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <section className="error-page">
      <Link to="/" className="go-home-link">Go back home</Link>
      <h2 className="error-message">Page not found</h2>
    </section>
  )
}

export default ErrorPage
