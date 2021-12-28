import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { useState, useEffect } from "react";
import Image from 'next/image'
import Link from 'next/link'

const Team = ({ team, previewMatches, nextMatches }) => {
    // console.log(team)
    // console.log(previewMatches)
    // console.log(nextMatches)

    const [key, setKey] = useState('equipo');

    const calcularEdad = (fechaNacimiento) => {

        var hoy = new Date();
        var cumpleanos = new Date(fechaNacimiento);
        var edad = hoy.getFullYear() - cumpleanos.getFullYear();
        var m = hoy.getMonth() - cumpleanos.getMonth();

        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
            edad--;
        }

        return edad;
    }

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
                <div className="container mb-2 rounded">

                    <div className="col bg-success rounded p-2 my-3 d-flex justify-content-center">
                        <h4 className="text-white">{team.name}</h4>
                    </div>

                    <div className="row shadow-lg">

                        <div className="col">
                            <div className="row">
                                <div className="col-12 col-md-6 d-flex justify-content-center align-items-center my-3">
                                    <img src={team.crestUrl} alt="" height="180px" width="auto" />
                                </div>
                                <div className="col-12  col-md-6 d-flex-inlines my-3">
                                    <h6>Fundado: {team.founded}</h6>
                                    <h6>Estadio: {team.venue}</h6>
                                    <p>Dirección: {team.address}</p>
                                    {/* <p>País: {team.area.name}</p> */}
                                    <p>Email: {team.email}</p>
                                    <p>Teléfono: {team.phone}</p>
                                    <a href={team.website}>{team.website}</a>
                                </div>
                            </div>
                        </div>

                        {/* TABS  */}
                        <Tabs
                            id="controlled-tab-example"
                            defaultActiveKey="equipo"
                            activeKey={key}
                            onSelect={(k) => setKey(k)}
                            className="mb-3 mt-3">
                            <Tab eventKey="equipo" title="Equipo">
                                <div className="col-12 bg-success rounded p-2 mt-1 d-flex justify-content-center">
                                    <h4 className="text-white">Equipo</h4>
                                </div>

                                <div className="container mb-3">
                                    <div className="row shadow rounded">
                                        <div className="col-12 d-flex justify-content-center p-2 m-0">

                                            <table className="rounded table table-striped mt-2">

                                                <thead className="tablaHead">
                                                    <tr className="text-white" >
                                                        <td>Nombre</td>
                                                        <td>Posición</td>
                                                        <td>Nacionalidad</td>
                                                        <td>Edad</td>
                                                    </tr>
                                                </thead>

                                                <tbody className="rounded">

                                                    {team.squad.map(player =>
                                                        <tr key={player.id}>

                                                            {/* NOMBRE JUGADOR */}
                                                            <td>

                                                                <Link key={player.id} href={`/player/${player.id}`}>
                                                                    <p className='team_auxiliar'>{player.name}</p>
                                                                </Link>
                                                                {/* <NavLink  className="nav-link text-decoration-none text-dark" to={{
                                                                                                pathname: '/player',
                                                                                                state: { id: player.id }
                                                                                                }}><b>{player.name}</b></NavLink> */}

                                                            </td>

                                                            {/* POSICION */}
                                                            <td>

                                                                {player.position}

                                                            </td>

                                                            {/* Nacionalidad */}
                                                            <td>

                                                                {player.nationality}

                                                            </td>



                                                            {/* EDAD */}
                                                            <td>

                                                                {calcularEdad(player.dateOfBirth.slice(0, 10))}

                                                            </td>

                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey="proximosPartidos" title="Proximos Partidos">
                                <div className="col-12 bg-success rounded p-2 mt-1 d-flex justify-content-center">
                                    <h4 className="text-white">Proximos partidos</h4>
                                </div>

                                {nextMatches.map(match =>

                                    <div key={match.id}>

                                        <div className="container my-3 card">
                                            <div className="row shadow rounded">
                                                <div className="col-12 d-flex justify-content-center p-2 m-0 liga-nav">
                                                    <Link className="nav-link text-decoration-none text-dark " href={`/clasificaciones/${match.competition.id}`}>
                                                        <p className='compt_auxiliar'>{match.competition.name}</p>
                                                    </Link>
                                                    <img className="rounded-circle mx-2" src={match.competition.area.ensignUrl} alt="" height="30px" width="30px" />
                                                </div>
                                                <div className="col-5 d-flex justify-content-end p-4 mb-2">
                                                    {/* <EquipoImage /> */}
                                                    <span className="mx-2">
                                                        <Link key={match.homeTeam.id} href={`/team/${match.homeTeam.id}`}>
                                                            <p className='team_auxiliar'>{match.homeTeam.name}</p>
                                                        </Link>
                                                    </span>
                                                </div>
                                                <div className="col-2 d-flex justify-content-center p-4 mb-2">
                                                    {match.score.fullTime.homeTeam != null ?
                                                        <span> {match.score.fullTime.homeTeam} &#45; {match.score.fullTime.awayTeam} </span> :
                                                        <span> {match.utcDate.slice(11, -4)} </span>}

                                                </div>
                                                <div className="col-5 d-flex justify-content-start p-4 mb-2">
                                                    <span className="mx-2">
                                                        <Link key={match.awayTeam.id} href={`/team/${match.awayTeam.id}`}>
                                                            <p className='team_auxiliar'>{match.awayTeam.name}</p>
                                                        </Link>
                                                    </span>
                                                    {/* <EquipoImage /> */}
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                )}
                            </Tab>
                            <Tab eventKey="resultados" title="Resultados">
                                <div className="col-12 bg-success rounded p-2 mt-1 d-flex justify-content-center">
                                    <h4 className="text-white">Resultados últimos partidos</h4>
                                </div>

                                {previewMatches.map(match =>
                                    <div key={match.id}>

                                        <div className="container my-3 card">
                                            <div className="row shadow rounded">
                                                <div className="col-12 d-flex justify-content-center p-2 m-0 liga-nav">
                                                    <Link className="nav-link text-decoration-none text-dark " href={`/clasificaciones/${match.competition.id}`}>
                                                        <p className='compt_auxiliar'>{match.competition.name}</p>
                                                    </Link>
                                                    <img className="rounded-circle mx-2" src={match.competition.area.ensignUrl} alt="" height="30px" width="30px" />
                                                </div>
                                                <div className="col-5 d-flex justify-content-end p-4 mb-2">
                                                    {/* <EquipoImage /> */}
                                                    <span className="mx-2">
                                                        <Link className="text-dark" key={match.homeTeam.id} href={`/team/${match.homeTeam.id}`}>
                                                            <p className='team_auxiliar'>{match.homeTeam.name}</p>
                                                        </Link>
                                                    </span>
                                                </div>
                                                <div className="col-2 d-flex justify-content-center p-4 mb-2">
                                                    {match.score.fullTime.homeTeam != null ?
                                                        <span> {match.score.fullTime.homeTeam} &#45; {match.score.fullTime.awayTeam} </span> :
                                                        <span> {match.utcDate.slice(11, -4)} </span>}

                                                </div>
                                                <div className="col-5 d-flex justify-content-start p-4 mb-2">
                                                    <span className="mx-2">
                                                        <Link key={match.awayTeam.id} href={`/team/${match.awayTeam.id}`}>
                                                            <p className='team_auxiliar'>{match.awayTeam.name}</p>
                                                        </Link>
                                                    </span>
                                                    {/* <EquipoImage /> */}
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                ).reverse()}
                            </Tab>
                        </Tabs>


                    </div>
                </div>
            </div>
        </div>
    );
}

export default Team

export const getServerSideProps = async ({ params }) => {
    const urlTeam = 'https://api.football-data.org/v2/teams/' + params.id
    const urlMatches = 'https://api.football-data.org/v2/teams/' + params.id + '/matches/'

    const response = await fetch(urlTeam, {
        method: 'GET',
        headers: {
            'X-Auth-Token': '647ec294ec224c77b2784be3621f37f1'
        }
    })
    const jsonTeam = await response.json()

    const responseMatches = await fetch(urlMatches, {
        method: 'GET',
        headers: {
            'X-Auth-Token': '647ec294ec224c77b2784be3621f37f1'
        }
    })

    const jsonMatches = await responseMatches.json()
    // console.log(jsonMatches)
    const jsonPreviewMatches = jsonMatches.matches.filter(x => x.status === 'FINISHED')
    const jsonNextMatches = jsonMatches.matches.filter(x => x.status === 'SCHEDULED')
    return { props: { team: jsonTeam, previewMatches: jsonPreviewMatches, nextMatches: jsonNextMatches } }
}