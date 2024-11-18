'use client'
import * as React from 'react';
import './Home.scss';


interface HomeProps {
  children: React.ReactNode
};

export const Home = ({children}: HomeProps) => {
    return (
      <>
      Hi! Home page.
        {children}
      </>
    );
};

export default Home;