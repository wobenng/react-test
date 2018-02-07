import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {setFilter} from '../actions.js';

const Link = ({active,children,onClick}) => {
    if(active){
        return <b>{children}</b>;
    }else{
        return(
            <a href="#"  onClick={(ev) => {
                ev.preventDefault();
                onClick();
              }}>{children}</a>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        active: state.filter === ownProps.filter
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: () => {
      dispatch(setFilter(ownProps.filter));
    }
});

Link.propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Link);