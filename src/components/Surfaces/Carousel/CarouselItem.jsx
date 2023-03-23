import { InterpreterModeSharp } from '@mui/icons-material';
import React from 'react';
import Carousel from 'react-material-ui-carousel'
import Items from './Items';
import slider from './slider.json'

const CarouselItem = (props) =>
{
   

    return (
        <Carousel duration= '1000' interval='7000' stopAutoPlayOnHover={false} swipe={true}>
            {
                slider.map( (item) => <Items key={item.id} item={item} /> )
            }
        </Carousel>
    )
}


export default CarouselItem