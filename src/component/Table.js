import React, { Component } from 'react'
import axios from 'axios'
import { Link, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

const Table = ({ filter, reverse }) => {
    const [pokemon, setPokemon] = useState(null)
    const url = 'https://pokeapi.co/api/v2/pokemon/?limit=151'

    useEffect(async () => {
        const res = await axios.get(url);
        setPokemon(res.data['results'])
    }, [])

    return (
        <>
            <table className="table">
                <thead className='thead-dark'>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                    </tr>
                </thead>
                <tbody>
                    {reverse ? (
                        pokemon ? (pokemon.map((poke, index) => (
                            (poke.name.includes(filter) ? (<tr key={poke.name}>
                                <th scope="row">{
                                    index + 1}</th><td><Link to={`pokemon/${index + 1}`} style={{ color: 'black' }}>
                                        {poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}
                                    </Link>
                                </td>
                            </tr>) : null)
                        )).reverse()) : 'Nothing here'
                    ) : (
                        pokemon ? (pokemon.map((poke, index) => (
                            (poke.name.includes(filter) ? (<tr key={poke.name}>
                                <th scope="row">{
                                    index + 1}</th><td><Link to={`pokemon/${index + 1}`} style={{ color: 'black' }}>
                                        {poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}
                                    </Link>
                                </td>
                            </tr>) : null)
                        ))) : 'Nothing here'
                    )}

                </tbody>
            </table>
        </>
    )
}

export default Table