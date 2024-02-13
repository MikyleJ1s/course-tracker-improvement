import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import axios from 'axios'
import {DatePicker as DateP, DateObject } from "react-multi-date-picker";
import Toast from 'react-bootstrap/Toast'
import React, {useRef} from 'react'
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
//import DatePicker from "react-datepicker";
import DatePicker from "react-datepicker"
import { Calendar as CalRange} from "react-multi-date-picker"
import { CirclePicker, CompactPicker, SketchPicker, TwitterPicker } from 'react-color';

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
let myarray = ['11']
const views={ month: true, week: false, day: true, agenda: false, }
function Management(props){
  const [selected, setSelected] = useState();
  const n = localStorage.getItem('name')
  const [standards, setStandards] = useState([])
  const [standard, setStandard] = useState([])
  const [mydata, setmydata] = useState([])
  const [datas, setdatas] = useState([])
  const [eventdetails, seteventdetails] = useState([])
  let [m, j] = useState(['2023-10-11', '2023-10-12'])
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
    const gd = await axios.get('http://localhost:3580/get_dates/' + event.event_id)
  seteventdetails(gd.data)
  const mya = []
  const one = new Date(gd.data[0].start)
  var ii = 0
  while ( one < new Date(gd.data[0].end)) {
    mya.push(one.getFullYear()+'-'+(1+one.getMonth())+'-'+one.getDate())   
    one.setDate(one.getDate()+1)
    ii++
  }

  j(mya)
  //j([new Date(gd.data[0].start).getFullYear()+'-'+(1+new Date(gd.data[0].start).getMonth())+'-'+new Date(gd.data[0].start).getDate()])
}
catch(error){
  console.log("::::")
}
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

  const filtering = async (e) => {
  
    try {
        const res = await axios.get('http://localhost:3580/filter_events/' + e)
        setStandards(res.data)
        console.log(standards)
      } catch (error) {
        console.log(error)
      }
    }
  const [eventnumber, seteventnumber] = React.useState('')
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
  alert(data.datasets[datasetindexnumber].info[datapoint].title);

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
const h = (e)=>{
  
  aaa(e.target.value)
}

const checking = (e)=>{
  
  if (e.target.checked)
  {aaa(e.target.value)
  myarray = [...myarray, e.target.value]
  filtering(myarray)
  console.log("u",myarray)
  }
  else{
    myarray = myarray.filter(f=>f !== e.target.value)
    filtering(myarray)
    console.log("d",myarray)
    
    

  }
}

const [show, setShow] = useState(false);
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
    
  
  <Button variant="outline-primary" style={{borderRadius: "0px"}} onClick={() => setModalShow(true)}>
        + an event
      </Button>
      
        <Form><><div key={'inline-radio'} className="mb-3">
      <Form.Check
            inline
            label='Year Curriculum'
            name="group1"
            type='radio'
            onChange={()=>aaa(11)}
          />
          {standard.map((type) => (
        
          <Form.Check
            inline
            label={type.first_name+' '+type.last_name}
            name="group1"
            type='radio'
            value={type.user_id}
            onChange={h}
          />
        
      ))}
                </div>
          </>
    </Form>
  </div></div>


{/*{standard.map(i=>
    <div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value={i.user_id} onChange={checking}/>
  <label class="form-check-label" for="inlineCheckbox1">{i.first_name + ' ' + i.last_name}</label>
</div>  
)}*/}

        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>

          <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
        </Toast>
              {/*<Button onClick={() => setShow(true)}>Show Toast</Button>
   */} 
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        standards = {standards}
        setStandards = {setStandards}
      />

<EditModal
        show={modalEditShow}
        onHide={() => setModalEditShow(false)}
        deleteit={eventnumber}
        standards={standards}
        setStandards = {setStandards}
        eventdetails = {eventdetails}
        seteventdetails = {seteventdetails}
        m = {m}
        j = {j}
      />
    </>
);}

export default Management;



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
  }
  const today = new Date()
  const tomorrow = new Date('2023-09-30')

  tomorrow.setDate(tomorrow.getDate() + 1)
{/*

*/}
  const newdates = [new Date('2023-09-09'), new Date('2023-09-21')]
const mikyle = async() => {
  values.sort((a, b) => new Date(a.toString()) - new Date(b.toString()));
const array = []
let s = new Date(values[0].toString())
let l = new Date(s)

for (let i = 1; i <= values.length; i++) { // i =4
  if (i < values.length){
    console.log((new Date(values[i].toString()).getFullYear() +"==="+ new Date(l).getFullYear())+ " & "+ (new Date(values[i].toString()).getMonth()+"==="+ new Date(l).getMonth()) +" &" + (new Date(values[i].toString()).getDate() +" === "+ (1+new Date(l).getDate())))

   if ((new Date(values[i].toString()).getFullYear() === new Date(l).getFullYear()) & (new Date(values[i].toString()).getMonth() === new Date(l).getMonth()) & (new Date(values[i].toString()).getDate() === (1+new Date(l).getDate()))){ // 8 == 7+1
    l = new Date(values[i].toString()) // l = 8
    console.log("yeahhhhhhhhh")
    console.log(s + " - "+ l)
    }
  else{ 
    //draw(start, j) 
    console.log("nah")
    console.log(s + " - " + l) // 1 - 3
    array.push({titl: 'hi'})
    l.setDate(l.getDate()+1)
    l.toLocaleDateString()

    newstandards.push({title: inputs.c, start: new Date(s), end: new Date(l), mycolor: 'yellow'})
    const data = {
      start_date: s.getFullYear()+'-'+(1+s.getMonth())+'-'+s.getDate(),
    end_date: l.getFullYear()+'-'+(1+l.getMonth())+'-'+(l.getDate()), 
    event_title: inputs.c,
    event_color: color
  
        
    }
    console.log("mikyle jones:", data)
    await axios.post('http://localhost:3580/insert_event/', data)
  
    console.log(newstandards)
        s = new Date(values[i].toString()) // s = 7
    l = new Date(s) // l = 7
    console.log("next")

}}
else{
  console.log("outside")
  l.setDate(l.getDate()+1)
  l.toLocaleDateString()

  newstandards.push({title: inputs.c, start: new Date(s), end: new Date(l), mycolor: 'yellow'})
  const data = {
    start_date: s.getFullYear()+'-'+(1+s.getMonth())+'-'+s.getDate(),
  end_date: l.getFullYear()+'-'+(1+l.getMonth())+'-'+(l.getDate()), 
  event_title: inputs.c,
  event_color: color

      
  }
  console.log("mikyle jones:", data)
  await axios.post('http://localhost:3580/insert_event/', data)
  props.onHide()
const res = await axios.get('http://localhost:3580/get_events/' + "11")
props.setStandards(res.data)
console.log("hmmmm")
}
}


}
const [focus, setFocus] = useState('startDate');
const [newstandards, setnewstandards] = useState([])
  const [values, setValues] = useState(['2023-05-05'])
  const [rating, setRating] = useState('')

const [mydatesare, setdateare] = useState([{start: new Date('2023-10-03'), end: new Date('2023-10-04'), mycolor: 'green'}, {start: new Date('2023-10-06'), end: new Date('2023-10-10'), mycolor: 'red'}])
return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      id = 'myModal'
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
       

<CalRange
  multiple
  onChange={setValues}
style={{border: '3px solid '+color}}
  
/>
<br/>

    <label for="exampleFormControlTextarea1">Title</label>
    <input class="form-control" type="text" name="c" style={{marginBottom: '10px'}}
          
          value={inputs.c} 
          onChange={handleChange} />  

<CirclePicker color={color}
        onChangeComplete={(color)=>setcolor(color.hex) } circleSpacing="10px" width='300px'/><br/>
    
      </Modal.Body>
      <Modal.Footer>
          {/*<Button variant="secondary" onClick={props.onHide}>Close</Button>*/}
          <Button variant="primary" onClick={mikyle} style={{backgroundColor: color}}>Save Event</Button>
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
    const [newstandards, setnewstandards] = useState([])
//    {props.eventdetails.map(n=>new Date(n.start).getFullYear()+'-'+(1+new Date(n.start).getMonth())+'-'+new Date(n.start).getDate())}
  let v = ['2023-10-20', '2023-10-23']
  let [w, ww] = useState(props.eventnumber)
  //.map(n =>new Date(n?.start).getFullYear()+'-'+(1+new Date(n?.start).getMonth())+'-'+new Date(n?.start).getDate())]
    const mikyle = async() => {
      
 props.j(values)
 console.log("values =", values)
      values.sort((a, b) => new Date(a.toString()) - new Date(b.toString()));
    const array = []
    let s = new Date(values[0][0].toString())
    let l = new Date(s)
    
    for (let i = 1; i <= values[0].length; i++) { // i =4
      if (i < values[0].length){
        console.log((new Date(values[0][i].toString()).getFullYear() +"==="+ new Date(l).getFullYear())+ " & "+ (new Date(values[0][i].toString()).getMonth()+"==="+ new Date(l).getMonth()) +" &" + (new Date(values[0][i].toString()).getDate() +" === "+ (1+new Date(l).getDate())))
    
       if ((new Date(values[0][i].toString()).getFullYear() === new Date(l).getFullYear()) & (new Date(values[0][i].toString()).getMonth() === new Date(l).getMonth()) & (new Date(values[0][i].toString()).getDate() === (1+new Date(l).getDate()))){ // 8 == 7+1
        l = new Date(values[0][i].toString()) // l = 8
        console.log("yeahhhhhhhhh")
        console.log(s + " - "+ l)
        }
      else{ 
        //draw(start, j) 
        console.log("nah")
        console.log(s + " - " + l) // 1 - 3
        array.push({titl: 'hi'})
        l.setDate(l.getDate()+1)
        l.toLocaleDateString()
    
        newstandards.push({title: inputs.c, start: new Date(s), end: new Date(l), mycolor: 'yellow'})
        const data = {
          start_date: s.getFullYear()+'-'+(1+s.getMonth())+'-'+s.getDate(),
        end_date: l.getFullYear()+'-'+(1+l.getMonth())+'-'+(l.getDate()), 
        event_title: props.eventdetails[0].title,
        event_color: props.eventdetails[0].event_color
      
            
        }
        console.log("mikyle jones:", data)
        await axios.post('http://localhost:3580/insert_event/', data)
      
        console.log(newstandards)
            s = new Date(values[0][i].toString()) // s = 7
        l = new Date(s) // l = 7
        console.log("next")
    
    }}
    else{
      console.log("outside")
      l.setDate(l.getDate()+1)
      l.toLocaleDateString()

      console.log(l)
    
      newstandards.push({title: inputs.c, start: new Date(s), end: new Date(l), mycolor: 'yellow'})
      const data = {
        start_date: s.getFullYear()+'-'+(1+s.getMonth())+'-'+s.getDate(),
      end_date: l.getFullYear()+'-'+(1+l.getMonth())+'-'+(l.getDate()), 
      event_title: props.eventdetails[0].title,
      event_color: props.eventdetails[0].event_color
    
          
      }
      console.log("mikyle jones:", data)
      await axios.post('http://localhost:3580/insert_event/', data)
      props.onHide()
    const res = await axios.get('http://localhost:3580/get_events/' + "11")
    props.setStandards(res.data)
    console.log("hmmmm")
    }
    }

    setValues('')
    deleting(props.deleteit)
    
    
    }
    const mydatesare = [{start: new Date('2023-10-03'), end: new Date('2023-10-04'), mycolor: 'green'}, {start: new Date('2023-10-06'), end: new Date('2023-10-10'), mycolor: 'red'}]
    const [values, setValues] = useState([])
    const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;



    setInputs(values => ({...values, [name]: value}))
  }
 
  const handleSubmit = async(event) => {
  
    var bb = new Date(endDate);
    bb.setDate(endDate.getDate()+1);
    bb.toLocaleDateString();
 
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
        const res = await axios.get('http://localhost:3580/get_events/' + "11")
props.setStandards(res.data)
        
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

  const deleting = async(event) => {

    try {
      console.log(event)
        await axios.delete('http://localhost:3580/unsave_rotation/'+ event)
        props.onHide()
        const res = await axios.get('http://localhost:3580/get_events/' + "11")
props.setStandards(res.data)
        
    } catch (error) {
        console.log('not approved', error)
    }
    console.log(inputs);
  }

  const onChangeDate = e => {
    setValues([e.map(ee=>new Date(ee.toString()).getFullYear()+'-'+(1+new Date(ee.toString()).getMonth())+'-'+new Date(ee.toString()).getDate())]);
    //props.j(['2023-10-01', '2023-10-02'])
  };
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      id = 'myModal'
      centered
    >
     <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
         {/*  {props.eventdetails[0]?.title} */}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
      
{/*<DatePicker
      onChange={onChange}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      inline
      monthsShown={1}
      multiple
/>*/}

        <CalRange
  style={{border: '3px solid '+color}}
  /*mapDays={({ date }) => {
    let color
    mydatesare.map(m=>{
      //if ([m.start.getDate()].includes(date.day) & [m.start.getMonth()].includes(date.month.index) & [m.start.getFullYear()].includes(date.year)) color= m.mycolor
      if (date.day <= m.end.getDate() & date.day >= m.start.getDate() & [m.start.getMonth()].includes(date.month.index) & [m.start.getFullYear()].includes(date.year)) color = m.mycolor
    })

    if (color) return {disabled: false, style: {border: '1px solid '+color, borderRadius: 10,} }
  }}*/
  multiple
  //fullYear
  value={props.m}
  
  onChange={onChangeDate}
  
/>
<br/>

    <label for="exampleFormControlTextarea1">Title</label>
    <input class="form-control" type="text" name="c"   style={{marginBottom: '10px'}}         
          value={inputs.c || props.eventdetails[0]?.title} 
          onChange={handleChange} />  
<CirclePicker color={color} circleSpacing="10px" width='300px' onChangeComplete={(color)=>setcolor(color.hex)}/>



      </Modal.Body>
      <Modal.Footer>
              <Button variant='outline-primary' onClick={()=>deleting(props.deleteit)}><i className='bi bi-trash'/></Button>
          <Button variant="primary" style={{backgroundColor: color}} onClick={mikyle}>Save Changes</Button>
        </Modal.Footer>
    </Modal>
  );
}