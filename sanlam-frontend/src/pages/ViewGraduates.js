import React, { useEffect, useState } from 'react'
import '../Style.css'
import { useNavigate } from 'react-router-dom';
//import Overview from './Overview';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import moment from 'moment'


function ViewGraduates() {
  const [standards, setStandards] = useState([])

  //const [active, setActive] = useState(1);
  const navigate = useNavigate()
function onDatePicked(date) {
  alert(date);
}
  function a_clicked(a) {
    
    navigate('/user_overview', { state: { d: a.user_id, data: a } })}
  

  const [search, setsearch] = useState("");
  const [clear, setClear] = useState(false);
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const res = await axios.get('http://localhost:3580/get_users')
        console.log(res.data)
        setStandards(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchAdminData()
  }, [])

  const searching = async (e) => {
    setsearch(e.target.value)
    console.log(e.target.value)
  }

  const searched = async (e) => {

    try {
      if (e.key === 'Enter') {
        const res = await axios.get('http://localhost:3580/search_users/' + e.target.value)

        setStandards(res.data)
        setClear(true)
      }

    } catch (error) {
      console.log("my error", error)
    }

  }


  const clearsearch = async (e) => {
    setClear(false)
    setsearch("")
    try {
      const res = await axios.get('http://localhost:3580/get_users/')

      setStandards(res.data)

    } catch (error) {
      console.log("cleared error", error)
    }

  }

  const userType = "a"

  return (
    <>
      <div class="album py-5 bg-light">
        <div class="container">
        <h3 class='sanlam-blue-text'>Graduates</h3>
        <div style={{width: '1300px'}}></div>
          {clear && <button onClick={clearsearch}><i class="bi bi-arrow-left-short"></i></button>}
          <div style={{textAlign: "center"}}>  
          <input type="text" placeholder="Search for a graduate. " onChange={searching} onKeyDown={searched} value={search} style={{margin: "10px", width: "80%"}}/>

          </div>



          <div class="row">
             
                          {standards.map((u) => (             <div class="col-md-3">
                <div class="card mb-4 box-shadow">   <Card style={{ margin: '2px', border: "none"}}

            >
              <Card.Body>
                <Card.Title><h4 class='sanlam-blue-text-left'>{u.first_name} {u.last_name}</h4></Card.Title>
                <Button variant='outline-primary' style={{borderRadius: "0px", width: '100%'}} onClick={() => a_clicked(u)}>View</Button>
              </Card.Body>
            </Card>


            </div>
              </div>))}

          </div>
        </div>
      </div>

      </>

  );
}

export default ViewGraduates

