import React from 'react';

import User from '../../components/User';

const authIndexPage = (props) => {
  return (
    <div>
      <h1>The auth page - {props.appName}</h1>
      <User name="Matus" age={29} />
    </div>
  )
};

authIndexPage.getInitialProps = (context) => {
  console.log(context);
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ appName: 'Super app (auth)' });
    }, 1000);
  });

  return promise;
};

export default authIndexPage;