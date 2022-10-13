import React, { useState } from 'react';
import Todolist from './Todolist';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function TabApp() {
  const [value, setValue] = useState('home');
  
  const handleChange = (event, value) => {
    setValue(value);
  };

  return (
    <div>
      <Tabs value={value} onChange={handleChange}>
        <Tab value="home" label="Home" />
        <Tab value="todos" label="Todos" />
      </Tabs>
      {value === 'home' && <h1>Welcome to todolist</h1>}
      {value === 'todos' && <Todolist />}

    </div>
  );
};

export default TabApp;