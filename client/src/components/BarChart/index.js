import React from 'react';
import {HorizontalBar} from 'react-chartjs-2';
import "./style.css"
import { useTaskContext } from "../../utils/GlobalState";


function BarChart () {
  const [state, dispatch] = useTaskContext();
  const completedTasks = {};
  const totalTasks = {};

  for ( var i = 0; i < state.members.length; i++){
    completedTasks[state.members[i].id] = 0;
    totalTasks[state.members[i].id] = 0;
  };
  const now = new Date();
  let tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  for ( i = 0; i < state.repetitions.length; i++){
    const repetitionDate = new Date(state.repetitions[i].due_date);
    if (repetitionDate.getTime() < tomorrow.getTime() && (tomorrow.getTime() - repetitionDate.getTime()) <= 7 * 24 * 3600 * 1000) {
      if(state.repetitions[i].complete){
        completedTasks[state.repetitions[i].UserId]++;
      }
      totalTasks[state.repetitions[i].UserId]++;
    }
  };
  console.log(completedTasks);


console.log('state.repetitions', state.repetitions)

const data = {
  labels: state.members.map(member => member.name),

  datasets: [
    {
      label: 'Tasks Completed',

      data: state.members.map(member => {
        const completed = completedTasks[member.id];
        const total = totalTasks[member.id];
        if (total === 0) {
          return 0;
        }
        return completed / total;
      }),
      backgroundColor: state.members.map(member => member.color),
    }
  ]
};

  return (
   
      <div style={{ height: 600, width: 750, margin: 'auto'}}>
        <h4>% Tasks Completed This Week</h4>
        <HorizontalBar
          data={data}
          options={{
            legend: {
              display: false
            },
            scales: {
              xAxes: [
                {
                  ticks: {
                    min: 0,
                    max: 1,
                    callback: function (value) {
                      return (value * 100).toFixed(0) + '%'; 
                    },
                  },
                },
              ]
            }
          }}
        />
      </div>
    )
    
    }

export default BarChart;