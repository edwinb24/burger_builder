import React, {Component, Fragment} from 'react'

import Toolbar from "./../Navigation/Toolbar/Toolbar"
import SideDrawer from "./../Navigation/SideDrawer/SideDrawer"
import classes from './Layout.module.css'

class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    
    SideDrawerCloseHandler = () => {
        this.setState({
            showSideDrawer: false
        })
    }
    SideDrawerOpenHandler = () => {
        this.setState(
            prevState => {
                return {showSideDrawer: !prevState.showSideDrawer}
            }
        )
    }
    render() {
        return(
            <Fragment>
                <Toolbar openMenu={this.SideDrawerOpenHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.SideDrawerCloseHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Fragment>
        )
    }
}
        
export default Layout