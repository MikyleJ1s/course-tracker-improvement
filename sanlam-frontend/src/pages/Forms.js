import { useLocation, useNavigate } from 'react-router'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import React, { useRef, useEffect, useState } from 'react';
import Select from 'react-select'
import Form from 'react-bootstrap/Form';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Table from 'react-bootstrap/esm/Table';
import Textarea from '@mui/joy/Textarea';
import Card from 'react-bootstrap/Card'
import { DownloadTableExcel, useDownloadExcel } from 'react-export-table-to-excel';

function Forms() {
  const [ops, setops] = useState([])
  const location = useLocation();
  const [standards, setStandards] = useState([])
  const [stuff, setstuff] = useState([])
  const [s, sets] = useState()
  const [done,setDone]=useState(false);
  const [person, setPerson] = useState('')
  const [rating, setRating] = useState('')
  const n = localStorage.getItem('name')
  const onButtonClick=(e)=> {
    setPerson(e.target.value)

}

  useEffect(() => {

    const fetchAdminData = async () => {
      try {
        const r = await axios.get('http://localhost:3580/get_user_feedback/' + n)
        setstuff(r.data)
        const res = await axios.get('http://localhost:3580/get_users')
        setStandards(res.data)
        setops([standards.map((p)=>({value: p.first_name, label: p.first_name} ))])

      } catch (error) {
        console.log(error)
      }
    }
    fetchAdminData()
  }, [])
  const tableRef = useRef(null);
  const {onDownload} = useDownloadExcel({
    currentTableRef: tableRef.current, 
    filename: "name of",
    sheet: "users", 
            
  })

  const handleSubmit = async(event) => {
    //event.preventDefault();

    let b = Object.keys(inputs).length
    console.log(b)
    if (b <= 47){
      alert('nah')
    }

    
    const data = {
    user_id: inputs.grad_id, 
    manager: n,

    collab_1: inputs.collab_1, 
    collab_a: inputs.collab_a, 
    collab_2: inputs.collab_2, 
    collab_b: inputs.collab_b, 
    collab_3: inputs.collab_3, 
    collab_c: inputs.collab_c,

    innov_1: inputs.innov_1, 
    innov_a: inputs.innov_a, 
    innov_2: inputs.innov_2, 
    innov_b: inputs.innov_b, 
    innov_3: inputs.innov_3, 
    innov_c: inputs.innov_c,

    care_1: inputs.care_1, 
    care_a: inputs.care_a, 
    care_2: inputs.care_2, 
    care_b: inputs.care_b, 
    care_3: inputs.care_3, 
    care_c: inputs.care_c,

    int_1: inputs.int_1, 
    int_a: inputs.int_a, 
    int_2: inputs.int_2, 
    int_b: inputs.int_b, 
    int_3: inputs.int_3, 
    int_c: inputs.int_c,


    a: inputs.a,
    b: inputs.b, 
    c: inputs.c, 
    d: inputs.d,
    e: inputs.e,
    f: inputs.f, 
    g: inputs.g, 
    h: inputs.h,
    i: inputs.i,
    j: inputs.j, 
    k: inputs.k, 
    l: inputs.l,
    m: inputs.m,
    n: inputs.n, 
    o: inputs.o, 
    p: inputs.p,
    q: inputs.q,
    r: inputs.r, 
 
    w: inputs.w, 
    x: inputs.x, 
    y: inputs.y,
    z: inputs.z

        
    }
    console.log(data)
    try {
        await axios.post('http://localhost:3580/send_feedback/', data)
        alert("success")
        console.log("success")
        onDownload()
    } catch (error) {
        console.log('not approved', error)
    }
    console.log(inputs);
  }



const [inputs, setInputs] = useState({});

const handleChanges = (event) => {
  const name = event.target.name;
  const value = event.target.value;
  setInputs(values => ({...values, [name]: value}))
}

const addrow = (a, b, c) => {
  let iD = myrowdata.length + 1
  setmyrowdata([...myrowdata, {i: iD, a: a, b: b, c: c}])
  console.log(myrowdata)
}


const deleterow = (index) => {
  console.log(index)
  setmyrowdata(myrowdata.filter((v, i) => i !== index));
  console.log(myrowdata)
}

const [myrowdata, setmyrowdata] = useState([])
const navigate = useNavigate()
function a_clicked(a) {

  navigate('/feed', { state: { d: a.feedback_identifier, data: a } })

}

  return (
    <>
  <DownloadTableExcel
                  filename={"namefornow"}
                  sheet="users"                  
                  currentTableRef={tableRef.current}
              >

                 <button> Export this as an excel </button>

              </DownloadTableExcel>
              
    <div>
    <div class="album py-5 bg-light">
        <div class="container">
      <div style={{width: '1300px'}}></div>
      <div className='container-fluid h-100'>
      {stuff.length > 0? <h3 className='sanlam-blue-text'> Already Given Feedback</h3>:''}
      <div class="row">
        {stuff?.map((u) => (
              <div class="col-md-4">
                <div class="card mb-4 box-shadow">
                  <Card style={{ margin: '2px', border: "none" }}

                  >
                    <Card.Body>                
                      <Button variant='outline-primary' style={{borderRadius: "0px", width: '100%'}} onClick={()=>a_clicked(u)}>Feedback {u.user_id}</Button>
                    </Card.Body>
                  </Card>
                </div>
              </div>))}
              </div>
      <h3 className='sanlam-blue-text'> Graduate Feedback</h3>
  
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
          <td colSpan={2}>{done? inputs.grad_id:
          <select as="select" custom name='grad_id' value={inputs.grad_id} onChange={handleChanges} required>{
    standards.map((f) => 
      (
        <option value={f.user_id} >{f.first_name + ' ' + f.last_name}</option>
      )
  )
}
</select>}

          </td>
          <td colSpan={4}>Rotation Owner:</td>
          <td colSpan={2}></td>
        </tr>
        <tr>
          <td colSpan={4}>Rotation Name:</td>
          <td colSpan={2}></td>
          <td colSpan={4}>Date:</td>
          <td colSpan={2}>{new Date().toDateString()}</td>
        </tr>
        <tr>
          <td colSpan={4}>Overall Rating: Behavioural Competencies</td>
          <td colSpan={2}></td>
          <td colSpan={4}>Overall Rating: Software / Tools / Technical Skills</td>
          <td colSpan={2}>{(myrowdata.reduce((total,v) =>  total = parseFloat(total) + parseFloat(v.c) , 0 ))/myrowdata.length}</td>
        </tr>
      </tbody>
    </Table>
    <br/>
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
          <td colSpan={6}>{done? inputs.collab_1:<textarea   rows="1" name="collab_1" Value={inputs.collab_1} onChange={handleChanges} required/>}
</td>
          <td colSpan={2}>{done? inputs.collab_a:<select as="select"                     custom
                    name='collab_a'
                    value={inputs.collab_a} onChange={handleChanges} required>    
        <option value="1" >1</option><option value="1.5" >1.5</option><option value="2" >2</option><option value="2.5" >2.5</option><option value="3" >3</option><option value="3.5" >3.5</option><option value="4" >4</option><option value="4.5" >4.5</option><option value="5" >5</option>
      </select>}</td>
        </tr>
        <tr>
          <td colSpan={4}>Shares information, skill & knowledge with others to create better outcomes.	</td>
          <td colSpan={6}>{done? inputs.collab_2:<textarea  rows="1"  name="collab_2" Value={inputs.collab_2} onChange={handleChanges} required></textarea>}</td>
          <td colSpan={2}>{done? inputs.collab_b:<select as="select"   
    defaultValue={'lol'}                  
    custom
                    name='collab_b'
                    value={inputs.collab_b} onChange={handleChanges} required>    
        <option value="1" >1</option><option value="1.5" >1.5</option><option value="2" >2</option><option value="2.5" >2.5</option><option value="3" >3</option><option value="3.5" >3.5</option><option value="4" >4</option><option value="4.5" >4.5</option><option value="5" >5</option>
      </select>}</td>
        </tr>
        <tr>
          <td colSpan={4}>Builds cooperative (win-win) relationships with others & assists them in goal achievement.	</td>
          <td colSpan={6}>{done? inputs.collab_3:<textarea  rows="1"  name="collab_3" Value={inputs.collab_3} onChange={handleChanges} required></textarea>}</td>
          <td colSpan={2}>{done? inputs.collab_c:<select as="select"                     custom
                    name='collab_c'
                    value={inputs.collab_c} onChange={handleChanges} required>    
        <option value="1" >1</option><option value="1.5" >1.5</option><option value="2" >2</option><option value="2.5" >2.5</option><option value="3" >3</option><option value="3.5" >3.5</option><option value="4" >4</option><option value="4.5" >4.5</option><option value="5" >5</option>
      </select>}</td>
        </tr>
        <tr style={{backgroundColor: "grey"}}>
          <td colSpan={10}>AVERAGE RATING FOR COLLABORATIVE</td>
          <td colSpan={2}></td>
        </tr>
      </tbody>
    </Table>
    <br/>
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
          <td colSpan={6}>{done? inputs.innov_1:<textarea  rows="1"  name="innov_1" Value={inputs.innov_1} onChange={handleChanges} required/>}</td>
          <td colSpan={2}>{done? inputs.innov_a:<select as="select"                     custom
                    name='innov_a'
                    value={inputs.innov_a} onChange={handleChanges} required>    
        <option value="1" >1</option><option value="1.5" >1.5</option><option value="2" >2</option><option value="2.5" >2.5</option><option value="3" >3</option><option value="3.5" >3.5</option><option value="4" >4</option><option value="4.5" >4.5</option><option value="5" >5</option>
      </select>}</td>
        </tr>
        <tr>
          <td colSpan={4}>Encourages others to make creative suggestions & brainstorms different ways of working.	</td>
          <td colSpan={6}>{done? inputs.innov_2:<textarea  rows="1"  name="innov_2" Value={inputs.innov_2} onChange={handleChanges} required/>}</td>
          <td colSpan={2}>{done? inputs.innov_b:<select as="select"                     custom
                    name='innov_b'
                    value={inputs.innov_b} onChange={handleChanges} required>    
        <option value="1" >1</option><option value="1.5" >1.5</option><option value="2" >2</option><option value="2.5" >2.5</option><option value="3" >3</option><option value="3.5" >3.5</option><option value="4" >4</option><option value="4.5" >4.5</option><option value="5" >5</option>
      </select>}</td>
        </tr>
        <tr>
          <td colSpan={4}>Seeks out opportunities to continuously update their knowledge, skills & methods.	</td>
          <td colSpan={6}>{done? inputs.innov_3:<textarea  rows="1"  name="innov_3" Value={inputs.innov_3} onChange={handleChanges} required/>}</td>
          <td colSpan={2}>{done? inputs.innov_c:<select as="select"                     custom
                    name='innov_c'
                    value={inputs.innov_c} onChange={handleChanges} required>    
        <option value="1" >1</option><option value="1.5" >1.5</option><option value="2" >2</option><option value="2.5" >2.5</option><option value="3" >3</option><option value="3.5" >3.5</option><option value="4" >4</option><option value="4.5" >4.5</option><option value="5" >5</option>
      </select>}</td>
        </tr>
        <tr style={{backgroundColor: "grey"}}>
          <td colSpan={10}>AVERAGE RATING FOR RESILIENT</td>
          <td colSpan={2}>{(parseFloat(inputs.innov_a) + parseFloat(inputs.innov_b) + parseFloat(inputs.innov_c))/3.0}</td>
        </tr>

      </tbody>
    </Table>
    <br/>
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
          <td colSpan={6}>{done? inputs.care_1:<textarea  rows="1"  name="care_1" Value={inputs.care_1} onChange={handleChanges} required/>}</td>
          <td colSpan={2}>{done? inputs.care_a:<select as="select" custom
                    name='care_a'
                    value={inputs.care_a} onChange={handleChanges} required>    
        <option value="1" >1</option><option value="1.5" >1.5</option><option value="2" >2</option><option value="2.5" >2.5</option><option value="3" >3</option><option value="3.5" >3.5</option><option value="4" >4</option><option value="4.5" >4.5</option><option value="5" >5</option>
      </select>}</td>
        </tr>

        <tr>
          <td colSpan={4}>Recognises & communicates the impact & implications of their actions & decisions on other stakeholders.	</td>
          <td colSpan={6}>{done? inputs.care_2:<textarea  rows="1" name="care_2" Value={inputs.care_2} onChange={handleChanges} required/>}</td>
          <td colSpan={2}>{done? inputs.care_b:<select as="select"                     custom
                    name='care_b'
                    value={inputs.care_b} onChange={handleChanges} required>    
        <option value="1" >1</option><option value="1.5" >1.5</option><option value="2" >2</option><option value="2.5" >2.5</option><option value="3" >3</option><option value="3.5" >3.5</option><option value="4" >4</option><option value="4.5" >4.5</option><option value="5" >5</option>
      </select>}</td>
        </tr>
        <tr>
          <td colSpan={4}>Explains the bigger picture & identifies sustainable solutions.	</td>
          <td colSpan={6}>{done? inputs.care_3:<textarea  rows="1" name="care_3" Value={inputs.care_3} onChange={handleChanges} required/>}</td>
          <td colSpan={2}>{done? inputs.care_c:<select as="select"                     custom
                    name='care_c'
                    value={inputs.care_c} onChange={handleChanges} required>    
        <option value="1" >1</option><option value="1.5" >1.5</option><option value="2" >2</option><option value="2.5" >2.5</option><option value="3" >3</option><option value="3.5" >3.5</option><option value="4" >4</option><option value="4.5" >4.5</option><option value="5" >5</option>
      </select>}</td>
        </tr>
        <tr style={{backgroundColor: "grey"}}>
          <td colSpan={10}>AVERAGE RATING FOR RESULTS-DRIVEN		</td>
          <td colSpan={2}></td>
        </tr>

      </tbody>
    </Table>
    <br/>
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
          <td colSpan={6}>{done? inputs.int_1:<textarea  rows="1" name="int_1" Value={inputs.int_1} onChange={handleChanges} required/>}</td>
          <td colSpan={2}>{done? inputs.innov_a:<select as="select"                     custom
                    name='int_a'
                    value={inputs.int_a} onChange={handleChanges} required>    
        <option value="1" >1</option><option value="1.5" >1.5</option><option value="2" >2</option><option value="2.5" >2.5</option><option value="3" >3</option><option value="3.5" >3.5</option><option value="4" >4</option><option value="4.5" >4.5</option><option value="5" >5</option>
      </select>}</td>
        </tr>
        <tr>
          <td colSpan={4}>Emphasises principles & standards in their actions & decisions & questions those of others when necessary.	</td>
          <td colSpan={6}>{done? inputs.int_2:<textarea  rows="1" name="int_2" Value={inputs.int_2} onChange={handleChanges} required/>}</td>
          <td colSpan={2}>{done? inputs.int_b:<select as="select"                     custom
                    name='int_b'
                    value={inputs.int_b} onChange={handleChanges} required>    
        <option value="1" >1</option><option value="1.5" >1.5</option><option value="2" >2</option><option value="2.5" >2.5</option><option value="3" >3</option><option value="3.5" >3.5</option><option value="4" >4</option><option value="4.5" >4.5</option><option value="5" >5</option>
      </select>}</td>
        </tr>
        <tr>
          <td colSpan={4}>Demonstrates reliability by delivering on promises & executing tasks to the best of their ability.	</td>
          <td colSpan={6}>{done? inputs.int_3:<textarea  rows="1" name="int_3" Value={inputs.int_3} onChange={handleChanges} required/>}</td>
          <td colSpan={2}>{done? inputs.int_c:<select as="select"                     custom
                    name='int_c'
                    value={inputs.int_c} onChange={handleChanges} required>    
        <option value="1" >1</option><option value="1.5" >1.5</option><option value="2" >2</option><option value="2.5" >2.5</option><option value="3" >3</option><option value="3.5" >3.5</option><option value="4" >4</option><option value="4.5" >4.5</option><option value="5" >5</option>
      </select>}</td>
        </tr>
        <tr style={{backgroundColor: "grey"}}>
          <td colSpan={10}>AVERAGE RATING FOR INTEGRITY</td>
          <td colSpan={2}></td>
        </tr>
      </tbody>
    </Table>
    <br/>
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
          <td colSpan={6}>{done? inputs.a:<textarea  rows="1" name="a" Value={inputs.a} onChange={handleChanges} required/>}</td>
          <td colSpan={2}>{done? inputs.b:<select as="select"                     custom
                    name='b'
                    value={inputs.b} onChange={handleChanges} required>    
        <option value="1" >1</option><option value="1.5" >1.5</option><option value="2" >2</option><option value="2.5" >2.5</option><option value="3" >3</option><option value="3.5" >3.5</option><option value="4" >4</option><option value="4.5" >4.5</option><option value="5" >5</option>
      </select>}</td>
        </tr>
        <tr>
          <td colSpan={4}>Aptitude and Attitude
</td>     <td colSpan={6}>{done? inputs.c:<textarea  rows="1" name="c" Value={inputs.c} onChange={handleChanges} required/>}</td>
          <td colSpan={2}>{done? inputs.d:<select as="select"                     custom
                    name='d'
                    value={inputs.d} onChange={handleChanges} required>    
        <option value="1" >1</option><option value="1.5" >1.5</option><option value="2" >2</option><option value="2.5" >2.5</option><option value="3" >3</option><option value="3.5" >3.5</option><option value="4" >4</option><option value="4.5" >4.5</option><option value="5" >5</option>
      </select>}</td>
        </tr>
        <tr>
          <td colSpan={4}>Ask correct questions</td>
          <td colSpan={6}>{done? inputs.e:<textarea  rows="1" name="e" Value={inputs.e} onChange={handleChanges} required/>}</td>
          <td colSpan={2}>{done? inputs.f:<select as="select"                     custom
                    name='f'
                    value={inputs.f} onChange={handleChanges} required>    
        <option value="1" >1</option><option value="1.5" >1.5</option><option value="2" >2</option><option value="2.5" >2.5</option><option value="3" >3</option><option value="3.5" >3.5</option><option value="4" >4</option><option value="4.5" >4.5</option><option value="5" >5</option>
      </select>}</td>
        </tr>
        <tr>
          <td colSpan={4}>Attention to detail</td>
          <td colSpan={6}>{done? inputs.g:<textarea  rows="1" name="g" Value={inputs.g} onChange={handleChanges} required/>}</td>
          <td colSpan={2}>{done? inputs.h:<select as="select"                     custom
                    name='h'
                    value={inputs.h} onChange={handleChanges} required>    
        <option value="1" >1</option><option value="1.5" >1.5</option><option value="2" >2</option><option value="2.5" >2.5</option><option value="3" >3</option><option value="3.5" >3.5</option><option value="4" >4</option><option value="4.5" >4.5</option><option value="5" >5</option>
      </select>}</td>
        </tr>
        <tr>
          <td colSpan={4}>Listens and seeks to understand</td>
          <td colSpan={6}>{done? inputs.i:<textarea  rows="1" name="i" Value={inputs.i} onChange={handleChanges} required/>}</td>          
          <td colSpan={2}>{done? inputs.j:<select as="select"                     custom
                    name='j'
                    value={inputs.j} onChange={handleChanges} required>    
        <option value="1" >1</option><option value="1.5" >1.5</option><option value="2" >2</option><option value="2.5" >2.5</option><option value="3" >3</option><option value="3.5" >3.5</option><option value="4" >4</option><option value="4.5" >4.5</option><option value="5" >5</option>
      </select>}</td>
        </tr>
        <tr>
          <td colSpan={4}>Meeting deadlines</td>
          <td colSpan={6}>{done? inputs.k:<textarea  rows="1" name="k" Value={inputs.k} onChange={handleChanges} required/>}</td>
          <td colSpan={2}>{done? inputs.l:<select as="select"                     custom
                    name='l'
                    value={inputs.l} onChange={handleChanges} required>    
        <option value="1" >1</option><option value="1.5" >1.5</option><option value="2" >2</option><option value="2.5" >2.5</option><option value="3" >3</option><option value="3.5" >3.5</option><option value="4" >4</option><option value="4.5" >4.5</option><option value="5" >5</option>
      </select>}</td>
        </tr>
        <tr>
          <td colSpan={4}>Presentations</td>
          <td colSpan={6}>{done? inputs.m:<textarea  rows="1" name="m" Value={inputs.m} onChange={handleChanges} required/>}</td>
          <td colSpan={2}>{done? inputs.n:<select as="select"                     custom
                    name='n'
                    value={inputs.n} onChange={handleChanges} required>    
        <option value="1" >1</option><option value="1.5" >1.5</option><option value="2" >2</option><option value="2.5" >2.5</option><option value="3" >3</option><option value="3.5" >3.5</option><option value="4" >4</option><option value="4.5" >4.5</option><option value="5" >5</option>
      </select>}</td>
        </tr>
        <tr>
          <td colSpan={4}>Problem-solving</td>
          <td colSpan={6}>{done? inputs.o:<textarea  rows="1" name="o" Value={inputs.o} onChange={handleChanges} required/>}</td>
          <td colSpan={2}>{done? inputs.p:<select as="select"                     custom
                    name='p'
                    value={inputs.p} onChange={handleChanges} required>    
        <option value="1" >1</option><option value="1.5" >1.5</option><option value="2" >2</option><option value="2.5" >2.5</option><option value="3" >3</option><option value="3.5" >3.5</option><option value="4" >4</option><option value="4.5" >4.5</option><option value="5" >5</option>
      </select>}</td>
        </tr>
        <tr>
          <td colSpan={4}>Resourcefulness</td>
          <td colSpan={6}>{done? inputs.q:<textarea  rows="1" name="q" Value={inputs.q} onChange={handleChanges} required/>}</td>
          <td colSpan={2}>{done? inputs.r:<select as="select"                     custom
                    name='r'
                    value={inputs.r} onChange={handleChanges} required>    
        <option value="1" >1</option><option value="1.5" >1.5</option><option value="2" >2</option><option value="2.5" >2.5</option><option value="3" >3</option><option value="3.5" >3.5</option><option value="4" >4</option><option value="4.5" >4.5</option><option value="5" >5</option>
      </select>}</td>
        </tr>
      </tbody>
    </Table>
    <br/>
    <Table  bordered hover>
      <thead >
        <tr>
          <th style={{backgroundColor: "#0075c9", textAlign: 'center', color: 'white'}} colSpan={12}>Software / Tools / Technical Skills	<br/>		
          Please list the software / tools / technical skills developed during the rotation and indicate level of competency for each						
</th>
        </tr>
      </thead>
      <tbody>
      <tr>
          <td colSpan={4}>Observed behaviour</td>
          <td colSpan={6}>Comments</td>
          <td colSpan={2}>Rating</td>
        </tr>

        
    {myrowdata.length!==0 && myrowdata.map((m, index)=>    <tr key={index}>
      <td colSpan={4}>{m.a}</td>
      <td colSpan={6}>{m.b}</td>
      <td colSpan={2}>{m.c}<button style={{float: 'right'}} onClick={()=>deleterow(index)}><i className='bi bi-x-circle' style={{color: 'red'}}/></button></td>
    </tr>)}

      </tbody>
    </Table>
    <br/>
    <Table>
      <tbody>

  <tr>
  <td colSpan={12}>Insert a row</td>
  </tr>
    <tr >
      
      <td colSpan={6}><textarea rows="1" name="tools" Value={inputs.tools} onChange={handleChanges} required/></td>
      <td colSpan={4}><textarea rows="1" name="comment" Value={inputs.comment} onChange={handleChanges} required/></td>
      <td colSpan={2}><><select as="select"   style={{width: '50px'}}           custom
                    name='rating'
                    value={inputs.rating || ""} onChange={handleChanges} required>    
          <option style={{display: 'none'}} value="" disabled></option><option value="1" >1</option><option value="1.5" >1.5</option><option value="2" >2</option><option value="2.5" >2.5</option><option value="3" >3</option><option value="3.5" >3.5</option><option value="4" >4</option><option value="4.5" >4.5</option><option value="5" >5</option>
      </select><button style={{float: 'right', borderRadius: '50%'}} onClick={()=>addrow(inputs.tools, inputs.comment, inputs.rating)}><i className='bi bi-check-circle' style={{color: 'green'}}/></button></></td>
    </tr>

      </tbody>
    </Table>
    <br/>
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
          <td colSpan={8}>{done? inputs.w:<textarea  rows="1" name="w" Value={inputs.w} onChange={handleChanges} required/>}</td>
        </tr>
        <tr>
          <td colSpan={4}>What are the person's observable strengths?</td>
          <td colSpan={8}>{done? inputs.x:<textarea  rows="1" name="x" Value={inputs.x} onChange={handleChanges} required/>}</td>
        </tr>
        <tr>
          <td colSpan={4}>What could the person have done differently, or improved on, to enhance his/her performance?</td>
          <td colSpan={8}>{done? inputs.y:<textarea  rows="1" name="y" Value={inputs.y} onChange={handleChanges} required/>}</td>
        </tr>
        <tr>
          <td colSpan={4}>If it was up to you, would you hire this person?</td>
          <td colSpan={8}>{done? inputs.z:<textarea  rows="1" name="z" Value={inputs.z} onChange={handleChanges} required/>}</td>
        </tr>
      </tbody>
    </Table>       
    </Table>  
    <div>
                <Button variant="outline-primary" style={{borderRadius: "0px"}} onClick={handleSubmit}>
        Send your Feedback
      </Button>


      </div>
    </div>

      </div>
      </div>
   
  </div>
  <br/>

  </>)
}

export default Forms