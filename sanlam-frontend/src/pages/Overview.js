import { useLocation } from 'react-router'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Overview() {
  const location = useLocation();
  const [manager, setManager] = React.useState('');

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const res = await axios.get('http://localhost:3580/get_name_and_surname/'+ location.state.data.manager)
        console.log(res.data)
        setManager(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchAdminData()
  }, [])

  return (
    
    <div>
      {/* table */}
      <div class="album py-5 bg-light">
        <div class="container">
      <div className=''>

      <div className=''>
      <h3 class='sanlam-blue-text-left'>{location.state.data.name}</h3>
    <div>
          {location.state.data.description}
          <br/><br/>
          <div style={{float: 'right'}}>
          <p class='sanlam-blue-text-left' >
          <i class='bi bi-person' width={'25px'} height={'25px'}></i> {manager[0]?.first_name} {manager[0]?.last_name}</p>
          
      <div style={{width: '1300px'}}></div>
          </div>

          <br/>
        
          <h3 class='sanlam-blue-text-left'>Technologies:</h3>
         
<text>
          {location.state.data.technologies.split(',').map((u) => (<text >  
            <i class='bi bi-box'></i>&nbsp;{u} &nbsp;
            </text>))}
</text>
<br/><br/>
<h3 class='sanlam-blue-text-left'>Expectations:</h3>
{location.state.data.expectations}
          
          <br/>
          <br/>


    </div>
 

      </div>
    </div>
  </div>
  </div>
  </div>
  )
}

export default Overview