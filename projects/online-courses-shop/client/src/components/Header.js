import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
    renderLinks() {
        if (this.props.email) {
            return (
                <ul className="right">
                    <li>
                        <Link to="/signout">Sign Out</Link>
                    </li>
                    <li>
                        <Link to="/">{this.props.email}</Link>
                    </li>
                </ul>
            );
        } else {
            return (
                <ul className="right">
                    <li>
                        <Link to="/signin">Sign In</Link>
                    </li>
                    <li>
                        <Link to="/signup">Sign Up</Link>
                    </li>
                </ul>
            );
        }
    }

    render() {
        return (
            <div className="nav-wrapper">
                <nav>
                    <ul className="left">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/courses">Courses</Link>
                        </li>
                    </ul>
                    {this.renderLinks()}
                </nav>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        email: state.auth.email
    };
};

export default connect(mapStateToProps)(Header);
