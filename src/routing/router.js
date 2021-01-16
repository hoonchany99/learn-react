import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Dynamic from '../RoutingComps/Dynamic'
import Static from '../RoutingComps/Static'
import NotFound from '../RoutingComps/NoFound'

class Hola extends Component {
    render() {
        const loggedIn = true
        const supportHistory = 'pushState' in window.history
        return (
            <div className='App'>
                <nav className='navbar navbar-light bg-light'>
                    <a className='navbar-brand' href='/'>Navbar</a>
                </nav>

                <BrowserRouter forceRefresh={!supportHistory}>
                    <Switch>
                        <Route exact path='/' component={Static}></Route>
                        <Route exact path='/about' component={Static}></Route>
                        <Route path='/posts/:slug' component={Dynamic}></Route>
                        <Route component={NotFound}></Route>

                        <Route exact path='/user' render={() => (
                            loggedIn === true ? (
                                <Redirect to='/posts/hello-there/'></Redirect>
                            ) : (
                                    <Static></Static>
                                )
                        )}></Route>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}

export default Hola