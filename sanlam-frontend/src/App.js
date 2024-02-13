import Overview from './pages/Overview';
import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Footer from './pages/Footer';
import PageNotFound from './pages/PageNotFound';
import MyCalendar from './pages/MyCalendar';
import Management from './pages/Management';
import EditRotationInfo from './pages/EditRotationInfo';
import Forms from './pages/Forms';
import ViewRotations from './pages/ViewRotations';
import ViewGraduates from './pages/ViewGraduates';
import UsersOverview from './pages/UsersOverview';
import logo from './pages/sanlam.png'  
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import SignIn from './pages/SignIn';
import Feedback from './pages/Feedback';
import Coordinator from './pages/Coordinator';
import CourseFeedback from './pages/CourseFeedback';
    
  function App() {

  return (
      <> 
      <div className='back'>
      <BrowserRouter>
      
      <Routes>
        <Route exact path="/" element={<SignIn/>}/>
        <Route exact path="/overview" element={<UserView><Overview/></UserView>}/>
        <Route exact path="/feed" element={<PlannerView><Feedback/></PlannerView>}/>
        <Route exact path="/user_overview" element={<PlannerView><UsersOverview/></PlannerView>}/>

        <Route exact path="/1" element={<UserView><ViewRotations/></UserView>}/>
        <Route exact path="/i" element={<ManagerView><EditRotationInfo/></ManagerView>}/>
        <Route exact path="/a" element={<PlannerView><Management/></PlannerView>}/>

        <Route exact path="/x" element={<CoordinatorView><Coordinator/></CoordinatorView>}/>
        
        <Route exact path="/y" element={<CoordinatorView><CourseFeedback/></CoordinatorView>}/>

        <Route exact path="/ii" element={<ManagerView><Forms/></ManagerView>}/>
        <Route path="*" Component={PageNotFound} />
        <Route path="/2" element={<UserView><MyCalendar/></UserView>} />
        <Route path="/b" element={<PlannerView><ViewGraduates/></PlannerView>} />

      </Routes>
      <Footer/>
      </BrowserRouter>
      </div>
      </>
  );
}

function UserView({children}){

  return <>
      <Navbar collapseOnSelect expand="sm">
      <Container>        

        <Navbar.Brand ><img src={logo} alt='logo' width={'200px'}/></Navbar.Brand>

          <Nav >
          <Nav.Link href="http://localhost:3000/1" >Available Rotations</Nav.Link>
            <Nav.Link href="http://localhost:3000/2">Academy Calendar</Nav.Link>  
            <Nav.Link href="http://localhost:3000/">Logout</Nav.Link>     
          </Nav>

      
      </Container>
      
    </Navbar>
  {children}
  </>;
}

function ManagerView({children}){

  return <>
        <Navbar collapseOnSelect expand="sm">
      <Container>        

        <Navbar.Brand ><img src={logo} alt='logo' width={'200px'}/></Navbar.Brand>
          <Nav >
            <Nav.Link href="http://localhost:3000/i" >Rotation Details</Nav.Link>
            <Nav.Link href="http://localhost:3000/ii" >Feedback</Nav.Link>
            <Nav.Link href="/">Logout</Nav.Link> 
        
          </Nav>
      
      </Container>
      
    </Navbar>
  {children}</>;
}

function PlannerView({children}){

  return <>
        <Navbar collapseOnSelect expand="sm">
      <Container>        

        <Navbar.Brand><img src={logo} alt='logo' width={'200px'}/></Navbar.Brand>

          <Nav >
            <Nav.Link href="http://localhost:3000/a" >Calendar</Nav.Link>     
            <Nav.Link href="http://localhost:3000/b" >Graduates</Nav.Link>      
            <Nav.Link href="http://localhost:3000/">Logout</Nav.Link>      
          </Nav>
      
      </Container>
      
    </Navbar>
  {children}</>;
}


function CoordinatorView({children}){

  return <>
        <Navbar collapseOnSelect expand="sm">
      <Container>        

        <Navbar.Brand><img src={logo} alt='logo' width={'200px'}/></Navbar.Brand>

          <Nav >
            <Nav.Link href="http://localhost:3000/x" >Calendar</Nav.Link>          
            <Nav.Link href="http://localhost:3000/">Logout</Nav.Link>      
          </Nav>
      
      </Container>
      
    </Navbar>
  {children}</>;
}





export default App;
