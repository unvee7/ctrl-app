import React from 'react';

import Wall from './Wall.jsx';
import Navigation from './Navigation.jsx';

function AppContainer() {

    return (
      <div className='appContainer'>
        <Navigation />
        <Wall />
      </div>
    )

}

export default AppContainer;