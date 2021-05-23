// JavaScript source code
import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Grid, Card, CardContent, CardMedia, CircularProgress, Typography , TextField, colors} from '@material-ui/core';
import { fade,makeStyles } from '@material-ui/core/styles';
import mockData from './mockdata';
import { toFirstCharUppercase } from './comfunc';
import axios from 'axios';
import SearchIcon from '@material-ui/icons/Search';



const useStyles = makeStyles((theme)=>({
    pokedexContainer: {
        paddingTop:"20px",
        paddingLeft: "50px",
        paddingRight: "50px",

    },

    CardMedia: {
        margin: "auto",
    },
    CardContent: {

        textAlign: "center",
    },
    searchContainer: {
        display: "flex",
        backgroundColor: fade(theme.palette.common.white, 0.15),
        paddingLeft: "20px",
        paddingRight: "20px",
        marginTop: "5px",
        marginBottom: "5px",
    },
    
        
    
    searchInput: {
        width: "200px",
        margin: "5px",
        color: "white",

    },
}));


const Pokedex = (props) => {

    const classes = useStyles();
    const { history } = props;
    const [pokemonData, setPokemonData] = useState({});
    const [filter, setFilter] = useState("");


    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon?limit=898`)
            .then(function (response) {
                const { data } = response;
                const { results } = data;
                const newPokemonData = {};
                results.forEach((pokemon, index) => {
                    newPokemonData[index + 1] = {
                        id : index + 1,
                        name: pokemon.name,
                        //sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + [index+1] + '.png',
                        sprite: 'https://pokeres.bastionbot.org/images/pokemon/' + [index+1] + '.png',


                    };





                });
                setPokemonData(newPokemonData);
            });
                
            
    },[]);
    const handleSearchChange = (e) => {
        setFilter(e.target.value);
    };

    const getPokemonCards = (pokemonId) => {
        console.log(pokemonData['${pokemonId}']);
        const { id, name, sprite } = pokemonData[pokemonId];
        

        return (
            <Grid item xs={4} key={pokemonId}>
                <Card onClick={() => history.push(pokemonId)}>
                   <CardMedia
                    className={classes.CardMedia}
                    image={sprite}
                    style={{ width: "100px", height: "100px" }}
                    />
                    <CardContent
                        className={classes.CardContent}>
                        <Typography>{id}.{toFirstCharUppercase(name)}</Typography>
                    </CardContent>

                </Card>
            </Grid>
        );
    };
    return (
        <>
            <AppBar style={{ background: '#FFFFFF' }} position="static">
                <Toolbar>
                    <div className={classes.searchcontainer}>
                        
                        <TextField className={classes.searchInput}
                            onChange={handleSearchChange}
                            label="Search for Pokemon"
                            variant="filled"
                            color="secondary"

                        />
                      

                    </div>

                </Toolbar>
            </AppBar>
            {pokemonData ? (
                <Grid container spacing={2} className={classes.pokedexContainer} >
                    {Object.keys(pokemonData).map(pokemonId =>
                        pokemonData[pokemonId].name.includes(filter) &&
                        getPokemonCards(pokemonId)
                    )}
                </Grid>
            ) : (<CircularProgress />)}
            
        </>
        
        );
    

};
export default Pokedex;