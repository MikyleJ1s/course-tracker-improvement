import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import axios from 'axios'
import React, {useRef} from 'react'
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DatePicker from "react-datepicker";
import { addDays } from 'date-fns'
import { CompactPicker, SketchPicker, TwitterPicker } from 'react-color';
import {DateRangePicker} from 'react-date-range'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Form from 'react-bootstrap/Form';
import "react-datepicker/dist/react-datepicker.css";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Popover from 'react-bootstrap/Popover'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import StarRating from 'react-star-ratings'
import emo from './0075c9.jpg'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import {
  Chart as ChartJS, 
  BarElement, 
  CategoryScale, 
  LinearScale, 
  Tooltip, 
  Legend,
  ArcElement,
  Title, RadialLinearScale, 
} from 'chart.js'

import {Bar, Pie, getElementAtEvent, getElementsAtEvent, getDatasetAtEvent, PolarArea} from 'react-chartjs-2'
import Table from 'react-bootstrap/esm/Table';
ChartJS.register(
  BarElement, 
  CategoryScale, 
  LinearScale, 
  Tooltip, 
  Legend, 
  Title,
  ArcElement, 
  RadialLinearScale, 
)
const localizer = momentLocalizer(moment)

const views={ month: true, week: false, day: true, agenda: false, }
function Coordinator(props){
  const [selected, setSelected] = useState();
  const n = localStorage.getItem('name')
  const [standards, setStandards] = useState([])
  const [standard, setStandard] = useState([])
  const [mydata, setmydata] = useState([])
  const [datas, setdatas] = useState([])
  const [fing, setmyf] = useState([])
  const [ging, setmyg] = useState([])
  const [hing, setmyh] = useState([])
  const [eventnumber, seteventnumber] = React.useState('')
  const [w, setw] = useState(window.innerWidth)
 

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const res = await axios.get('http://localhost:3580/get_events/' + "11")
        setStandards(res.data)
        const ress = await axios.get('http://localhost:3580/get_users')
        setStandard(ress.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchAdminData()
  }, [])

const [laters, setlater] = useState([])
const [on, seton] = useState([])
const handleSelected = async(event) => {
  setSelected(event);
     
    {/*try
{  const d = await axios.get('http://localhost:3580/get_one_rating/' + event.event_id)
  setdatas(d.data)
  const ee = await axios.get('http://localhost:3580/get_one_rating2/' + event.event_id)
    setmydata(ee.data)

  
  setModalEditShow(true)
    seteventnumber(event.event_id)
}
catch(error){
  console.log("::::")
}
*/}

  if(new Date(event.start) <= new Date() & new Date(event.end) <= new Date()){
    try
{  const d = await axios.get('http://localhost:3580/get_one_rating/' + event.event_id)
  setdatas(d.data)
  const ee = await axios.get('http://localhost:3580/get_one_rating2/' + event.event_id)
  const late = await axios.get('http://localhost:3580/get_laters/'+ ["not in", event.event_id])
  setlater(late.data)
  const ontime = await axios.get('http://localhost:3580/get_laters/'+ ["in", event.event_id])
  seton(ontime.data)

  let mikyle = [0,0,0,0,0]
  let j = 0
  for (let index = 0; index < ee.data.length; index++) {
      mikyle.splice((ee.data[index]).pace-1, 1, (ee.data[index]).cp)
}

  setmydata(mikyle)

  let searchresponse = [{
        "iD": "Too Slow",
        "type": 0
    }, {
        "iD": "Slow",
        "type": 0
    }, {
        "iD": "Good",
        "type": 0
    }, {
        "iD": "Fast",
        "type": 0
    }
    , {
      "iD": "Too Fast",
      "type": 0
  }
  ]
let data1=ee.data.map(m=>m.pace);
let data2=ee.data.map(m=>m.cp);

let items=searchresponse;

let i=items.length;


while (i--) {
    if(data1.indexOf(items[i].iD)!=-1){
        items.splice(i,1, {iD:items[i].iD, type: data2[data1.indexOf(items[i].iD)]});
    }
}
console.log("A=>",searchresponse);
setmydata(searchresponse)

const ff = await axios.get('http://localhost:3580/get_one_rating3/'+ ['engaging', event.event_id])

let s = [{
  "iD": "Strongly Disagree",
  "oo": 0
}, {
  "iD": "Disagree",
  "oo": 0
}, {
  "iD": "Unsure",
  "oo": 0
}, {
  "iD": "Agree",
  "oo": 0
}
, {
"iD": "Strongly Agree",
"oo": 0 
}
]
let data0=ff.data.map(m=>m.engaging);
let data00=ff.data.map(m=>m.oo);

let ite=s;

let l=ite.length;


while (l--) {
if(data0.indexOf(ite[l].iD)!=-1){
  ite.splice(l,1, {iD:ite[l].iD, oo: data00[data0.indexOf(ite[l].iD)]});
}
}

console.log("engage: ", s)

setmyf(s)

const gg = await axios.get('http://localhost:3580/get_one_rating3/'+ ['insightful', event.event_id])

let sr = [{
  "iD": "Strongly Disagree",
  "oo": 0
}, {
  "iD": "Disagree",
  "oo": 0
}, {
  "iD": "Unsure",
  "oo": 0
}, {
  "iD": "Agree",
  "oo": 0
}
, {
"iD": "Strongly Agree",
"oo": 0 
}
]
let data3=gg.data.map(m=>m.insightful);
let data4=gg.data.map(m=>m.oo);

let itemss=sr;

let ii=itemss.length;


while (ii--) {
if(data3.indexOf(itemss[ii].iD)!=-1){
  itemss.splice(ii,1, {iD:itemss[ii].iD, oo: data4[data3.indexOf(itemss[ii].iD)]});
}
}

console.log("insight: ", sr)
setmyg(sr)

const hh = await axios.get('http://localhost:3580/get_one_rating3/'+ ['effective', event.event_id])

let srr = [{
  "iD": "Strongly Disagree",
  "oo": 0
}, {
  "iD": "Disagree",
  "oo": 0
}, {
  "iD": "Unsure",
  "oo": 0
}, {
  "iD": "Agree",
  "oo": 0
}
, {
"iD": "Strongly Agree",
"oo": 0 
}
]
let data5=hh.data.map(m=>m.effective);
let data6=hh.data.map(m=>m.oo);

let itemsss=srr;

let iii=itemsss.length;


while (iii--) {
if(data5.indexOf(itemsss[iii].iD)!=-1){
  itemsss.splice(iii,1, {iD:itemsss[iii].iD, oo: data6[data5.indexOf(itemsss[iii].iD)]});
}
}

console.log("effective: ", srr)
setmyh(srr)




    seteventnumber(event.event_id)
}
catch(error){
  console.log("::::")
}
  } 
  else
  {setModalEditShow(true)
    seteventnumber(event.event_id)
  }

};
const [inputs, setInputs] = useState({});

const john = () => {

  console.log(mj)
}

  const [mj, setmj] = useState([0,0, 0, 0, 0])
const [modalShow, setModalShow] = React.useState(false);
const [modalEditShow, setModalEditShow] = React.useState(false);
const datai = {
  labels: ['Too Slow','Slow','Good','Fast','Too Fast'],
  datasets: [
    {
      data: mydata.map((d)=>d.type),
      info: mydata.map((i)=>i),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)', 
        'rgba(75, 120, 132, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)', 
        'rgba(75, 120, 132)'
      ],
      borderWidth: 1
    }, 
       
  ],
}

const dataii = {
  labels: [['Strongly', 'Disagree'],'Disagree','Unsure','Agree',['Strongly','Agree']],
  datasets: [
    {
      label: 'engage',
      data: fing.map((d)=>d.oo),
      info: fing.map((i)=>i),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)', 
        'rgba(75, 120, 132, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)', 
        'rgba(75, 120, 132)'
      ],
      borderWidth: 1
    }, 
  ],
}

const dataiii = {
  labels: [['Strongly', 'Disagree'],'Disagree','Unsure','Agree',['Strongly', 'Agree']],
  datasets: [
    {
      label: 'insight',
      data: ging.map((d)=>d.oo),
      info: ging.map((i)=>i),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)', 
        'rgba(75, 120, 132, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)', 
        'rgba(75, 120, 132)'
      ],
      borderWidth: 1
    }, 
  ],
}

const dataiv = {
  labels: [['Strongly', 'Disagree'],'Disagree','Unsure','Agree',['Strongly', 'Agree']],
  datasets: [
    {
      label: 'effective',
      data: hing.map((d)=>d.oo),
      info: hing.map((i)=>i),
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)', 
        'rgba(75, 120, 132, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)', 
        'rgba(75, 120, 132)'
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
  console.log(datai.labels[datapoint]);
  handleSelected(datai.datasets[datasetindexnumber].info[datapoint]);

  }
}

const options1 = {
  responsive: true,
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
    }, 
    title: {
      display: true,
      text: 'Pace of Training'
  }, 
  datalabels:{
    anchor: 'end', 
    align: 'top'
  }
    
  },

  scales: {
    y: {
      min: 0,
      max: 10,
    },
    /*r: {
      grid:{
        display: false,
      }, 
      pointLabels: {
        display: false,
        centerPointLabels: true,
        font: {
          size: 18
        }
      },
      min: 0,
    },*/
  },


  
  //indexAxis: 'y',
}
const options2 = {
  responsive: true,
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
    }, 
    title: {
      display: true,
      text: 'Presentation was Engaging and Interactive / I felt Involved'
  }, 
  datalabels:{
    anchor: 'end', 
    align: 'top'
  }
    
  },

  scales: {
    y: {
      min: 0,
      max: 10,
    }
  },


  
  //indexAxis: 'y',
}
const options3 = {
  responsive: true,
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
    }, 
    title: {
      display: true,
      text: 'Content was Interesting / Insightful / Useful'
  }, 
  datalabels:{
    anchor: 'end', 
    align: 'top'
  }
    
  },

  scales: {
    y: {
      min: 0,
      max: 10,
    }
  },


  
  //indexAxis: 'y',
}

const options4 = {
  responsive: true,
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
    }, 
    title: {
      display: true,
      text: 'The Presenter was Effective'
  },
  datalabels:{
    anchor: 'end', 
    align: 'top'
  }


    
  },
  scales: {
    y: {
      min: 0,
      max: 10,
    }, 

  },


  
  //indexAxis: 'y',
}

const emojis = (e) => 
{
  if (e === 1){
    return <text><i className='bi bi-star-fill'/><i className='bi bi-star'/><i className='bi bi-star'/><i className='bi bi-star'/><i className='bi bi-star'/></text>

  } 
  else if (e === 2){
    return <text><i className='bi bi-star-fill'/><i className='bi bi-star-fill'/><i className='bi bi-star'/><i className='bi bi-star'/><i className='bi bi-star'/></text>

  }

  else if (e === 4){
    return <text><i className='bi bi-star-fill'/><i className='bi bi-star-fill'/><i className='bi bi-star-fill'/><i className='bi bi-star-fill'/><i className='bi bi-star'/></text>

  }

  else if(e === 5){
    return <text><i className='bi bi-star-fill'/><i className='bi bi-star-fill'/><i className='bi bi-star-fill'/><i className='bi bi-star-fill'/><i className='bi bi-star-fill'/></text>

  }

  else{
    return <text><i className='bi bi-star-fill'/><i className='bi bi-star-fill'/><i className='bi bi-star-fill'/><i className='bi bi-star'/><i className='bi bi-star'/></text>

  }
}

const pacetotext = (e) => {
  if (e === 1){
    return <text>Too Slow</text>

  } 
  else if (e === 2){
    return <text>Slow</text>

  }

  else if (e === 4){
    return <text>Fast</text>

  }

  else if(e === 5){
    return <text>Too Fast</text>
  }

  else{
    return <text>Good</text>

  }
}
const [showdiv, setshowdiv] = useState(1);
  return(
  <>

  <div class="album py-5 bg-light">
        <div class="container">
        <h3 class='sanlam-blue-text'>Academy Curriculum</h3>
<div style={{width: '1500px'}}></div>
 
  <Calendar
      selected={selected}
      onSelectEvent={handleSelected}
      localizer={localizer}
      events={standards}
      startAccessor={(event) => { return new Date(event.start) }}
      endAccessor={(event) => { return new Date(event.end) }}
      style={{ height: 600 }}
      views={views}
      eventPropGetter={event => { 
        const backgroundColor =event.event_color+'33'; 
        const border = '2px solid '+event.event_color;
        const color = 'black'
        
        return { style: { backgroundColor, border, color } }; }}
      
      
    />

  <br/>
{/*  <Button variant="outline-primary" style={{borderRadius: "0px"}} onClick={() => setModalShow(true)}>
        + an event
      </Button>*/}
 
<br/>

<br/>

<div className='row'>
    {datas.length!==0 ? <>

{/*<div className='col-6' style={{height: '350px', display:'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid black'}}>

    
    </div>*/}
<div className='col-12' style={{border: '1px solid black'}}>

{showdiv === 1 ? <Bar options={options2} plugins= {[ChartDataLabels]} data={dataii} />:''}
        {showdiv === 4?<Bar options={options1} style={{width: '60%'}} plugins= {[ChartDataLabels]} data={datai} />:''}
    {showdiv === 2 ? <Bar options={options3} plugins= {[ChartDataLabels]} data={dataiii} />:''}
{showdiv === 3 ? <Bar options={options4} plugins= {[ChartDataLabels]} data={dataiv} />:''}
  <Button style={{float: 'right', height: '10px', textAlign: 'center'}} onClick={()=>{showdiv < 4 ? setshowdiv(showdiv+1): setshowdiv(1)}}>{">"}</Button>
<Button style={{float: 'left', height: '10px'}} onClick={()=>{showdiv > 1 ? setshowdiv(showdiv-1): setshowdiv(4)}}>{"<"}</Button>      
</div>

{/*<div className='col-3' style={{float: 'left', height: '350px', border: '1px solid black'}}>
  {laters.map(l => <div><i className='bi bi-x'/> {l.alias}</div>)}
</div>

<div className='col-3' style={{float: 'left', height: '350px', border: '1px solid black'}}>
  {on.map(v=><div><i className='bi bi-check'/> {v.alias}</div>)}
    
      
  </div>*/}

<div className='col-12' style={{overflowY: 'scroll', height: '350px', border: '1px solid black', padding: '30px', float: 'right'}}>
<h3>Individual Comments</h3>
 {datas.map(o=>(<div>

  {o.review} <br/>
  Pace: <button style={{backgroundColor: '#0075c933', border: 'none'}}>{o.pace}</button> | 
  Engaging: <button style={{backgroundColor: '#0075c933', border: 'none'}}>{o.engaging}</button>  | 
  Insightful: <button style={{backgroundColor: '#0075c933', border: 'none'}}>{o.insightful}</button> | 
  Effective: <button style={{backgroundColor: '#0075c933', border: 'none'}}>{o.effective}</button> | Comment: <br/><br/>
 </div>))}

</div>
</>
: ''

}


</div>

  </div></div>


{/*onClick={a}*/}




{/*      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

<EditModal
        show={modalEditShow}
        onHide={() => setModalEditShow(false)}
        deleteit={eventnumber}
        standards={standards}
/>*/}
    </>
);}

export default Coordinator;



function MyVerticallyCenteredModal(props) {
  const [color, setcolor] = useState('')
  const [inputs, setInputs] = useState({});
  const [submitted, setsubmitted] = useState(false)
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    

    setInputs(values => ({...values, [name]: value}))
  }
  
  const handleSubmit = async(event) => {
    event.preventDefault();
    
    var b = new Date(endDate);
    b.setDate(endDate.getDate()+1);
    b.toLocaleDateString();

    const data = {
      start_date: startDate.getFullYear()+'-'+(1+startDate.getMonth())+'-'+startDate.getDate(),
    end_date: b.getFullYear()+'-'+(1+b.getMonth())+'-'+(b.getDate()), 
    event_title: inputs.c,
    event_color: color

        
    }

    

    

    try {
        await axios.post('http://localhost:3580/insert_event/', data)
        props.onHide()
        
    } catch (error) {
        console.log('not approved', error)
    }
    console.log(inputs);

{/*
    var e = new Date(startDate)
    var f = new Date(startDate)

    while( e <= new Date(endDate)){
      f.setDate(f.getDate()+1)

    const data = {
      start_date: e.getFullYear()+'-'+(1+e.getMonth())+'-'+e.getDate(),
    end_date: f.getFullYear()+'-'+(1+f.getMonth())+'-'+(f.getDate()), 
    event_title: inputs.c,
    event_color: color

        
    }
    try {
      await axios.post('http://localhost:3580/insert_event/', data)
      props.onHide()
      
  } catch (error) {
      console.log('not approved', error)
  }
  e.setDate(e.getDate()+1)

    
      
    }
*/}


  }

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      id = 'myModal'
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          You are about to add an event to the calendar
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
       
        <form onSubmit={handleSubmit}>

      <div class="form-group">
    <label for="exampleFormControlTextarea1">Title</label>
    <input class="form-control" type="text" name="c" 
          
          value={inputs.c} 
          onChange={handleChange} />  </div>
          <br/>
  <div class="form-group">

<SketchPicker color={color} width='222px'
        onChangeComplete={(color)=>setcolor(color.hex) }/><br/>
  <DatePicker
      onChange={onChange}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      inline
      monthsShown={1}
    />
  <div style={{backgroundColor: color, width: '30px', height: '30px'}}> &nbsp;
    </div>
</div>
    </form>
    
      </Modal.Body>
      <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>Close</Button>
          <Button variant="primary" onClick={handleSubmit}>Save changes</Button>
        </Modal.Footer>
    </Modal>
  );
}



function EditModal(props) {
  const [color, setcolor] = useState('')
  const [inputs, setInputs] = useState({});
  const [submitted, setsubmitted] = useState(false)
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    

    setInputs(values => ({...values, [name]: value}))
  }

const [state, setState] = useState({
  selection1: {
    startDate: addDays(new Date(), 1),
    endDate: null,
    key: 'selection1'
  },
  selection2: {
    startDate: addDays(new Date(), 4),
    endDate: addDays(new Date(), 8),
    key: 'selection2'
  },
  selection3: {
    startDate: addDays(new Date(), 8),
    endDate: addDays(new Date(), 10),
    key: 'selection3',
    //autoFocus: false
  }
});

  
  const handleSubmit = async(event) => {
  
    var bb = new Date(endDate);
    bb.setDate(endDate.getDate()+1);
    bb.toLocaleDateString();
console.log("123456789",event)
    const data = {
      a: inputs.c,
      b: startDate.getFullYear()+'-'+(1+startDate.getMonth())+'-'+startDate.getDate(),
    c: bb.getFullYear()+'-'+(1+bb.getMonth())+'-'+(bb.getDate()), 
    d: color,
    e: event  
    }

    console.log("title ", data.a, "start ", data.b, "end ", data.c, "color ", data.d, "id ", data.e)
    

    try {
        await axios.put('http://localhost:3580/update_event/', data)
        props.onHide()
        
    } catch (error) {
        console.log('not approved', error)
    }
    console.log(inputs);
  }
  
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const highlightWithRanges = [
    {
      "react-datepicker__day--highlighted-custom-1": [
        new Date('2023-09-01'),
        new Date('2023-09-02'),
        new Date('2023-09-03'),
      ],
    },
    {
      "react-datepicker__day--highlighted": [
        new Date('2023-09-04'), 
        new Date('2023-09-05'), 
        new Date('2023-09-06'), 
        
      ],
    },
  ];

  const [showC, setShowC] = useState(false)

  const showColors = () =>{
    if (showC === false){
      setShowC(true)
    }
    else{
      setShowC(false)
    }
  } 

  const deleting = async(event) => {

    try {
      console.log(event)
        await axios.delete('http://localhost:3580/unsave_rotation/'+ event)
        props.onHide()
        
    } catch (error) {
        console.log('not approved', error)
    }
    console.log(inputs);
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      id = 'myModal'
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit this Event
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <h4 className='lining'>Update</h4>
        <form onSubmit={handleSubmit}>
     {/* <label>Start Date:
    <DatePicker inline selected={startDate} onChange={(date) => setStartDate(date)}/>
      </label>
      <label style={{float: 'right'}}>End Date:
     <DatePicker inline selected={endDate} onChange={(date) => setEndDate(date)}/>
  </label>*/}

      <div class="form-group">
    <label for="exampleFormControlTextarea1">Title</label>
    <input class="form-control" type="text" name="c" 
          
          value={inputs.c} 
          onChange={handleChange} />  </div>
          <br/>
  <div class="form-group">

<SketchPicker color={color} width='222px'
        onChangeComplete={(color)=>setcolor(color.hex)}/>
        
<DatePicker
      onChange={onChange}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      inline
      monthsShown={1}
      multiple
      
    />

</div>
    </form>



<h4 className='lining'>Delete</h4>

    
    <Button onClick={()=>deleting(props.deleteit)}>Remove</Button>
      </Modal.Body>
      <Modal.Footer>
        
          <Button variant="secondary" onClick={props.onHide}>Close</Button>
          <Button variant="primary" onClick={()=>handleSubmit(props.deleteit)}>Save changes</Button>
        </Modal.Footer>
    </Modal>
  );
}