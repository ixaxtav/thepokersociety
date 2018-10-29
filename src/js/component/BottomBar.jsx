import React from 'react';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';

class BottomBar extends React.Component{
    
    constructor(){
        super();
        this.state = {
            menuItems: [],
            scrolled: false
        };
    }
    
    componentWillReceiveProps(){
        this.setState({
            menuItems: this.props.menuItems
        });
    }
    
    componentWillMount(){
        this.setState({
            menuItems: this.props.menuItems
        });
    }
    
    render(){
        const rotateClass = (!this.state.scrolled) ? '': 'fa-rotate-180';
        const menuItems = this.state.menuItems.map((item,i) => 
            (<li key={i} className="nav-item" onClick={() => {
                    this.setState({ scrolled: !this.state.scrolled });
                    this.props.onClick((!this.state.scrolled) ? item.slug : 'today');
                }}>
                {
                    (item.icon) ? 
                        <i className={item.icon+" fa-lg "+rotateClass}></i> : ''
                }
                {(!this.state.scrolled) ?
                    <a className="nav-link">{item.label}</a>
                    :
                    <a className="nav-link">Got to today</a>
                }
            </li>)
        );
        return (
            <ul className="bottom-bar nav nav-fill">
                {menuItems}
            </ul>
        );
    }
}

BottomBar.propTypes = {
  // You can declare that a prop is a specific JS primitive. By default, these
  // are all optional.
  onClick: PropTypes.func.isRequired,
  menuItems: PropTypes.array.isRequired
};
BottomBar.defaultProps = {
};
export default BottomBar;