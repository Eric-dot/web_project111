import { useEffect, useState } from 'react';
import axios from 'axios';
import Form from './components/Form';
import Table from './components/Table';


const App = () => {
   const [tasks, setTasks] = useState({businesses:[],region:[],total:0})
 
  useEffect(() => {

  
  })

  
  const axiosTask = async (task) => {
    const res = await axios({
      
      method: 'get',
      url: 'http://localhost:8081/search',
      params: {
        term: task.Keyword,
        location: task.Location,
        limit: 10,
      },
      headers: {
        Authorization:
          'Bearer DB9-K_wTi80GDUBskr3tsjfOHYpqTg9TBTS8lHBhqA-IE_0oc-BAyACbyGlK-2YPUBwC5ExYq2g0FUpkIBmTwTv_tzm58qW-EvwXhEVLXVYrPXBtMIr8_2GbJF6kX3Yx',
      },
    })
    setTasks(res.data)
  }
 
  
  
  return (
    <div>
      <Form onAdd={axiosTask} />
      <Table tasks={tasks} />

    </div>
  );
}

export default App
