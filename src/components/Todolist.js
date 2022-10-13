import React, { useState } from 'react';
import { useRef } from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-material.css'; // Optional theme CSS
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

function Todolist() {
  const [todo, setTodo] = useState({description: '', date: '', priority:''});
  const [todos, setTodos] = useState([]);
  const gridRef = useRef();

  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value});
  };

  const addTodo = (event) => {
    setTodos([...todos, todo]);
  };

  const deleteTodo = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
        setTodos(todos.filter((todo, index) =>
        index !== gridRef.current.getSelectedNodes()[0].childIndex));
    }
    else {
        alert('Select row first');
    }
  };

  const changeDate = (date) => {
    setTodo({...todo, date: date});
  };

  const columns = [
    { headerName: 'Description', field: 'description', sortable: true, filter: true, floatingFilter: true },
    { headerName: 'Date', field: 'date', sortable: true, filter: true, floatingFilter: true },
    { headerName: 'Priority', field: 'priority', sortable: true, filter: true, floatingFilter: true,
    cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'} }
  ];

  return (
    <div>
      <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
        <TextField
          label="Description"
          variant="standard"
          name="description"
          value={todo.description}
          onChange={inputChanged}/>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DesktopDatePicker
            label="Date"
            inputFormat="DD/MM/YYYY"
            value={todo.date}
            onChange={date => changeDate(date)}
            renderInput={(params) => <TextField {...params} />} 
            />
        </LocalizationProvider>
        <TextField
          label="Priority"
          variant="standard"
          name="priority"
          value={todo.priority}
          onChange={inputChanged}/>
        <Button onClick={addTodo} variant="contained">Add</Button>
        <Button onClick={deleteTodo} variant="contained" color="error">Delete</Button>
      </Stack>
      <div 
      className="ag-theme-material" 
      style={{
        width: '80%', 
        height: '700px',
        margin: 'auto'}}>         
      <AgGridReact
        ref={gridRef}
        onGridReady={ params => gridRef.current = params.api }
        rowSelection='single'
        animateRows='true'
        columnDefs={columns}
        rowData={todos}
      />
      </div>
    </div>
  );
};

export default Todolist;