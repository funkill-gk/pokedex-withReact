// JavaScript source code
import React, { useEffect, useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Typography, CircularProgress, Button } from '@material-ui/core'
import { toFirstCharUppercase } from './comfunc';
import axios from 'axios';
import './pokemon.css';

const useStyles = makeStyles(() => ({
    h1: {

        textAlign: "center",
    },
}));

const Pokemon = props => {
    const { history,match } = props;
    const { params } = match;
    const { pokemonId } = params;
    const [pokemon, setpokemon] = useState(undefined);


    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/` + [pokemonId] + '/')
            .then(function (response) {
                const { data } = response;
                setpokemon(data);
            })
                .catch(function (error) {
                    setpokemon(false);

                });
    }, [pokemonId]);
        
    
    const generatepokeDetails = () => {
        const classes = useStyles;
        const { name, id, species, height, weight, types, sprites } = pokemon;
        const fullpokepic = 'https://pokeres.bastionbot.org/images/pokemon/' + id + '.png';
        const { front_default } = sprites;
       

        return (
            <>
                <Typography variant="h1" align='center'> {id}.{toFirstCharUppercase(name)} 
                    
                    <img src={front_default} />
                </Typography>
                <img style={{ width: "300px", height: "300px" }} src={fullpokepic} />
                <div>
                    <Typography variant="h3">Pokemon Info</Typography>
                    <Typography>
                        {"Species :"}{species.name}
                    </Typography>
                    <Typography> Weight: {weight} </Typography>
                    <Typography> Height: {height} </Typography>
                    <Typography variant="h6"> Types: </Typography>
                    {types.map((typeInfo) => {
                        const { type } = typeInfo;
                        const { name } = type;
                        return <Typography key={name}> {name}</Typography>;
                    })}
                </div>

            </>

        );
    };

    
    return (
        <>
            {pokemon === undefined && <CircularProgress />}
            {pokemon !== undefined && pokemon && generatepokeDetails()}
            {pokemon === false && <Typography>404:Oops! pokemon not found...</Typography>}
            {pokemon !== undefined && (
                <Button variant="contained" onClick={() => history.push("/")}>
                    Back To pokedex
                </Button>
                   ) }


        </>
    );
        
    
};
export default Pokemon;