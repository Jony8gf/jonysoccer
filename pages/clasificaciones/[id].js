import { useState, useEffect } from "react";
import Image from 'next/image'
import Link from 'next/link'

const Clasification = ({ cl }) => {
    console.log(cl)
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
                    <div className="row shadow-lg">

                        {cl.standings.length > 1  ?

                            cl.standings.map(comp =>

                                comp.table.length > 1 ?


                                <div className="col" key={comp.group}>
                                    <h5>{comp.group}</h5>
                                    <table className="rounded my-3">

                                        <thead className="rounded tablaHead">
                                            <tr className="text-white" >
                                                <td>POS</td>
                                                <td></td>
                                                <td>EQUIPO</td>
                                                <td>PJ</td>
                                                <td>PG</td>
                                                <td>PE</td>
                                                <td>PD</td>
                                                <td>GF</td>
                                                <td>GC</td>
                                                <td>GD</td>
                                                <td>PTS</td>
                                            </tr>
                                        </thead>

                                        <tbody className="rounded">


                                            {comp.table.map(x =>

                                                <tr key={x.team.name}>
                                                    {/* POSICION */}
                                                    <td>

                                                        <b>{x.position}</b>

                                                    </td>

                                                    {/* IMAGEN EQUIPO */}
                                                    <td>
                                                        <Link href={`/team/${x.team.id}`}>
                                                            <img src={x.team.crestUrl} alt="" height="30px" width="30px" />
                                                        </Link>
                                                    </td>

                                                    {/* NOMBRE EQUIPO */}
                                                    <td>
                                                        <Link href={`/team/${x.team.id}`}>
                                                            <p className="team_auxiliar">{x.team.name}</p>
                                                        </Link>
                                                    </td>

                                                    {/* PARTIDO JUGADOS */}
                                                    <td>

                                                        {x.playedGames}

                                                    </td>

                                                    {/* PARTIDO GANADOS */}
                                                    <td>

                                                        {x.won}

                                                    </td>

                                                    {/* PARTIDO EMPATADOS */}
                                                    <td>

                                                        {x.draw}

                                                    </td>

                                                    {/* PARTIDO PERDIDOS */}
                                                    <td>

                                                        {x.lost}

                                                    </td>

                                                    {/* GOLES A FAVOR */}
                                                    <td>

                                                        {x.goalsFor}

                                                    </td>

                                                    {/* GOLES EN CONTRA */}
                                                    <td>

                                                        {x.goalsAgainst}

                                                    </td>

                                                    {/* GOLES DIFERENCIA*/}
                                                    <td>

                                                        {x.goalDifference}

                                                    </td>

                                                    {/* PUNTOS */}
                                                    <td>

                                                        <b>{x.points}</b>

                                                    </td>

                                                </tr>


                                            )}


                                        </tbody>
                                    </table>
                                </div>
                            : <p  key={comp.group + "-" + comp.stage}></p>)


                            : <table className="rounded">

                                <thead className="rounded tablaHead">
                                    <tr className="text-white" >
                                        <td>POS</td>
                                        <td></td>
                                        <td>EQUIPO</td>
                                        <td>PJ</td>
                                        <td>PG</td>
                                        <td>PE</td>
                                        <td>PD</td>
                                        <td>GF</td>
                                        <td>GC</td>
                                        <td>GD</td>
                                        <td>PTS</td>
                                    </tr>
                                </thead>
                                <tbody className="rounded">
                                    {cl.standings[0].table.map(comp =>
                                        <tr key={comp.team.id}>
                                            {/* POSICION */}
                                            <td>

                                                <b>{comp.position}</b>

                                            </td>

                                            {/* IMAGEN EQUIPO */}
                                            <td>
                                                <Link  href={`/team/${comp.team.id}`}>
                                                    <img src={comp.team.crestUrl} alt="" height="30px" width="30px" />
                                                </Link>
                                            </td>

                                            {/* NOMBRE EQUIPO */}
                                            <td>
                                                <Link href={`/team/${comp.team.id}`}>
                                                    <b>{comp.team.name}</b>
                                                </Link>

                                            </td>

                                            {/* PARTIDO JUGADOS */}
                                            <td>

                                                {comp.playedGames}

                                            </td>

                                            {/* PARTIDO GANADOS */}
                                            <td>

                                                {comp.won}

                                            </td>

                                            {/* PARTIDO EMPATADOS */}
                                            <td>

                                                {comp.draw}

                                            </td>

                                            {/* PARTIDO PERDIDOS */}
                                            <td>

                                                {comp.lost}

                                            </td>

                                            {/* GOLES A FAVOR */}
                                            <td>

                                                {comp.goalsFor}

                                            </td>

                                            {/* GOLES EN CONTRA */}
                                            <td>

                                                {comp.goalsAgainst}

                                            </td>

                                            {/* GOLES DIFERENCIA*/}
                                            <td>

                                                {comp.goalDifference}

                                            </td>

                                            {/* PUNTOS */}
                                            <td>

                                                <b>{comp.points}</b>

                                            </td>

                                        </tr>
                                    )}
                                </tbody>

                            </table>}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Clasification

export const getServerSideProps = async ({ params }) => {
    const urlCompetition = 'https://api.football-data.org/v2/competitions/' + params.id + '/standings'
    const response = await fetch(urlCompetition, {
        method: 'GET',
        headers: {
            'X-Auth-Token': '647ec294ec224c77b2784be3621f37f1'
        }
    })

    const dataCompetition = await response.json()
    return { props: { cl: dataCompetition } }
}