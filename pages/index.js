import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

let url = 'https://api.football-data.org/v2/matches'

const tiempoTranscurrido = Date.now();
let hoy = new Date(tiempoTranscurrido);
let dateYear = hoy.toISOString()
dateYear = dateYear.slice(0, 4);
let dateMouth = hoy.toISOString()
dateMouth = dateMouth.slice(5, 7);
let dateDay = hoy.toISOString()
dateDay = dateDay.slice(8, 10);

export default function Home({ matches }) {
  const [match, setMatch] = useState(matches.matches)
  useEffect(() => {
    llamadaApi()
  }, [])

  const [startDate, setStartDate] = useState(hoy)

  const sumarDia = () => {
    hoy.setHours(+24)
    console.log(hoy)
    dateDay++
    url = 'https://api.football-data.org/v2/matches?dateFrom=' + dateYear + '-' + dateMouth + '-' + dateDay + '&dateTo=' + dateYear + '-' + dateMouth + '-' + dateDay
    console.log(dateDay)
    llamadaApi()
  }

  const restarDia = () => {
    hoy.setHours(-24)
    console.log(hoy)
    dateDay--
    url = 'https://api.football-data.org/v2/matches?dateFrom=' + dateYear + '-' + dateMouth + '-' + dateDay + '&dateTo=' + dateYear + '-' + dateMouth + '-' + dateDay
    console.log(dateDay)
    llamadaApi()
  }

  const cambiarFecha = () => {
    let dateChange = document.getElementById('datePicker').value
    dateYear = dateChange.slice(0, 4);
    dateMouth = dateChange.slice(5, 7);
    dateDay = dateChange.slice(8, 10);
    //console.log(dateChange)
    console.log(dateYear + '-' + dateMouth + '-' + dateDay)
    url = 'https://api.football-data.org/v2/matches?dateFrom=' + dateYear + '-' + dateMouth + '-' + dateDay + '&dateTo=' + dateYear + '-' + dateMouth + '-' + dateDay
    llamadaApi()
  }

  const llamadaApi = async () => {

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Auth-Token': '647ec294ec224c77b2784be3621f37f1'
      }
    })

    const json = await response.json()
    console.log(json)
    setMatch(json['matches'])
  }


  return (

    <>
      <Head>
        <title>JonySoccer</title>
      </Head>

      <div className="container my-2">
        <nav className="navbar navbar-expand-lg navbar-success bg-success rounded">
          <div className="container-fluid justify-content-center ">
            <Link href="/" className="text-decoration-none ">
              <h3 className="text-white mx-3">Soccer Today</h3>
            </Link>

          </div>
        </nav>


        <div className="container my-4">

          <div className="container my-3 rounded">
            <div className="row shadow-lg rounded">

              {/* Restar Dia Botton */}
              <div className="col-4 d-flex justify-content-end">
                <button className="btn btn-success" onClick={restarDia}> &lt; </button>
              </div>

              {/* DataPicker (Today) */}
              <div className="col-4 d-flex justify-content-center flex-column">
                <DatePicker id="datePicker"
                  className="form-control text-center"
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  onCalendarClose={cambiarFecha}
                  dateFormat="yyyy-MM-dd"
                />

              </div>

              {/* Sumar Dia Botton */}
              <div className="col-4 d-flex justify-content-start">
                <button className="btn btn-success" onClick={sumarDia}>  &gt; </button>
              </div>
            </div>
          </div>


          {/* Partidos del Dia */}
          {match.map(match =>
            <div key={match.id}>
              <div className="container mb-3 card">
                <div className="row shadow rounded">
                  <div className="col-12 d-flex justify-content-center p-2 m-0 liga-nav">
                    <Link className="nav-link text-decoration-none text-dark " href={`/clasificaciones/${match.competition.id}`}>
                      <p className='compt_auxiliar'>{match.competition.name}</p>
                    </Link>
                    <img className="rounded-circle mx-2" src={match.competition.area.ensignUrl} alt="" height="30px" width="30px" />
                  </div>
                  <div className="col-5 d-flex justify-content-end p-4 mb-2">

                    <span className="mx-2">
                      <Link key={match.homeTeam.id} href={`/team/${match.homeTeam.id}`}>
                        <p className='team_auxiliar'>{match.homeTeam.name}</p>
                      </Link>

                    </span>
                  </div>
                  <div className="col-2 d-flex justify-content-center p-4 mb-2">
                    {match.score.fullTime.homeTeam != null ?
                      <span> {match.score.fullTime.homeTeam} &#45; {match.score.fullTime.awayTeam} </span> :
                      <span>
                        {match.utcDate.slice(11, -4)}
                      </span>}

                  </div>
                  <div className="col-5 d-flex justify-content-start p-4 mb-2">
                    <span className="mx-2">
                      <Link key={match.awayTeam.id} href={`/team/${match.awayTeam.id}`}>
                        <p className='team_auxiliar'>{match.awayTeam.name}</p>
                      </Link>
                    </span>
                  </div>

                  <div className="col-12 rounded d-grid gap-2 mb-2">
                    {/* <NavLink  className="btn btn btn-outline-success mb-2" to={{
                                                                pathname: '/match',
                                                                state: { id: match.id }
                                                                }}>Ir al partido</NavLink> */}
                    <Link key={match.id} href={`/match/${match.id}`}>
                      <button className='btn btn btn-outline-success mb-2'>Ir al partido</button>
                    </Link>
                  </div>

                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </>

  )
}


export const getStaticProps = async () => {

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'X-Auth-Token': '647ec294ec224c77b2784be3621f37f1'
    }
  })

  const json = await response.json()
  // console.log(json)
  //setMatches(json['matches'])

  return {
    props: { matches: json }
  }
}