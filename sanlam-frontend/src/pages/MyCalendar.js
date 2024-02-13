import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/esm/Table';
import axios from 'axios'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-big-calendar/lib/css/react-big-calendar.css';
const localizer = momentLocalizer(moment)

const views={ month: true, week: true, day: true, agenda: true,}
function MyCalendar(props){
  const n = localStorage.getItem('name')
  const [selected, setSelected] = useState();
  const [standards, setStandards] = useState([])

const [modalEditShow, setModalEditShow] = React.useState(false);
const [laters, setlater] = useState([])
const [on, seton] = useState([])
  const [mydata, setmydata] = useState([])
  const [datas, setdatas] = useState([])
  const [fing, setmyf] = useState([])
  const [eventnumber, seteventnumber] = React.useState('')
  const [showForm, setShowForm] = useState(false)
  useEffect(() => {
    const fetchAdminData = async () => {
      
      try {
        const res = await axios.get('http://localhost:3580/get_user_events/' + n)
  
        setStandards(res.data)

        console.log(standards)
      } catch (error) {
        console.log(error)
      }
    }
    fetchAdminData()
  }, [])



  const handleSelected = async(event) => {
    setSelected(event);
         
    if(new Date(event.start) <= new Date() & new Date(event.end) <= new Date()){
      setShowForm(true)
      console.log("1")
      try
  {  
    const res = await axios.get('http://localhost:3580/get_my_feedback/' + [n, event.event_id])
    setmyf(res.data)
    

      seteventnumber(event.event_id)
  }
  catch(error){
    console.log("::::")
  }
    } 
    else

    {setModalEditShow(true)
      console.log("2")
      setShowForm(false)
      setmyf([])
      seteventnumber(event.event_id)
    }
  
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    const mydate = new Date()

    const data = {
      event_id: eventnumber, 
    user_id: n, 
    engaging: inputs.c,  
    effective: inputs.d, 
    insightful: inputs.e, 
    pace: inputs.f, 
    review: inputs.g, 
    date_posted: mydate.getFullYear()+'-'+(1+mydate.getMonth())+'-'+mydate.getDate()

        
    }
    console.log(data)
    try {
  
        await axios.post('http://localhost:3580/insert_feedback/', data)
        setShowForm(false)
        setmyf(['hello'])
        console.log("success")
        
    } catch (error) {
        console.log('not approved', error)
    }
  }

const round=(value)=> {
  return Math.round(value * 0.5) / 0.5;
}  
const [modalShow, setModalShow] = React.useState(false);

const [inputs, setInputs] = useState({});

const handleChange = (event) => {
  const name = event.target.name;
  const value = event.target.value;
  setInputs(values => ({...values, [name]: value}))
}

  return(
  <>
      <div class="album py-5 bg-light">
        <div class="container">
        <h3 class='sanlam-blue-text'>Your Calendar</h3>
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
        + your leave days
      </Button>
        </div>
      </div>

{(showForm & fing.length === 0) ? <>
  <Table borderless hover style={{backgroundColor: "white"}}>
      
      <thead >
        <tr><td colSpan={12}>1. Feedback</td></tr>
        <tr>
        {['',"Strongly Disagree","Disagree", "Unsure", "Agree", "Strongly Agree"].map(A=><th style={{textAlign: 'center'}} colSpan={2}>{A}</th>)}      
        </tr>
      </thead>
      <tbody>
{/*        {["The presentation was engaging and interactive / I felt involved", "The presenter was effective", "The content was interesting / insightful / useful"].map(Q=><tr><td colSpan={2}>{Q}</td>{["Strongly Disagree","Disagree", "Unsure", "Agree", "Strongly Agree"].map(A=><td colSpan={2} style={{textAlign: 'center'}}>          <Form.Check
            
            name={Q}
            type='radio'
            value={A}
/></td>)}</tr>)}*/}
        {["The presentation was engaging and interactive / I felt involved"].map(Q=><tr><td colSpan={2}>{Q}</td>{["Strongly Disagree","Disagree", "Unsure", "Agree", "Strongly Agree"].map(A=><td colSpan={2} style={{textAlign: 'center'}}>          <Form.Check
            
            name='c'
            type='radio'
            value={A}
            onChange={handleChange}
/></td>)}</tr>)}
        {["The presenter was effective"].map(Q=><tr><td colSpan={2}>{Q}</td>{["Strongly Disagree","Disagree", "Unsure", "Agree", "Strongly Agree"].map(A=><td colSpan={2} style={{textAlign: 'center'}}>          <Form.Check
            
            name='d'
            type='radio'
            value={A}
            onChange={handleChange}
/></td>)}</tr>)}
       {["The content was interesting / insightful / useful"].map(Q=><tr><td colSpan={2}>{Q}</td>{["Strongly Disagree","Disagree", "Unsure", "Agree", "Strongly Agree"].map(A=><td colSpan={2} style={{textAlign: 'center'}}>          <Form.Check
            
            name='e'
            type='radio'
            value={A}
            onChange={(choice)=>handleChange(choice)}
/></td>)}</tr>)}

          <tr>
            <td colSpan={12}></td>
          </tr>
          <tr>
            <td colSpan={12}></td>
          </tr>
          <tr>
            <td colSpan={12}></td>
          </tr>
       

      </tbody>

      <thead >
        <tr> <td colSpan={12}>2. Pace: ranging from 1 (way to slow) through 3 (the pace worked for me) through to 5 (way too fast)</td></tr>
        <tr>
        {['',"Too Slow","Slow", "Good", "Fast", "Too Fast"].map(A=><th style={{textAlign: 'center'}} colSpan={2}>{A}</th>)}      
        </tr>
      </thead>
      <tbody>
        {["Pace of training"].map(Q=><tr><td colSpan={2}>{Q}</td>{["Too Slow","Slow", "Good", "Fast", "Too Fast"].map(A=><td colSpan={2} style={{textAlign: 'center'}}>          <Form.Check
            
            name='f'
            type='radio'
            value={A}
            onChange={handleChange}
          /></td>)}</tr>)}
                    <tr>
            <td colSpan={12}></td>
          </tr>
          <tr>
            <td colSpan={12}></td>
          </tr>  
          <tr>
            <td colSpan={12}></td>
          </tr>
       
      </tbody>

      <thead >
        <tr> <td colSpan={12}>3. Progress Level, Support and Interactions</td></tr>
      </thead>
      <tbody>
        <tr><td colSpan={12}>
 <div class="form-group">

    <textarea class="form-control" id="exampleFormControlTextarea1" placeholder='a description of what your team does on a day to day' rows="3"  type="text" 
          name="g" 
        
          onChange={handleChange}></textarea>

  </div>         
          </td></tr>
      </tbody>
    </Table>
<Button onClick={handleSubmit}>Submit</Button>


</>: "don't show"}
 

  
 

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        setStandards={setStandards}
      />
      
    </>
);}

export default MyCalendar;



function MyVerticallyCenteredModal(props) {
  const [inputs, setInputs] = useState({});
  const n = localStorage.getItem('name')
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
    user_id: n

        
    }
    console.log(data)
    try {
  
        await axios.post('http://localhost:3580/insert_leave/', data)
        const res = await axios.get('http://localhost:3580/get_user_events/' + n)
        props.onHide()
        props.setStandards(res.data)
        
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
          Insert your leave days
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

    <form onSubmit={handleSubmit}>
      <label>Start Date:
    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}/>
      </label>
      <label style={{float: 'right'}}>End Date:
     <DatePicker selected={endDate} onChange={(date) => setEndDate(date)}/>
        </label>
          
    </form>

      </Modal.Body>
      <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>Close</Button>
          <Button variant="primary" onClick={handleSubmit}>Save changes</Button>
        </Modal.Footer>
    </Modal>
  );
}


