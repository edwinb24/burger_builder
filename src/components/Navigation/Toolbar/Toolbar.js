import React from 'react'

import classes from './Toolbar.module.css'
import Logo from './../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'

const Toolbar = (props) => 
    <header className={classes.Toolbar}>
        <div className={classes.DrawerToggle} onClick={props.openMenu}>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div className={classes.Logo}>
            <Logo/>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems/>
        </nav>
    </header>

export default Toolbar