/* Self introduction section */
import React, { Component } from 'react';
import Cookies from 'js-cookie'
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Description } from './Description.jsx';

export default class SelfIntroduction extends React.Component {
    constructor(props) {
        super(props);
        this.saveContact = this.saveContact.bind(this)
        this.handleChange = this.handleChange.bind(this)
    };

    saveContact() {
        const data = Object.assign({}, this.props.description)
        this.props.updateProfileData(this.props.componentId, data)
        //this.closeEdit()
    }

    handleChange(event) {
        const data = Object.assign({}, this.props.description)
        data[event.target.name] = event.target.value
        this.setState({
            description: data
        })}
    render(item) {
        let summary = this.props.summary
        return (
        
           
            <div>
                
                 <div className='ui sixteen wide column'>
                
               
               <p>Summary must be no more than 150 characters</p>
                    <div className="field" >
                    <input
                            type="text"
                            name="summary"
                            placeholder="Please provide a short summary about your self"
                            defaultValue={summary}
                            onChange={this.handleChange}
                            onBlur={this.update}
                        />
                    </div>
                    <p>Description must be between 150-600 characters</p>
                    <Description description={this.props.description} updateStateData={this.handleChange} 
                />
               
                <button type="button" className="ui right floated teal button" onClick={this.saveContact}>Save</button> 
          </div></div>
            
        )
    }
}
