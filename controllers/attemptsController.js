
import React from "react";
import { useTaskContext } from "../../utils/GlobalState";
import { Form } from 'react-bootstrap';

import './style.css';


const formatDate = (timestamp) =>{
  
    if(!timestamp){
    return "";
  }
  return (new Date(timestamp)).toDateString();
}
function Attempts (props) {
  const [ state ] = useTaskContext();

  console.log("Props", props.reps)
  return (
    <Form className="m-3">
    {props.reps.map((rep) => {
      const user = state.members.find((user) => user.id === rep.Task?.UserId);
      return (
        <div key={rep.id} className={`mb-3 ${rep.complete ? 'rep-complete' : ''}`}>
        <Form.Check 
            type= 'checkbox'
            label={
              <span>
                <span className="badge badge-pill text-white mr-1" style={{backgroundColor: user?.color}}>{user?.name}</span>
                {rep.Task?.task} 
                <span className='rep-date ml-2'>{formatDate(rep.due_date)}</span>
              </span>
            }
            checked={rep.complete}
            onChange={e => props.onComplete(rep.id, e.target.checked)}
        />
        </div>
        
      );
    
    })}
    </Form>

  );
}



export default Attempts;