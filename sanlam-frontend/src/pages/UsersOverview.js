import { useLocation, useNavigate } from 'react-router'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import {CSVLink} from 'react-csv'
const localizer = momentLocalizer(moment)



function UsersOverview() {
  const location = useLocation();
  
  const [selected, setSelected] = useState();
  const [modalShow, setModalShow] = React.useState(false);
  const [standards, setStandards] = useState([])
  const [mydates, setMyDates] = useState([])
  const [rname, setRname] = useState([])
  const [manager, setManager] = useState([])
  const navigate = useNavigate()
  const views={ month: true, week: false, day: false, agenda: false, }
  const handleSelected = (event) => {
    setSelected(event);
    console.info('[handleSelected - event]', event);
  };
  const n = localStorage.getItem('name')
  useEffect(() => {
    const fetchAdminData = async () => {
      
      try {
        const res = await axios.get('http://localhost:3580/get_user_feedback/' + location.state.data.user_id)
        setStandards(res.data)
        const m = await axios.get('http://localhost:3580/get_user_events/' + location.state.data.user_id)
        setMyDates(m.data)
        const r = await axios.get('http://localhost:3580/get_rotation_name/' + standards[0]?.manager)
        setRname(r.data)
        const s = await axios.get('http://localhost:3580/get_name_and_surname/'+ standards[0]?.manager)
        setManager(s.data)
        console.log("man",manager)
      } catch (error) {
        console.log(error)
      }
    }
    fetchAdminData()
  }, [])
  function a_clicked(a) {

      navigate('/feed', { state: { d: a.feedback_identifier, data: a } })
    
  }
  return (
    
    <div>
      {/* table */}
      <div className='container-fluid h-100'>

      <div className=''>
      <h3 class='sanlam-blue-text'>{location.state.data.first_name} {location.state.data.last_name}</h3>
    <br />
    <div style={{width: '1300px'}}></div>
    <Calendar
      selected={selected}
      onSelectEvent={handleSelected}
      localizer={localizer}
      events={mydates}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      views={views}
      eventPropGetter={event => { 
        const backgroundColor = event.event_color; return { style: { backgroundColor } }; }}
      
    />

<div class="album py-5 bg-light">
        <div class="container">
        {standards.length >0? <h3 class='sanlam-blue-text'>Rotation Feedback</h3>:''}
          <div class="row">
            {standards.map((u) => (
              <div class="col-md-4">
                <div class="card mb-4 box-shadow">
                  <Card style={{ margin: '2px', border: "none" }}

                  >
                    <Card.Body>                
                      <Button variant='outline-primary' style={{borderRadius: "0px", width: '100%'}} onClick={() => a_clicked(u)}>View Rotation Feedback</Button>
                    </Card.Body>
                  </Card>
                </div>
              </div>))}

          </div>
        </div>
      </div>

    <div>

{/*
          <Table  bordered hover>
      <thead style={{backgroundColor: "#0075c9", textAlign: 'center', color: 'white'}}>
        <tr>
          <th colSpan={12}>SANLAM DATA AND DIGITAL ACADEMY ROTATION REVIEW			</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan={4}>Name of Graduate:</td>
          <td colSpan={2}>{standards[0]?.user_id}</td>
          <td colSpan={4}>Rotation Owner:</td>
          <td colSpan={2}>{standards[0]?.manager}</td>
        </tr>
        <tr>
          <td colSpan={4}>Rotation Name:</td>
          <td colSpan={2}></td>
          <td colSpan={4}>Date:</td>
          <td colSpan={2}></td>
        </tr>
        <tr>
          <td colSpan={4}>Overall Rating: Behavioural Competencies</td>
          <td colSpan={2}>{(standards[0]?.collaborative + standards[0]?.innovative + standards[0]?.care + standards[0]?.integrity + standards[0]?.behaviour)/13}</td>
          <td colSpan={4}>Overall Rating: Software / Tools / Technical Skills</td>
          <td colSpan={2}>{(standards[0]?.int_a + standards[0]?.int_b + standards[0]?.int_c)/3}</td>
        </tr>
      </tbody>
    </Table>

          <Table  bordered hover>
      <thead style={{backgroundColor: "#0075c9", textAlign: 'center', color: 'white'}}>
        <tr>
          <th colSpan={12}>Collaborative	<br/>		
Unlocking our Winning As One spirit by focusing on a better outcome for all, achieved through partnership & an open-minded approach to everythig.			</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan={4}>Observed behaviour</td>
          <td colSpan={6}>Comments</td>
          <td colSpan={2}>Rating</td>
        </tr>
        <tr>
          <td colSpan={4}>Involves & consults with others to reach objectives.	</td>
          <td colSpan={6}>{standards[0]?.collab_1}</td>
          <td colSpan={2}>{standards[0]?.collab_a}</td>
        </tr>
        <tr>
          <td colSpan={4}>Shares information, skill & knowledge with others to create better outcomes.	</td>
          <td colSpan={6}>{standards[0]?.collab_2}</td>
          <td colSpan={2}>{standards[0]?.collab_b}</td>
        </tr>
        <tr>
          <td colSpan={4}>Builds cooperative (win-win) relationships with others & assists them in goal achievement.	</td>
          <td colSpan={6}>{standards[0]?.collab_3}</td>
          <td colSpan={2}>{standards[0]?.collab_c}</td>
        </tr>
        <tr style={{backgroundColor: "grey"}}>
          <td colSpan={10}>AVERAGE RATING FOR COLLABORATIVE</td>
          <td colSpan={2}>{standards[0]?.collaborative}</td>
        </tr>
      </tbody>
    </Table>

    <Table  bordered hover>
      <thead style={{backgroundColor: "#0075c9", textAlign: 'center', color: 'white'}}>
        <tr>
          <th colSpan={12}>Innovative	<br/>		
Always striving for continuous improvement to create value for our stakeholders, our society & our world.			</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan={4}>Observed behaviour</td>
          <td colSpan={6}>Comments</td>
          <td colSpan={2}>Rating</td>
        </tr>
        <tr>
          <td colSpan={4}>Provides ideas & solutions to improve products, service delivery or value-add.	</td>
          <td colSpan={6}>{standards[0]?.innov_1}</td>
          <td colSpan={2}>{standards[0]?.innov_a}</td>
        </tr>
        <tr>
          <td colSpan={4}>Encourages others to make creative suggestions & brainstorms different ways of working.	</td>
          <td colSpan={6}>{standards[0]?.innov_2}</td>
          <td colSpan={2}>{standards[0]?.innov_b}</td>
        </tr>
        <tr>
          <td colSpan={4}>Seeks out opportunities to continuously update their knowledge, skills & methods.	</td>
          <td colSpan={6}>{standards[0]?.innov_3}</td>
          <td colSpan={2}>{standards[0]?.innov_c}</td>
        </tr>
        <tr style={{backgroundColor: "grey"}}>
          <td colSpan={10}>AVERAGE RATING FOR RESILIENT</td>
          <td colSpan={2}>{standards[0]?.innovative}</td>
        </tr>

      </tbody>
    </Table>

    <Table  bordered hover>
      <thead style={{backgroundColor: "#0075c9", textAlign: 'center', color: 'white'}}>
        <tr>
          <th colSpan={12}>Care	<br/>		
Serving with empathy & consideration, knowing that everything we do leaves a lasting impact & legacy.			</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan={4}>Observed behaviour</td>
          <td colSpan={6}>Comments</td>
          <td colSpan={2}>Rating</td>
        </tr>
        <tr>
          <td colSpan={4}>Respects the needs & feelings of others & takes action to include their perspectives.	</td>
          <td colSpan={6}>{standards[0]?.care_1}</td>
          <td colSpan={2}>{standards[0]?.care_a}</td>
        </tr>

        <tr>
          <td colSpan={4}>Recognises & communicates the impact & implications of their actions & decisions on other stakeholders.	</td>
          <td colSpan={6}>{standards[0]?.care_2}</td>
          <td colSpan={2}>{standards[0]?.care_b}</td>
        </tr>
        <tr>
          <td colSpan={4}>Explains the bigger picture & identifies sustainable solutions.	</td>
          <td colSpan={6}>{standards[0]?.care_3}</td>
          <td colSpan={2}>{standards[0]?.care_c}</td>
        </tr>
        <tr style={{backgroundColor: "grey"}}>
          <td colSpan={10}>AVERAGE RATING FOR RESULTS-DRIVEN		</td>
          <td colSpan={2}>{standards[0]?.care}</td>
        </tr>

      </tbody>
    </Table>


    <Table  bordered hover>
      <thead style={{backgroundColor: "#0075c9", textAlign: 'center', color: 'white'}}>
        <tr>
          <th colSpan={12}>Integrity	<br/>		
Unwavering in the pursuit to do the right thing, resolute in our commitment to what's good for all our stakeholders.			</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan={4}>Observed behaviour</td>
          <td colSpan={6}>Comments</td>
          <td colSpan={2}>Rating</td>
        </tr>

        <tr>
          <td colSpan={4}>Takes responsibility for their own work & holds themselves accountable for actions & decisions.	</td>
          <td colSpan={6}>{standards[0]?.int_1}</td>
          <td colSpan={2}>{standards[0]?.int_a}</td>
        </tr>
        <tr>
          <td colSpan={4}>Emphasises principles & standards in their actions & decisions & questions those of others when necessary.	</td>
          <td colSpan={6}>{standards[0]?.int_2}</td>
          <td colSpan={2}>{standards[0]?.int_b}</td>
        </tr>
        <tr>
          <td colSpan={4}>Demonstrates reliability by delivering on promises & executing tasks to the best of their ability.	</td>
          <td colSpan={6}>{standards[0]?.int_3}</td>
          <td colSpan={2}>{standards[0]?.int_c}</td>
        </tr>
        <tr style={{backgroundColor: "grey"}}>
          <td colSpan={10}>AVERAGE RATING FOR INTEGRITY</td>
          <td colSpan={2}>{standards[0]?.integrity}</td>
        </tr>
      </tbody>
    </Table>

    <Table  bordered hover>
      <thead style={{backgroundColor: "#0075c9", textAlign: 'center', color: 'white'}}>
        <tr>
          <th colSpan={12}>Other Behavioural Skills	<br/>		
Please comment on any additional behavioural skills below that were displayed during the rotation and indicate level of competency for each.			
</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan={4}>Behavioural Skills (use examples provided below, and/or add your own)</td>
          <td colSpan={6}>Comments</td>
          <td colSpan={2}>Rating</td>
        </tr>

        <tr>
          <td colSpan={4}>Analysis </td>
          <td colSpan={6}>{standards[0]?.a}</td>
          <td colSpan={2}>{standards[0]?.b}</td>
        </tr>
        <tr>
          <td colSpan={4}>Aptitude and Attitude
</td>     <td colSpan={6}>{standards[0]?.c}</td>
          <td colSpan={2}>{standards[0]?.d}</td>
        </tr>
        <tr>
          <td colSpan={4}>Ask correct questions</td>
          <td colSpan={6}>{standards[0]?.e}</td>
          <td colSpan={2}>{standards[0]?.f}</td>
        </tr>
        <tr>
          <td colSpan={4}>Attention to detail</td>
          <td colSpan={6}>{standards[0]?.g}</td>
          <td colSpan={2}>{standards[0]?.h}</td>
        </tr>
        <tr>
          <td colSpan={4}>Listens and seeks to understand</td>
          <td colSpan={6}>{standards[0]?.i}</td>          
          <td colSpan={2}>{standards[0]?.j}</td>
        </tr>
        <tr>
          <td colSpan={4}>Meeting deadlines</td>
          <td colSpan={6}>{standards[0]?.k}</td>
          <td colSpan={2}>{standards[0]?.l}</td>
        </tr>
        <tr>
          <td colSpan={4}>Presentations</td>
          <td colSpan={6}>{standards[0]?.m}</td>
          <td colSpan={2}>{standards[0]?.n}</td>
        </tr>
        <tr>
          <td colSpan={4}>Problem-solving</td>
          <td colSpan={6}>{standards[0]?.o}</td>
          <td colSpan={2}>{standards[0]?.p}</td>
        </tr>
        <tr>
          <td colSpan={4}>Resourcefulness</td>
          <td colSpan={6}>{standards[0]?.q}</td>
          <td colSpan={2}>{standards[0]?.r}</td>
        </tr>
      </tbody>
    </Table>

    <Table  bordered hover>
      <thead style={{backgroundColor: "#0075c9", textAlign: 'center', color: 'white'}}>
        <tr>
          <th colSpan={12}>General			<br/>
Please be as specific as possible in your comments below			
</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan={4}>Questions</td>
          <td colSpan={8}>Comments</td>
        </tr>

        <tr>
          <td colSpan={4}>Do you feel the graduate has the aptitude to pursue a longer term career in your area?</td>
          <td colSpan={8}>{standards[0]?.w}</td>
        </tr>
        <tr>
          <td colSpan={4}>What are the person's observable strengths?</td>
          <td colSpan={8}>{standards[0]?.x}</td>
        </tr>
        <tr>
          <td colSpan={4}>What could the person have done differently, or improved on, to enhance his/her performance?</td>
          <td colSpan={8}>{standards[0]?.y}</td>
        </tr>
        <tr>
          <td colSpan={4}>If it was up to you, would you hire this person?</td>
          <td colSpan={8}>{standards[0]?.z}</td>
        </tr>
      </tbody>
    </Table>
          <br/><br/>
        
          <h3 class='sanlam-blue-text'>Feedback from Rotation Owners:</h3>
          
           <CSVLink data={standards} filename='feedback' className='btn btn-success'>Excel Export</CSVLink>
            */}
 
    </div>



      </div>
    </div>
  </div>
  )
}

export default UsersOverview

