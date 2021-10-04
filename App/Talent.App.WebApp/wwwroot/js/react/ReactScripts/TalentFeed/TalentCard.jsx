import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types'
import { Popup, Icon } from 'semantic-ui-react'

export default class TalentCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            address: "",
            contactEmail: "",
            contactPhone: ""
        }

        this.loadEmployer = this.loadEmployer.bind(this);
    }

    componentDidMount() {
        this.loadEmployer();
    }

    

    
    
    render() {
       
    }
}

