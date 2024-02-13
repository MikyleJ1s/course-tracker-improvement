import { useLocation } from 'react-router'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import { DownloadTableExcel } from 'react-export-table-to-excel';

function Feedback() {
  const location = useLocation();
  const [manager, setManager] = React.useState('');
  const [grad, setGrad] = React.useState('');
  const [rname, setRname] = React.useState('');

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const res = await axios.get('http://localhost:3580/get_name_and_surname/'+ location.state.data.manager)
        setManager(res.data)
                console.log("man",res.data)
        const username = await axios.get('http://localhost:3580/get_name_and_surname/' + location.state.data.user_id)
        setGrad(username.data)
                console.log("grad",username.data)
        const r = await axios.get('http://localhost:3580/get_rotation_name/' + location.state.data.manager)
        setRname(r.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchAdminData()
  }, [])

  const tableRef = useRef(null);

  return (
    
    <div>
      {/* table */}
      <div className='container-fluid h-100'>

      <div className=''>
      <h3 class='sanlam-blue-text'>Rotation Feedback</h3>
    <br />
    <div>

          
    <DownloadTableExcel
                    filename={grad[0]?.first_name}
                    sheet="users"
                    
                    
                    
                    currentTableRef={tableRef.current}
                >

                   <button> Export excel </button>

                </DownloadTableExcel>
                

<Table ref={tableRef}>
<Table bordered hover>
      <thead >
        <tr>
          <th style={{backgroundColor: "#0075c9", textAlign: 'center', color: 'white'}} colSpan={12}>SANLAM DATA AND DIGITAL ACADEMY ROTATION REVIEW			</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan={4}>Name of Graduate:</td>
          <td colSpan={2}>{grad[0]?.first_name} {grad[0]?.last_name}</td>
          <td colSpan={4}>Rotation Owner:</td>
          <td colSpan={2}>{manager[0]?.first_name} {manager[0]?.last_name}</td>
        </tr>
        <tr>
          <td colSpan={4}>Rotation Name:</td>
          <td colSpan={2}>{rname[0]?.name}</td>
          <td colSpan={4}>Date:</td>
          <td colSpan={2}></td>
        </tr>
        <tr>
          <td colSpan={4}>Overall Rating: Behavioural Competencies</td>
          <td colSpan={2}>{Math.round(((location.state.data.collaborative + location.state.data.innovative + location.state.data.care + location.state.data.integrity + location.state.data.behaviour)/13))/2}</td>
          <td colSpan={4}>Overall Rating: Software / Tools / Technical Skills</td>
          <td colSpan={2}></td>
        </tr>
      </tbody>
    </Table>

          <Table  bordered hover>
      <thead >
        <tr>
          <th style={{backgroundColor: "#0075c9", textAlign: 'center', color: 'white'}} colSpan={12}>Collaborative	<br/>		
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
          <td colSpan={6}>{location.state.data.collab_1}</td>
          <td colSpan={2}>{location.state.data.collab_a}</td>
        </tr>
        <tr>
          <td colSpan={4}>Shares information, skill & knowledge with others to create better outcomes.	</td>
          <td colSpan={6}>{location.state.data.collab_2}</td>
          <td colSpan={2}>{location.state.data.collab_b}</td>
        </tr>
        <tr>
          <td colSpan={4}>Builds cooperative (win-win) relationships with others & assists them in goal achievement.	</td>
          <td colSpan={6}>{location.state.data.collab_3}</td>
          <td colSpan={2}>{location.state.data.collab_c}</td>
        </tr>
        <tr style={{backgroundColor: "grey"}}>
          <td colSpan={10}>AVERAGE RATING FOR COLLABORATIVE</td>
          <td colSpan={2}>{Math.round(location.state.data.collaborative*2)/2}</td>
        </tr>
      </tbody>
    </Table>

    <Table  bordered hover>
      <thead >
        <tr>
          <th style={{backgroundColor: "#0075c9", textAlign: 'center', color: 'white'}} colSpan={12}>Innovative	<br/>		
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
          <td colSpan={6}>{location.state.data.innov_1}</td>
          <td colSpan={2}>{location.state.data.innov_a}</td>
        </tr>
        <tr>
          <td colSpan={4}>Encourages others to make creative suggestions & brainstorms different ways of working.	</td>
          <td colSpan={6}>{location.state.data.innov_2}</td>
          <td colSpan={2}>{location.state.data.innov_b}</td>
        </tr>
        <tr>
          <td colSpan={4}>Seeks out opportunities to continuously update their knowledge, skills & methods.	</td>
          <td colSpan={6}>{location.state.data.innov_3}</td>
          <td colSpan={2}>{location.state.data.innov_c}</td>
        </tr>
        <tr style={{backgroundColor: "grey"}}>
          <td colSpan={10}>AVERAGE RATING FOR RESILIENT</td>
          <td colSpan={2}>{Math.round(location.state.data.innovative*2)/2}</td>
        </tr>

      </tbody>
    </Table>

    <Table  bordered hover>
      <thead >
        <tr>
          <th style={{backgroundColor: "#0075c9", textAlign: 'center', color: 'white'}} colSpan={12}>Care	<br/>		
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
          <td colSpan={6}>{location.state.data.care_1}</td>
          <td colSpan={2}>{location.state.data.care_a}</td>
        </tr>

        <tr>
          <td colSpan={4}>Recognises & communicates the impact & implications of their actions & decisions on other stakeholders.	</td>
          <td colSpan={6}>{location.state.data.care_2}</td>
          <td colSpan={2}>{location.state.data.care_b}</td>
        </tr>
        <tr>
          <td colSpan={4}>Explains the bigger picture & identifies sustainable solutions.	</td>
          <td colSpan={6}>{location.state.data.care_3}</td>
          <td colSpan={2}>{location.state.data.care_c}</td>
        </tr>
        <tr style={{backgroundColor: "grey"}}>
          <td colSpan={10}>AVERAGE RATING FOR RESULTS-DRIVEN		</td>
          <td colSpan={2}>{Math.round(location.state.data.care*2)/2}</td>
        </tr>

      </tbody>
    </Table>


    <Table  bordered hover>
      <thead >
        <tr>
          <th style={{backgroundColor: "#0075c9", textAlign: 'center', color: 'white'}} colSpan={12}>Integrity	<br/>		
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
          <td colSpan={6}>{location.state.data.int_1}</td>
          <td colSpan={2}>{location.state.data.int_a}</td>
        </tr>
        <tr>
          <td colSpan={4}>Emphasises principles & standards in their actions & decisions & questions those of others when necessary.	</td>
          <td colSpan={6}>{location.state.data.int_2}</td>
          <td colSpan={2}>{location.state.data.int_b}</td>
        </tr>
        <tr>
          <td colSpan={4}>Demonstrates reliability by delivering on promises & executing tasks to the best of their ability.	</td>
          <td colSpan={6}>{location.state.data.int_3}</td>
          <td colSpan={2}>{location.state.data.int_c}</td>
        </tr>
        <tr style={{backgroundColor: "grey"}}>
          <td colSpan={10}>AVERAGE RATING FOR INTEGRITY</td>
          <td colSpan={2}>{Math.round(location.state.data.integrity*2)/2}</td>
        </tr>
      </tbody>
    </Table>

    <Table  bordered hover>
      <thead >
        <tr>
          <th style={{backgroundColor: "#0075c9", textAlign: 'center', color: 'white'}} colSpan={12}>Other Behavioural Skills	<br/>		
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
          <td colSpan={6}>{location.state.data.a}</td>
          <td colSpan={2}>{location.state.data.b}</td>
        </tr>
        <tr>
          <td colSpan={4}>Aptitude and Attitude
</td>     <td colSpan={6}>{location.state.data.c}</td>
          <td colSpan={2}>{location.state.data.d}</td>
        </tr>
        <tr>
          <td colSpan={4}>Ask correct questions</td>
          <td colSpan={6}>{location.state.data.e}</td>
          <td colSpan={2}>{location.state.data.f}</td>
        </tr>
        <tr>
          <td colSpan={4}>Attention to detail</td>
          <td colSpan={6}>{location.state.data.g}</td>
          <td colSpan={2}>{location.state.data.h}</td>
        </tr>
        <tr>
          <td colSpan={4}>Listens and seeks to understand</td>
          <td colSpan={6}>{location.state.data.i}</td>          
          <td colSpan={2}>{location.state.data.j}</td>
        </tr>
        <tr>
          <td colSpan={4}>Meeting deadlines</td>
          <td colSpan={6}>{location.state.data.k}</td>
          <td colSpan={2}>{location.state.data.l}</td>
        </tr>
        <tr>
          <td colSpan={4}>Presentations</td>
          <td colSpan={6}>{location.state.data.m}</td>
          <td colSpan={2}>{location.state.data.n}</td>
        </tr>
        <tr>
          <td colSpan={4}>Problem-solving</td>
          <td colSpan={6}>{location.state.data.o}</td>
          <td colSpan={2}>{location.state.data.p}</td>
        </tr>
        <tr>
          <td colSpan={4}>Resourcefulness</td>
          <td colSpan={6}>{location.state.data.q}</td>
          <td colSpan={2}>{location.state.data.r}</td>
        </tr>
      </tbody>
    </Table>

    <Table  bordered hover>
      <thead >
        <tr>
          <th style={{backgroundColor: "#0075c9", textAlign: 'center', color: 'white'}} colSpan={12}>General			<br/>
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
          <td colSpan={8}>{location.state.data.w}</td>
        </tr>
        <tr>
          <td colSpan={4}>What are the person's observable strengths?</td>
          <td colSpan={8}>{location.state.data.x}</td>
        </tr>
        <tr>
          <td colSpan={4}>What could the person have done differently, or improved on, to enhance his/her performance?</td>
          <td colSpan={8}>{location.state.data.y}</td>
        </tr>
        <tr>
          <td colSpan={4}>If it was up to you, would you hire this person?</td>
          <td colSpan={8}>{location.state.data.z}</td>
        </tr>
      </tbody>
    </Table>       

    </Table>  
          <br/>
          <br/>


    </div>
 

      </div>
    </div>
  </div>
  )
}

export default Feedback