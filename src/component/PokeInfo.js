import axios from 'axios'
import React, { Component } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const PokeInfo = (props) => {
    const { index } = useParams()
    const [species, setName] = useState('')
    const [image, setImage] = useState('')
    const [types, setTypes] = useState([])
    const [stats, setStats] = useState({
    })
    const [info, setInfo] = useState({
        description: '',
        genderRatioFemale: '',
        genderRatioMale: '',
        catchRate: '',
        eggGroups: '',
        hatchSteps: ''
    })

    const TYPE_COLORS = {
        bug: 'B1C12E',
        dark: '4F3A2D',
        dragon: '755EDF',
        electric: 'FCBC17',
        fairy: 'F4B1F4',
        fighting: '823551',
        fire: 'E73B0C',
        flying: 'A3B3F7',
        ghost: '6060B2',
        grass: '74C236',
        ground: 'D3B357',
        ice: 'A3E7FD',
        normal: 'C8C4BC',
        poison: '934594',
        psychic: 'ED4882',
        rock: 'B9A156',
        steel: 'B5B5C3',
        water: '3295F6'
    };

    useEffect(async () => {
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${index}/`
        const pokemonSpecies = `https://pokeapi.co/api/v2/pokemon-species/${index}/`

        // Get info
        const pokeRes = await axios.get(pokemonUrl)
        const name = pokeRes.data.name
        setName(name.charAt(0).toUpperCase() + name.slice(1))

        const img = pokeRes.data.sprites.front_default
        setImage(img)

        const types = pokeRes.data.types.map(type => type.type.name);
        setTypes(types)

        let { hp, attack, defense, speed, specialAttack, specialDefense } = '';

        pokeRes.data.stats.map(stat => {
            switch (stat.stat.name) {
                case 'hp':
                    hp = stat['base_stat'];
                    break;
                case 'attack':
                    attack = stat['base_stat'];
                    break;
                case 'defense':
                    defense = stat['base_stat'];
                    break;
                case 'speed':
                    speed = stat['base_stat'];
                    break;
                case 'special-attack':
                    specialAttack = stat['base_stat'];
                    break;
                case 'special-defense':
                    specialDefense = stat['base_stat'];
                    break;
                default:
                    break;
            }
        });


        setStats({ hp, attack, defense, speed, specialAttack, specialDefense })

        await axios.get(pokemonSpecies).then(res => {
            let description = '';
            res.data.flavor_text_entries.some(flavor => {
                if (flavor.language.name === 'en') {
                    description = flavor.flavor_text;
                    return;
                }
            });
            const femaleRate = res.data['gender_rate'];
            const genderRatioFemale = 12.5 * femaleRate;
            const genderRatioMale = 12.5 * (8 - femaleRate);

            const catchRate = Math.round((100 / 255) * res.data['capture_rate']);

            const eggGroups = res.data['egg_groups']
                .map(group => {
                    return group.name
                        .toLowerCase()
                        .split(' ')
                        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                        .join(' ');
                })
                .join(', ');

            const hatchSteps = 255 * (res.data['hatch_counter'] + 1);

            setInfo({
                description,
                genderRatioFemale,
                genderRatioMale,
                catchRate,
                eggGroups,
                hatchSteps
            });
        });
    }, [])

    const themeColor = `${TYPE_COLORS[types[types.length - 1]]}`;

    return (
        <div className="container py-5">
            <div className="col-md">
                <div className="card bg-light text-dark" 
                style={{borderWidth:'8px', borderColor: `#${TYPE_COLORS[types[0]]}`, boxShadow: '0px 0px 11px black'}}>
                    <div className="card-header">
                        <div className="row align-items-center">
                            <div className="col">
                                <h2>#{index}</h2>
                            </div>
                            <div className="col">
                                <h2>{species}</h2>
                            </div>
                            <div className="col text-right">
                                {types.map(type => (
                                    <span
                                        key={type}
                                        className="badge badge-pill mr-2 p-2"
                                        style={{
                                            backgroundColor: `#${TYPE_COLORS[type]}`,
                                            color: 'white',
                                            borderRadius: 30,
                                            fontSize: 15
                                        }}
                                    >
                                        {type
                                            .toLowerCase()
                                            .split(' ')
                                            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                                            .join(' ')}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="card-body text-center bg-white">
                        <div className="row align-items-center my-3">
                            <div className="col-6">
                                <img src={image} alt="" className='w-75 bg-light rounded-circle' />
                            </div>
                            <div className="col-6">
                                <div className="row align-items-center">
                                    <div className="col-12 text-left">
                                        <b>HP</b>
                                    </div>
                                    <div className={`col-12 col-md-12`}>
                                        <div className="progress">
                                            <div
                                                className="progress-bar"
                                                role="progressbar"
                                                style={{
                                                    width: `${100*stats.hp/130}%`,
                                                    backgroundColor: `${stats.hp > 130 ? "#b54cfa" : stats.hp > 85 ? "red" : stats.hp > 60 ? "orange" : "green"}`
                                                }}
                                                aria-valuenow="25"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            >
                                                {stats.hp}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className="col-12 text-left">
                                        <br />
                                        <b>ATK</b>
                                    </div>
                                    <div className={`col-12 col-md-12`}>
                                        <div className="progress">
                                            <div
                                                className="progress-bar"
                                                role="progressbar"
                                                style={{
                                                    width: `${100*stats.attack/130}%`,
                                                    backgroundColor: `${stats.attack > 130 ? "#b54cfa" :stats.attack > 85 ? "red" : stats.attack > 60 ? "orange" : "green"}`
                                                }}
                                                aria-valuenow="25"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            >
                                                {stats.attack}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className="col-12 text-left">
                                        <br />
                                        <b>DEF</b>
                                    </div>
                                    <div className={`col-12 col-md-12`}>
                                        <div className="progress">
                                            <div
                                                className="progress-bar"
                                                role="progressbar"
                                                style={{
                                                    width: `${100*stats.defense/130}%`,
                                                    backgroundColor: `${stats.defense > 130 ? "#b54cfa" :stats.defense > 85 ? "red" : stats.defense > 60 ? "orange" : "green"}`
                                                }}
                                                aria-valuenow="25"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            >
                                                {stats.defense}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className="col-12 text-left">
                                        <br />
                                        <b>SP.ATK</b>
                                    </div>
                                    <div className={`col-12 col-md-12`}>
                                        <div className="progress">
                                            <div
                                                className="progress-bar"
                                                role="progressbar"
                                                style={{
                                                    width: `${100*stats.specialAttack/130}%`,
                                                    backgroundColor: `${stats.specialAttack > 130 ? "#b54cfa" :stats.specialAttack > 85 ? "red" : stats.specialAttack > 60 ? "orange" : "green"}`
                                                }}
                                                aria-valuenow="25"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            >
                                                {stats.specialAttack}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className="col-12 text-left">
                                        <br />
                                        <b>SP.DEF</b>
                                    </div>
                                    <div className={`col-12 col-md-12`}>
                                        <div className="progress">
                                            <div
                                                className="progress-bar"
                                                role="progressbar"
                                                style={{
                                                    width: `${100*stats.specialDefense/130}%`,
                                                    backgroundColor: `${stats.specialDefense > 130 ? "#b54cfa" :stats.specialDefense > 85 ? "red" : stats.specialDefense > 60 ? "orange" : "green"}`
                                                }}
                                                aria-valuenow="25"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            >
                                                {stats.specialDefense}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row align-items-center">
                                    <div className="col-12 text-left">
                                        <br />
                                        <b>SPD</b>
                                    </div>
                                    <div className={`col-12 col-md-12`}>
                                        <div className="progress">
                                            <div
                                                className="progress-bar"
                                                role="progressbar"
                                                style={{
                                                    width: `${100*stats.speed/130}%`,
                                                    backgroundColor: `${stats.speed > 130 ? "#b54cfa" :stats.speed > 85 ? "red" : stats.speed > 60 ? "orange" : "green"}`
                                                }}
                                                aria-valuenow="25"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            >
                                                {stats.speed}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer text-center">
                        <div className="row m-3">
                            <div className="col">
                                <h4>"{info.description}"</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PokeInfo