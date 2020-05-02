import React from 'react'

import classes from './BuildControl.module.css'

const BuildControl = props => {
    const noneLeft = props.amountLeft > 0 ? false : true
    return(
        <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button className={classes.Less} onClick={props.remove} disabled={noneLeft}>Less</button>
        <button className={classes.More} onClick={props.added}>More</button>
    </div>
)}


export default BuildControl