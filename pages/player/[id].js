import { useState, useEffect } from "react";
import Image from 'next/image'
import Link from 'next/link'

const Player = ({ ply }) => {
    console.log(ply)

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
            <div className="container">
                <div className="container mb-2 rounded">
                    <div className="col bg-success rounded p-2 my-3 d-flex justify-content-center">
                        <h4 className="text-white">{ply.player.name}</h4>
                    </div>

                    <div className="col rounded p-2 my-3 shadow-lg">
                        <div className="row">
                            <div className="col-12 d-flex-inline justify-content-center align-items-center">
                                <h6 className="mx-3">Nacionalidad: {ply.player.nationality}</h6>
                                <h6 className="mx-3">Posicion: {ply.player.position}</h6>
                                <span className="mx-3">Fecha de Nacimiento: {ply.player.dateOfBirth}  ({calcularEdad(ply.player.dateOfBirth)}) años</span>
                            </div>
                        </div>
                    </div>


                    <div className="col-12 bg-success rounded p-2 mt-1 d-flex justify-content-center">
                        <h4 className="text-white">Últimos partidos</h4>
                    </div>

                    {ply.matches.map(match =>
                        <div key={match.id}>

                            <div className="container mb-3">
                                <div className="row shadow rounded">
                                    <div className="col-12 d-flex justify-content-center p-2 m-0 liga-nav">
                                        <Link className="nav-link text-decoration-none text-dark " href={`/clasificaciones/${match.competition.id}`}>
                                            <p className="compt_auxiliar">{match.competition.name}</p>
                                        </Link>
                                        {/* <img className="rounded-circle" src={match.competition.area.ensignUrl} alt="" height="30px" width="30px" /> */}
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
                </div>
            </div>
        </div>
    )
}

export default Player

export const getServerSideProps = async ({ params }) => {
    const urlPlayer = 'https://api.football-data.org/v2/players/' + params.id + '/matches'
    const response = await fetch(urlPlayer, {
        method: 'GET',
        headers: {
            'X-Auth-Token': '647ec294ec224c77b2784be3621f37f1'
        }
    })

    const dataPlayer = await response.json()
    return { props: { ply: dataPlayer } }
}