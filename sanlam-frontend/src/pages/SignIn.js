import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from './sanlam.png'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import { duration } from 'moment';


const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    const [i, seti] = useState()
    const [data, setdata] = useState([])
    const [datas, setdatas] = useState([])
    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'pink', 'green'];

    useEffect(() => {
      const fetchAdminData = async () => {
        try {
          const res = await axios.get('http://localhost:3580/get_ratings/')
          setdata(res.data)
          console.log(data)
        } catch (error) {
          console.log(error)
        }
      }
      fetchAdminData()
    }, [])
    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }
    
    const handleSubmit = async(e) => {
      e.preventDefault();
      try {
        console.log(email)
          const one = await axios.get('http://localhost:3580/validation/' + email)
          const two = await axios.get('http://localhost:3580/validation2/' + one.data[0].user_id)
          console.log(two.data[0].password)
          if (password === two.data[0].password){
            localStorage.setItem('name', one.data[0].user_id)
            const three = await axios.get('http://localhost:3580/validation3/' + one.data[0].user_id)
          if (three.data[0].user_type == "Graduate"){
            navigate('/1')
          }

          if (three.data[0].user_type == "Admin"){          
          navigate('/a')}    
          if (three.data[0].user_type == "Rotation Owner")          {          
                    navigate('/i')}    
                    if (three.data[0].user_type == "Coordinator")          {          
                      navigate('/x')}    
          }

          

          seti(one.data[0].user_id)
          

          
      } catch (error) {
          console.log('not approved', error)
      }
      console.log(inputs);
    }

    const a = async(e) => {
      
          try {
            console.log(e)
            const res = await axios.get('http://localhost:3580/get_one_rating/' + e.event_id)
            setdatas(res.data)
            console.log(datas)
          } catch (error) {
            console.log(error)
          }
        }
    
    return (
      <>{/*
      <div className='row'>
      <div className='col'>
            <ResponsiveContainer width="100%" height={500}>
            <BarChart 
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          
          
          
        >         
          <XAxis dataKey="title" height={50}> 
          <Label
          offset={-10} position='bottom' 
         style={{
             textAnchor: "middle",
             fontSize: "100%",
             fill: "black",
            
         }}
      value={"Courses"} />
          </XAxis>
          <YAxis type="number" domain={[0, 5]} ticks={[0.5,1,1.5,2,2.5,3,3.5,4,4.5,5]}>
          <Label
          position='insideLeft' offset={10}
         style={{
             textAnchor: "middle",
             fontSize: "100%",
             fill: "black",
         }}
      angle={270} 
      value={"Average Rating (out of five)"} />
          </YAxis>
          <Tooltip cursor={{fill:'lightgrey'}} />
          <Legend />
          <Bar animationDuration={2000} dataKey="average" onClick={a} label={{ position: 'top', fontSize: '14px'}} legendType='none'>
          {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index%20]} fillOpacity={0.2} stroke={colors[index % 20]} strokeWidth={1}/>
          
        ))}

          </Bar>
          <Bar animationDuration={5000} dataKey="average" fill="#0075c9"/>
        </BarChart>
      </ResponsiveContainer>
      </div>

      <div className='col'>
            <ResponsiveContainer width="100%" height={500}>
            <BarChart 
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          
          
          
        >         
          <XAxis dataKey="title" height={50}> 
          <Label
          offset={-10} position='bottom' 
         style={{
             textAnchor: "middle",
             fontSize: "100%",
             fill: "black",
            
         }}
      value={"Courses"} />
          </XAxis>
          <YAxis type="number" domain={[0, 5]} ticks={[0.5,1,1.5,2,2.5,3,3.5,4,4.5,5]}>
          <Label
          position='insideLeft' offset={10}
         style={{
             textAnchor: "middle",
             fontSize: "100%",
             fill: "black",
         }}
      angle={270} 
      value={"Average Rating (out of five)"} />
          </YAxis>
          <Tooltip cursor={{fill:'lightgrey'}} />
          <Legend />
          <Bar animationDuration={2000} dataKey="average" onClick={a} label={{ position: 'top', fontSize: '14px'}} legendType='none'>
          {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index%20]} fillOpacity={0.2} stroke={colors[index % 20]} strokeWidth={1}/>
          
        ))}

          </Bar>
         //<Bar animationDuration={5000} dataKey="average" fill="#0075c9"/>
        </BarChart>
      </ResponsiveContainer>
      </div></div>*/}
{/*
      <ResponsiveContainer width="50%" aspect={1}>
            <BarChart
          data={datas}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          
        >
                    <CartesianGrid strokeDasharray="3 3" />
          
          <XAxis dataKey="user_id" />
          <YAxis type="number" domain={[0, 5]} ticks={[0.5,1,1.5,2,2.5,3,3.5,4,4.5,5]}/>
          <Tooltip />
          <Legend />
          <Bar animationDuration={2000} dataKey="rating" fill="#8884d8">
        </Bar>
        </BarChart>
        </ResponsiveContainer>*/}

      {/*datas.map(o=><div>{o.review}</div>)*/}

      

      <body>
    <form class="form-signin" onSubmit={e => { handleSubmit(e) }} style={{backgroundColor: "white"}}>
      <img class="mb-4" src={logo} alt="" height="100"/>

      <div style={{border: "1px solid #0075c9", padding: "10px", width: '1300px'}}>
      <div class="modal-body p-4 p-md-5">
<div class="icon d-flex align-items-center justify-content-center">
</div>
<h3 class="text-center mb-4 sanlam-blue-text">Sign In</h3>
<form action="#" class="login-form">

</form><div class="form-group">
<label for="inputEmail" class="sr-only">Email</label>
<input type="email" class="form-control rounded-left" placeholder="Email" autofocus="" onChange={(event) => { setEmail(event.target.value) }}/>
</div>
<br/>
<label for="inputEmail" class="sr-only">Password</label>
<div class="form-group d-flex">
  
<input type="password" class="form-control" placeholder="Password" required=""autoFocus="" onChange={(event) => { setPassword(event.target.value) }}/>
</div>
</div>
      <div style={{textAlign: 'right', margin: "10px"}}>

      <button class="btn btn-lg btn-outline-primary btn-block" type="submit" style={{borderRadius: "0px"}}>Sign in</button>

      </div>

      </div>

    </form>
    <br/><br/>
  
</body>
        </>
    )
}

export default SignIn;
