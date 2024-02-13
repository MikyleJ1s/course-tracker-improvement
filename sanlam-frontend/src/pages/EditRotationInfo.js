import { useLocation } from 'react-router'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios'
import React, { useRef, useState, useEffect } from 'react';

function EditRotationInfo() {
  const location = useLocation();
  const [modalShow, setModalShow] = React.useState(false);
  const [standards, setStandards] = useState([]);
  const n = localStorage.getItem('name')
  useEffect(() => {
    const fetchAdminData = async () => {
      
      try {
        const res = await axios.get('http://localhost:3580/get_one_rotation/' + n)
        setStandards(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchAdminData()
  }, [])
  const save = async(a, b, c, d, e, f) => {

    const data = {
      name: a,
    technologies: b, 
    expectations: c, 
    manager: d,
    description: e,
    rotation_identifier: f
        
    }
    try {

        await axios.put('http://localhost:3580/update_rotation_details/', data)
        
    } catch (error) {
        console.log('not approved', error)
    }

}

const [inputs, setInputs] = useState({});

const handleChange = (event) => {
  const name = event.target.name;
  const value = event.target.value;
  setInputs(values => ({...values, [name]: value}))
}

const [isAlertVisible, setIsAlertVisible] = useState(false)

const handleSubmit = async(event) => {
  event.preventDefault();
  
  const data = {
    name: standards[0].name,
  technologies: inputs.b, 
  expectations: inputs.c, 
  manager: inputs.d,
  description: inputs.e,
  rotation_identifier: n
      
  }

  try {
      await axios.put('http://localhost:3580/update_rotation_details/', data)
      setIsAlertVisible(true);

      setTimeout(() => {setIsAlertVisible(false);}, 3000);
    
      
  } catch (error) {
      console.log('not approved', error)
  }
  console.log(inputs);
}

const [modalEditShow, setModalEditShow] = useState(false)


  return (
    
    <div>
            <div class="album py-5 bg-light">
        <div class="container"></div>
      {/* table */}
      <div style={{width: '1300px'}}></div>
      <div className='container-fluid h-100'>
      <h3 className='sanlam-blue-text'> Update Rotation Information</h3>

      <div className=''>
           
    <br />
    <div>

         
<text>
          {/*location.state.data.technologies.split(',').map((u) => (<text >  
            <i class='bi bi-box'></i>&nbsp;{u} &nbsp;
          </text>))*/}
</text>

    </div>
    <div>

      <form>
<div class="form-group">
  
    <label for="exampleFormControlTextarea1">Description</label>
    <textarea class="form-control" id="exampleFormControlTextarea1" placeholder='a description of what your team does on a day to day' rows="3"  type="text" 
          name="e" 
          
          value={inputs.e || standards[0]?.description} 
          onChange={handleChange}></textarea>

  </div>
  <br/>
  <div class="form-group">
  
    <label for="exampleFormControlTextarea1">Technologies</label>
    <textarea class="form-control" placeholder='separate multiple tools with a comma' id="exampleFormControlTextarea1" rows="3"  type="text" 
          name="b" 
          
          value={inputs.b || standards[0]?.technologies} 
          onChange={handleChange}></textarea>

  </div>
  <br/>
  <div class="form-group">
  
    <label for="exampleFormControlTextarea1">Expectations</label>
    <textarea class="form-control" id="exampleFormControlTextarea1" placeholder='what will the graduate be expected to do in your rotation' rows="3"  type="text" 
          name="c" 
          
          value={inputs.c || standards[0]?.expectations} 
          onChange={handleChange}></textarea>

  </div>
  <br/>
</form>
<Button variant="outline-primary" style={{borderRadius: "0px"}} onClick={handleSubmit}>
        Update Rotation Information
      </Button>

    </div>
    {isAlertVisible && <>
      <EditModal
      show = {isAlertVisible}
      onHide={() => setIsAlertVisible(false)}
    /></>
      }
      
      </div>
    </div>
    <br/>
  </div></div>

  )
}

export default EditRotationInfo



function EditModal(props) {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      id = 'myModal'
      centered
    >
      <Modal.Body>

    Information Successfully Updated

      </Modal.Body>
    </Modal>
  );
}