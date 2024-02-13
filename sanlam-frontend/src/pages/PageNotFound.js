import React, { useEffect, useState } from 'react'
import '../Style.css'
import { useNavigate } from 'react-router-dom';
//import Overview from './Overview';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios'


function PageNotFound() {
  const [standards, setStandards] = useState([])

  //const [active, setActive] = useState(1);
  const navigate = useNavigate()

  function a_clicked(a) {
    navigate('/overview', { state: { d: a.rotation_identifier, data: a } })
  }

  const [search, setsearch] = useState("");
  const [clear, setClear] = useState(false);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const res = await axios.get('http://localhost:3580/get_teams')
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

        const res = await axios.get('http://localhost:3580/search_teams/' + e.target.value)

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

      const res = await axios.get('http://localhost:3580/get_teams/')

      setStandards(res.data)

    } catch (error) {
      console.log("cleared error", error)
    }

  }

  //const userType = "admin"

  return (
    <>
      <div>
        <span id="DeltaPlaceHolderMain">

          <div class="error-page">
            <div class="error-header">
              &nbsp;
            </div>
            <div class="error-content">
              <div id="ctl00_PlaceHolderMain_ctl01__ControlWrapper_RichHtmlField" class="ms-rtestate-field" style={{display:"inline"}} aria-labelledby="ctl00_PlaceHolderMain_ctl01_label">
                <div class="row headingRow">
                  <div class="container clearfix"><div class="span4 push5"><div class="data"><h1>We're sorry but we can't find the page you were looking for.</h1></div></div></div></div><div class="row"><div class="container clearfix"><div class="span5 push5"><div class="data"><h2>The information you are looking for may have moved to another webpage.</h2><p>We have recently moved our Institutional webpages. You can now find the information you require on our new <a href="/corporate/Pages/default.aspx">Corporate website</a>.</p><p>
                    <br />
                  </p><h2>How did this happen?</h2><ul><li>We might have removed the page during the redesign of our website.</li><li>The link you clicked on may just be old or not work anymore.</li><li>Something technical might have gone wrong on our side.</li><li>You might have accidentally typed the wrong URL in the browser address bar.</li></ul><h2 class="marT30">​​​What can​ you do?</h2><ul><li>You could try again and retype the URL you wanted.</li><li>You could go back to our
                    <a href="/">home page</a>.</li><li>You could try
                        <a href="/Search/Pages/default.aspx">searching</a> to find what you're looking for.</li></ul><p class="marT20">If you want to help us fix this issue, we'd like your input. Please
                      <a href="mailto:internet@sanlam.co.za?Subject=404">email us</a> and let us know what went wrong. Be sure to let us know what link you were looking for and what device and web browser you were using when this occurred.</p></div></div></div></div>​​</div>
            </div>

          </div>
        </span>

      </div>
    </>

  );
}

export default PageNotFound

