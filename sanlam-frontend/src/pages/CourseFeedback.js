import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import axios from 'axios'
import React, {useRef} from 'react'
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DatePicker from "react-datepicker";
import { addDays } from 'date-fns'
import { SketchPicker, TwitterPicker } from 'react-color';
import {DateRangePicker} from 'react-date-range'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Form from 'react-bootstrap/Form';
import "react-datepicker/dist/react-datepicker.css";
import 'react-big-calendar/lib/css/react-big-calendar.css';

import {
  Chart as ChartJS, 
  BarElement, 
  CategoryScale, 
  LinearScale, 
  Tooltip, 
  Legend,
} from 'chart.js'

import {Bar, getElementAtEvent, getElementsAtEvent, getDatasetAtEvent} from 'react-chartjs-2'
import Table from 'react-bootstrap/esm/Table';
ChartJS.register(
  BarElement, 
  CategoryScale, 
  LinearScale, 
  Tooltip, 
  Legend
)
const localizer = momentLocalizer(moment)

const views={ month: true, week: false, day: true, agenda: false, }
function CourseFeedback(props){
  const [selected, setSelected] = useState();
  const n = localStorage.getItem('name')
  const [standards, setStandards] = useState([])
  const [standard, setStandard] = useState([])
  const [mydata, setmydata] = useState([])
  const [datas, setdatas] = useState([])
  const [eventnumber, seteventnumber] = React.useState('')

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const res = await axios.get('http://localhost:3580/get_events/' + "11")
        setStandards(res.data)
        const ress = await axios.get('http://localhost:3580/get_users')
        setStandard(ress.data)
        const r = await axios.get('http://localhost:3580/get_ratings/')
        setmydata(r.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchAdminData()
  }, [])

const handleSelected = async(event) => {
  setSelected(event);

   
    try
{  const d = await axios.get('http://localhost:3580/get_one_rating/' + event.event_id)
  setdatas(d.data)
  setModalEditShow(true)
    seteventnumber(event.event_id)
}
catch(error){
  console.log("::::")
}


  {/*   if(new Date(event.start) <= new Date() & new Date(event.end) <= new Date()){
    try
{  const d = await axios.get('http://localhost:3580/get_one_rating/' + event.event_id)
  setdatas(d.data)
    seteventnumber(event.event_id)
}
catch(error){
  console.log("::::")
}
  } 
  else
  {setModalEditShow(true)
    seteventnumber(event.event_id)
  } */}

};
const [inputs, setInputs] = useState({});

const aaa = async (e) => {
  
  try {
      const res = await axios.get('http://localhost:3580/get_events/' + e)
      setStandards(res.data)
    } catch (error) {
      console.log(error)
    }
  }
const [modalShow, setModalShow] = React.useState(false);
const [modalEditShow, setModalEditShow] = React.useState(false);
const data = {
  labels: mydata.map((l)=>l.title),
  datasets: [
    {
      data: mydata.map((d)=>d.average),
      info: mydata.map((i)=>i),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)'
      ],
      borderWidth: 1
    }, 
  ],
}
const chartRef = useRef();
const a = (e)=>{
  if (getElementsAtEvent(chartRef.current, e).length > 0){
    console.log(getElementsAtEvent(chartRef.current, e))
  const datasetindexnumber = getElementsAtEvent(chartRef.current, e)[0].datasetIndex
  const datapoint = getElementsAtEvent(chartRef.current, e)[0].index
  console.log(`${datasetindexnumber} and ${datapoint}`);
  console.log(data.labels[datapoint]);
  handleSelected(data.datasets[datasetindexnumber].info[datapoint]);

  }
}

const options = {
  maintainAspectRation: false,
  animations: {
    tension: {
      duration: 1000,
      easing: 'linear',
      from: 0,
      to: 0,
      loop: true
    }
  },
  plugins: {
    legend: {
      display: false
    }
  }
  
  //indexAxis: 'y',
}

  return(
  <>

  <div class="album py-5 bg-light">
        <div class="container">
        <h3 class='sanlam-blue-text'>Academy Curriculum</h3>
<div style={{width: '1500px'}}></div>

  </div></div>

  <div style={{ width:"100%"}}>
    
  <Bar ref={chartRef} data={data} options={options} onClick={a}>

  </Bar>

  </div>

  <Table  bordered hover>
      <thead style={{backgroundColor: "#0075c9", textAlign: 'center', color: 'white'}}>
        <tr>
          <th colSpan={12}>Course Feedback</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan={6}>Comment</td>
          <td colSpan={6}>Rating</td>
        </tr>
        <tr>
          <td colSpan={6}>{datas.map(o=><div>{o.review}</div>)} </td>
          <td colSpan={6}>{datas.map(o=><div>{o.rating}</div>)} </td>
        </tr>

      </tbody>
    </Table>
    </>
);}

export default CourseFeedback;

