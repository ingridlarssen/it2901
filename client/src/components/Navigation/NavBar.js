import React, {Component} from 'react';
import './Navigation.css';
import { FaBars } from 'react-icons/fa';
import {IoIosStats} from 'react-icons/io';
import {MdHome, MdPeople, MdSettings} from 'react-icons/md';
import {NavLink} from 'react-router-dom';


class NavBar extends Component {
 
    constructor() {
        super();
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }

    //Opens and closes the navbar in mobile devices
    toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

      //To be deleted
      test() {
          alert("Tar i mot klikk. Skal rute til annen side?")
      }

    render() {
        const className = this.state.isOpen ? "NavbarToggleShow" : "NavbarItems";
        return (
            <div>
                <h3 className="NavToggle"><FaBars className="NavToggle" onClick={this.toggle} size={28} /></h3>
                <div className="Navbar">
                    <nav className={className}>
                        <div className="NavButtons">
                            <NavLink className="NavbarLink" exact to="/">
                                <MdHome size={30}/>
                                <p>Hjem</p>
                            </NavLink>
                        </div>
                        <div className="NavButtons">
                            <NavLink className="NavbarLink" exact to="/employees">
                                <MdPeople size={30}/> 
                                <p>Ansatte</p>
                            </NavLink>
                        </div>
                        <div className="NavButtons">
                            <NavLink className="NavbarLink" exact to="/stats">
                                <IoIosStats size={30}/>
                                <p>Statistikk</p>
                            </NavLink>
                        </div>
                        <div className="NavButtons">
                            <NavLink className="NavbarLink" exact to="/settings">
                                <MdSettings size={30}/>
                                <p>Innstillinger</p>
                            </NavLink>
                        </div>
                    </nav>
                </div>
            </div>
         ) 
        }
    }

  export default NavBar;