import React from 'react'
import Cookies from 'js-cookie'
import { default as countries } from '../../../../util/jsonFiles/countries.json';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Container, Button, Form, Select } from 'semantic-ui-react';

export class Address extends React.Component {
    constructor(props) {
        super(props)
      
        const addressData = props.addressData ?
        Object.assign({},  props.addressData)
        : {
            number:"",
            street:"",
            subrub:"",
            postCode:"",
            city:" ",
            country:" ",
           
        }

    this.state = {
        showEditSection: false,
        newaddressdata:addressData
    }

    this.openEdit = this.openEdit.bind(this)
    this.closeEdit = this.closeEdit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.saveContact = this.saveContact.bind(this)
    this.renderEdit = this.renderEdit.bind(this)
    this.renderDisplay = this.renderDisplay.bind(this)
}

openEdit() {
    const addressData  = Object.assign({}, this.props.addressData)
    this.setState({
        showEditSection: true,
        newaddressdata:addressData
    })
}

closeEdit() {
    this.setState({
        showEditSection: false
    })
}

handleChange(event) {
    const data = Object.assign({}, this.state.newaddressdata)
    data[event.target.name] = event.target.value
    this.setState({
       newaddressdata: data
    })
}

saveContact() {
    const address = Object.assign({}, this.state.newaddressdata)

       const data = Object.assign({}, this.props.addressData)

       //address is object of profile data with set of properties
       data.address=address
       console.log(address)
      console.log(data.address)
      
    this.props.controlFunc(this.props.componentId, data)
    this.props.saveProfileData(data)
   
    this.closeEdit()
}

render() {
    return (
        this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
    )
}

renderEdit() {
    let countriesOptions = [];
    let citiesOptions = [];
    const selectedCountry = this.state.newaddressdata.country
    const selectedCity = this.state.newaddressdata.city;

    countriesOptions = Object.keys(countries).map((x) => <option key={x} value={x}>{x}</option>);
    //var popCities = countries[selectedCountry].map(x => <option key={x} value={x}> {x}</option>);

    if (selectedCountry != "" && selectedCountry != null) {

        var popCities = countries[selectedCountry].map(x => <option key={x} value={x}> {x}</option>);
    }

    return (
        <div className='ui ten wide column'>
            <div className="numberinputfield">
            <ChildSingleInput
                inputType="text"
                label="number"
                name="number"
                value={this.state.newaddressdata.number}
                controlFunc={this.handleChange}
                maxLength={80}
               
            />
            </div>
            <div className="streetinputfield">
             <ChildSingleInput
                inputType="text"
                label="street"
                name="street"
                value={this.state.newaddressdata.street}
                controlFunc={this.handleChange}
                maxLength={80}
               
            /></div>
            <div className="suburbinputfield">
            <ChildSingleInput
                inputType="text"
                label="subrub"
                name="subrub"
                value={this.state.newaddressdata.subrub}
                controlFunc={this.handleChange}
                maxLength={80}
                
            />
            
            </div>
            <div> <div className="countryandcitydropdown">
                    <label className="locationlabel">country</label>
                    <select className="ui right labeled dropdown"
                        placeholder="country"
                        value={selectedCountry}
                        onChange={this.handleChange}
                        name="country">

                        <option value="">Select a nationality</option>
                        {countriesOptions}
                    </select>
                </div>

                <div className="countryandcitydropdown">
                <label className="locationlabel" >city</label>
                    <select className="ui right labeled dropdown"
                        placeholder="city"
                        value={popCities }
                        onChange={this.handleChange}
                        name="city">
                        <option value="">Select a city</option>
                        {popCities}
                    </select>
                </div>
                <div className="suburbinputfield" style={{ marginTop: ".5px", verticalAlign: "top" }}>
                    <ChildSingleInput
                        inputType="number"
                        label="Post code"
                        name="postCode"
                        defaultValue={this.state.newaddressdata.postCode}
                        controlFunc={this.handleChange}
                        maxLength={80}
                    />
                </div>
                    </div>
            <button type="button" className="ui teal button" onClick={this.saveContact}>Save</button>
            <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
        </div>
    )
}

renderDisplay() {

    let number = this.props.addressData ? `${this.props.addressData.number}` : ""
    let street = this.props.addressData ? `${this.props.addressData.street}` : ""
    let subrub = this.props.addressData ? `${this.props.addressData.subrub}` : ""
    let postCode = this.props.addressData ? `${this.props.addressData.postCode}` : ""
    let city = this.props.addressData ? `${this.props.addressData.city}` : ""
    let country = this.props.addressData ? this.props.addressData.country : ""
    console.log("hello");
    console.log( this.props.addressData)

    return (
        <div className='row'>
            
            <div className="ui sixteen wide column">
                <React.Fragment>
                    <p>Address:{number+','+street+','+subrub+','+postCode}</p>
                    <p>City: {city}</p>
                    <p>Country: {country}</p>
                </React.Fragment>
                <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
            </div>
        </div>
    )
}
}


export class Nationality extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nationality: "",
            showPlaceholderIfEmptyNation: false
        }

        this.findDefault = this.findDefault.bind(this);
        this.saveNation = this.saveNation.bind(this);
        this.changeNation = this.changeNation.bind(this);
    }

    findDefault() {
        //console.log(this.state.data);
        let result = this.state.data.find(x => x.value === this.props.nationalityData)
        return result.value
    }

    componentDidMount(pre) {
       
    }

    componentDidUpdate(prevProps) {
        if (this.props.nationalityData !== prevProps.nationalityData) {
            this.setState({
                showPlaceholderIfEmptyNation: true
            })
        }
    }

    saveNation() {
        this.props.saveProfileData({
            nationality: this.state.nationality === "" ? this.props.nationalityData : this.state.nationality
        });
    }

    changeNation(e, { value }) {
        this.setState({
            nationality: value
        });
    }

    render() {
        const data = require('../../../../util/jsonFiles/countries.json');
        let countryList = [];
        for (const [key] of Object.entries(data)) {
            countryList.push({ key: key, value: key, text: key });
        };
        //const nationality = (this.props.nationalityData === "" || this.props.nationalityData === null) ? "" : this.props.nationalityData;
        if (!this.state.showPlaceholderIfEmptyNation) {
            return (
                <React.Fragment>
                    <Container style={{ margin: '20px' }}>
                        <Form>
                            <Form.Select
                                options={countryList}
                                //width={6}
                                placeholder="Please select your nationality"
                                onChange={(e, d) => this.changeNation(e, d)}
                            //defaultValue={}
                            >
                            </Form.Select>

                        </Form>
                        <br />
                        <Button
                            color='teal'
                            onClick={() => this.saveNation()}
                            floated='left'
                        >
                            Save
                        </Button>
                    </Container>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <Container style={{ margin: '20px' }}>
                        <div>{ }</div>
                        <Form>
                            <Form.Select
                                options={countryList}
                                onChange={(e, d) => this.changeNation(e, d)}
                                defaultValue={this.props.nationalityData}
                            >
                            </Form.Select>
                        </Form>
                        <br />
                        <Button
                            color='teal'
                            onClick={() => this.saveNation()}
                            floated='left'
                        >
                            Save
                        </Button>
                    </Container>
                </React.Fragment>
            );
        }

    }
}