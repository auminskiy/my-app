import getName from '../../store/useTeam';
import React from 'react';


const CouponName = ({name}) => {
    const getTeamName = getName(state => state.getTeam)
    console.log(name)
return(
    <div>ghbdtn
<div onChange={() => getTeamName(name)}> {name}</div>
</div>
)}
export default CouponName