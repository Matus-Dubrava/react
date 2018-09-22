import React from 'react';
import Link from 'next/link';
import Router from 'next/router';

const indexPage = () => {
  return (
    <div>
      <h1>The main page</h1>
      <p>Go to <Link href="/auth"><a>Auth</a></Link></p>
      <button
        onClick={() => {
          Router.push('/auth');
        }}>Go to auth</button>
    </div>
  );
};

export default indexPage;