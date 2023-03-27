import React from 'react'
import axios from 'axios';
import { useLocation } from 'react-router-dom';




const options = {
  method: 'GET',
  url: 'https://odds.p.rapidapi.com/v4/sports',
  params: {all: 'true'},
  headers: {
    'X-RapidAPI-Key': 'd4586a76f2mshcdf7d1057829a1ep158b28jsn2e41181c391c',
    'X-RapidAPI-Host': 'odds.p.rapidapi.com'
  }
};

export const SportsApi = () => {
     
  return axios.request(options)
  .then(response => {
    const data = response.data
    console.log(data)
    const result = data.filter((data) => data.active = 'true');
    console.log(result)
    return data;
    
    
  })
}

const upcomingOdds = {
    method: 'GET',
    url: 'https://odds.p.rapidapi.com/v4/sports/upcoming/odds',
    params: {
      regions: 'eu',
      oddsFormat: 'decimal',
      markets: 'h2h,spreads,totals',
      dateFormat: 'iso'
    },
    headers: {
      'X-RapidAPI-Key': 'd4586a76f2mshcdf7d1057829a1ep158b28jsn2e41181c391c',
      'X-RapidAPI-Host': 'odds.p.rapidapi.com'
    }
  };
  
  
export const upcomingOddsApi = () => {
     
    return axios.request(upcomingOdds)
    .then(response => {
      console.log(response.data)
      let oddsMain = [...new Set(response.data.map(el => el.bookmakers[0].markets[0].outcomes))];
      console.log(oddsMain);
    
      return response.data;
      
    })
  }

 const instance = axios.create({
  params: {
    regions: 'eu',
    oddsFormat: 'decimal',
    markets: 'h2h,spreads,totals',
    dateFormat: 'iso'
  },
  headers: {
    'X-RapidAPI-Key': 'd4586a76f2mshcdf7d1057829a1ep158b28jsn2e41181c391c',
    'X-RapidAPI-Host': 'odds.p.rapidapi.com'
  }
 })


  /*
const competitionOdds = {
  method: 'GET',
  url: `https://odds.p.rapidapi.com/v4/sports/${sportKeyLocationMain}/odds`,
  params: {
    regions: 'eu',
    oddsFormat: 'decimal',
    markets: 'h2h,spreads,totals',
    dateFormat: 'iso'
  },
  headers: {
    'X-RapidAPI-Key': 'd4586a76f2mshcdf7d1057829a1ep158b28jsn2e41181c391c',
    'X-RapidAPI-Host': 'odds.p.rapidapi.com'
  }
};
*/

export const competitionOddsApi = (sportKeyLocationMain) => {
  
   
  return instance.get(`https://odds.p.rapidapi.com/v4/sports/${sportKeyLocationMain}/odds`)
  .then(response => {
    console.log(response.data)
    
    return response.data;
    
  })
}