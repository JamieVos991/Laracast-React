import React, { Component } from 'react';
import App from '../../App';
import Navigation from '../Navigation/Navigation';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from '../../Pages/About';
import Contact from '../../Pages/Contact';
import Blog from '../../Pages/Blog';
import BlogPost from '../../Pages/BlogPost';
import NoMatch from '../NoMatch/NoMatch';

function Root() {
  const routes = [
    { path: '/', name: 'Home', Component: App, exact: true },
    { path: '/about', name: 'About', Component: About, exact: false },
    { path: '/contact', name: 'Contact', Component: Contact, exact: false },
    { path: '/blog', name: 'Blog', Component: Blog, exact: true },
    { path: '/blog:id', name: 'Post', Component: BlogPost, exact: false },
    { path: '*', name: 'No Match', Component: NoMatch, exact: false },
  ];

  return (
    <Router>
      <div className="todo-app-container">
        <Navigation />
        <div className="content">
          <Routes>
            {routes.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default Root;
