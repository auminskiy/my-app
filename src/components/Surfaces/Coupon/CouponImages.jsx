import { Typography, Paper, Divider, } from '@mui/material';
import React from 'react';



const CouponImages = () => {
  return (
    <Paper sx={{display: {xs: 'none', md: 'flex'},
                        flexDirection: 'column',
                        height: '100%'}}>
                <Divider sx={{ backgroundColor: 'greenPrimaryDark.backgroundColor', height: '0.5em' }} variant='fullWidth'/>
               <Paper sx={{backgroundColor:'blackSL.backgroundColor',
                color:'blackSL.color', borderRadius: 0,
                height: '25vh', display: 'block', fontSize: '0.9rem',
                
               }}> 
              
               <div style={{display: 'flex',
                flexWrap: 'wrap', alignItems: 'center'}}>
                    <Typography sx={{ margin: '0.8rem', fontSize: '1em'
                    }}>Play with your favorite atheletes.</Typography>
                    <img style={{
                height: '20vh', width: '100%', display: 'flex',
                flexWrap: 'wrap', marginTop: '1rem'}}src='https://www.gannett-cdn.com/presto/2019/12/19/USAT/68072d0d-5890-45ed-a424-15709e6ad9a4-decade-illo-sheet.jpg?crop=2462,1385,x2401,y2347&width=2462&height=1385&format=pjpg&auto=webp'/>
                   </div>
                    </Paper>
                    <Divider sx={{ backgroundColor: 'yellow.backgroundColor', height: '0.2em' }} variant='fullWidth'/>  
               <Paper sx={{backgroundColor:'blackSL.backgroundColor',
                color:'blackSL.color', borderRadius: 0,
                height: '25vh', display: 'block', fontSize: '0.9rem',
                
               }}> 
               <Typography sx={{marginLeft: '0.4rem', fontSize: '1em'}}>American football</Typography>
               <div style={{display: 'flex',
                flexWrap: 'wrap', alignItems: 'center'}}>
                    <Typography sx={{fontSize: '0.8rem', marginLeft: '0.2rem', marginBottom: '0.7rem'
                    }}>is a team sport played by two teams of eleven players on a rectangular field with goalposts at each end.</Typography>
                    <img style={{
                height: '20vh', width: '100%', display: 'flex',
                flexWrap: 'wrap', }}src='https://images.daznservices.com/di/library/DAZN_News/99/46/nfl-line-of-scrimmage_1r88qyqf60ada1wl7t2bzdodga.jpg?t=2046415169&quality=60&w=1280&h=720'/>
                   </div>
                    </Paper>
                    <Divider sx={{ backgroundColor: 'yellow.backgroundColor', height: '0.2em' }} variant='fullWidth'/>  
               <Paper sx={{backgroundColor:'blackSL.backgroundColor',
                color:'blackSL.color', borderRadius: 0,
                height: '25vh', display: 'block', fontSize: '0.9rem',
                
               }}> 
               <Typography sx={{marginLeft: '0.4rem', fontSize: '1em'}}>Baseball</Typography>
               <div style={{display: 'flex',
                flexWrap: 'wrap', alignItems: 'center'}}>
                    <Typography sx={{fontSize: '0.8rem', marginLeft: '0.2rem', marginBottom: '0.7rem'
                    }}>is a bat-and-ball sport played between two teams of nine players each, taking turns batting and fielding.</Typography>
                    <img style={{
                height: '20vh', width: '100%', display: 'flex',
                flexWrap: 'wrap', }}src='https://images.sidearmdev.com/crop?url=https%3a%2f%2fdxbhsrqyrr690.cloudfront.net%2fsidearm.nextgen.sites%2fgatorzone.com%2fimages%2f2023%2f3%2f21%2fSproat_NCBWA_Cover.jpg&height=576&width=1024&type=jpeg&gravity=smart'/>
                   </div>
                    </Paper>
                    <Divider sx={{ backgroundColor: 'yellow.backgroundColor', height: '0.2em' }} variant='fullWidth'/>
               <Paper sx={{backgroundColor:'blackSL.backgroundColor',
                color:'blackSL.color', borderRadius: 0,
                height: '25vh', display: 'block', fontSize: '0.9rem',
                
               }}> 
               <Typography sx={{marginLeft: '0.4rem', fontSize: '1em'}}>Basketball</Typography>
               <div style={{display: 'flex',
                flexWrap: 'wrap', alignItems: 'center'}}>
                    <Typography sx={{fontSize: '0.8rem', marginLeft: '0.2rem', marginBottom: '0.7rem'
                    }}>is a team sport in which two teams, most commonly of five players each, opposing one another on a rectangular court.</Typography>
                    <img style={{
                height: '20vh', width: '100%', display: 'flex',
                flexWrap: 'wrap',}}src='https://blog.playo.co/wp-content/uploads/2017/12/shooting-techniques-in-basketball.jpg'/>
                   
                   </div>
                   <Divider sx={{ backgroundColor: 'yellow.backgroundColor', height: '0.2em' }} variant='fullWidth'/>  
                    </Paper>
                    </Paper>
  )
}

export default CouponImages