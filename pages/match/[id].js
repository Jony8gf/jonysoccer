import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { useState, useEffect } from "react";
import Image from 'next/image'
import Link from 'next/link'

const Match = ({ mt }) => {

    console.log(mt)

    return (

        <div className="container my-5">
            <nav className="navbar navbar-expand-lg navbar-success bg-success rounded">
                <div className="container-fluid justify-content-center ">
                    <Link href="/" className="text-decoration-none ">
                        <h3 className="text-white mx-3">Soccer Today</h3>
                    </Link>

                </div>
            </nav>

            <div className="container my-3">
                <div className="row shadow rounded">
                    <div className="col-12 d-flex justify-content-center p-2 m-0 liga-nav">
                        <Link className="nav-link text-decoration-none text-dark " href={`/clasificaciones/${mt.match.competition.id}`}>
                            <p className='compt_auxiliar'>{mt.match.competition.name}</p>
                        </Link>
                        <img className="rounded-circle mx-2" src={mt.match.competition.area.ensignUrl} alt="" height="30px" width="30px" />
                    </div>
                    <div className="col-12 d-flex justify-content-center rounded d-grid gap-2 my-2">
                        <b>Jornada: {mt.match.matchday}</b>
                    </div>
                    <div className="col-5 d-flex justify-content-end p-4 mb-2">

                        <span className="mx-2">
                            <Link key={mt.match.homeTeam.id} href={`/team/${mt.match.homeTeam.id}`}>
                                <p className='team_auxiliar'>{mt.match.homeTeam.name}</p>
                            </Link>

                        </span>
                    </div>
                    <div className="col-2 d-flex justify-content-center p-4 mb-2">
                        {mt.match.score.fullTime.homeTeam != null ?
                            <span> {mt.match.score.fullTime.homeTeam} &#45; {mt.match.score.fullTime.awayTeam} </span> :
                            <span>
                                {mt.match.utcDate.slice(11, -4)}
                            </span>}

                    </div>
                    <div className="col-5 d-flex justify-content-start p-4 mb-2">
                        <span className="mx-2">
                            <Link key={mt.match.awayTeam.id} href={`/team/${mt.match.awayTeam.id}`}>
                                <p className='team_auxiliar'>{mt.match.awayTeam.name}</p>
                            </Link>
                        </span>
                    </div>

                    <div className="col-12 d-flex justify-content-center rounded d-grid gap-2 mb-2">
                        <p className='mx-3'><u>Referee</u>: <i>{mt.match.referees[0].name}</i></p>
                        <p className='mx-3'><u>Estadio</u>: <i>{mt.match.venue}</i></p>
                    </div>

                    <div className="container my-0 border">
                        <div className="row shadow rounded">
                            <div className="col-12 d-flex justify-content-center p-2 m-0 head2head">   
                                    <b>Head2Head</b>
                            </div>
                            <div className="col-4 d-flex justify-content-center p-2 m-0">
                                <p className='mx-3'>{mt.match.homeTeam.name}: <i>{mt.head2head.homeTeam.wins}</i></p>
                            </div>
                            <div className="col-4 d-flex justify-content-center p-2 m-0">
                                <p className='mx-3'>Empate: <i>{mt.head2head.homeTeam.draws}</i></p>
                            </div>
                            <div className="col-4 d-flex justify-content-center p-2 m-0">
                                <p className='mx-3'>{mt.match.awayTeam.name}: <i>{mt.head2head.homeTeam.losses}</i></p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>




        </div>
    );
}

export default Match

export const getServerSideProps = async ({ params }) => {
    const urlMatch = 'https://api.football-data.org/v2/matches/' + params.id

    const response = await fetch(urlMatch, {
        method: 'GET',
        headers: {
            'X-Auth-Token': '647ec294ec224c77b2784be3621f37f1'
        }
    })

    const jsonMatch = await response.json()

    return { props: { mt: jsonMatch } }
}