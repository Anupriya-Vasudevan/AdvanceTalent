﻿import React from 'react'
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
        addressdata:addressData
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
        addressdata:addressData
    })
}

closeEdit() {
    this.setState({
        showEditSection: false
    })
}
changestreet(e) {
    let n=this.state.addressdata.street
    this.setState({
        n: e.target.value
    })
    console.log(n+"tyy")
}
handleChange(event) {
    const data = Object.assign({}, this.state.addressdata)
    console.log(event.target.name)
    console.log(event.target.value)
    //event.target.name=event.target.value
    //data[event.target.name] = event.target.value
    console.log(data)
    /*this.setState({
        addressdata: data
    })*/
    this.setState({ addressdata: Object.assign({}, this.state.addressdata, { [event.target.name]: event.target.value }) })
}
handleChangeCountry(e, { value }, data) {
    let obj = []
    data[value].forEach(element => {
        obj.push({ key: element, value: element, text: element })
    });
    this.setState({
        addressData: value,
        cityOptions: obj
    })
}

handleChangeCity(e, { value }) {
    this.setState({
        city: value
    });
}
saveContact() {
    const address = Object.assign({}, this.state.addressdata)
console.log("hhh")
       const data = Object.assign({}, this.props.addressData)

       //address is object of profile data with set of properties
       data.address=address
       console.log(address)
      console.log(data.address)
      
    this.props.controlFunc(this.props.saveProfileData, data)
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
     let countryList = [];
     const data = require('../../../../util/jsonFiles/countries.json');
    let citiesOptions = [];
    const selectedCountry = this.state.addressdata.country
    const selectedCity = this.state.addressdata.city;

   countriesOptions = Object.keys(countries).map((x) => <option key={x} value={x}>{x}</option>);
    var popCities = countries[selectedCountry].map(x => <option key={x} value={x}> {x}</option>);

   /* if (selectedCountry != "" && selectedCountry != null) {

        var popCities = countries[selectedCountry].map(x => <option key={x} value={x}> {x}</option>);
    }*/

    return (
        <React.Fragment>
                    <Container style={{ margin: '20px' }}>
                        <Form>
                            <Form.Group>
                                <Form.Input label='Number' name='number' width={4} value={this.state.addressdata.number} onChange={(e) => this.handleChange(e)} />
                                <Form.Input label='Street' name='street' width={8} value={this.state.addressdata.street} onChange={(e) => this.handleChange(e)} />
                                <Form.Input label='Subrub' name='subrub' width={4} value={this.state.addressdata.subrub} onChange={(e) => this.handleChange(e)} />
                            </Form.Group>
                            <Form.Group>
                            <div> 
                            <label >country</label>
                            <select  width={6}
                            placeholder="Country"
                            value={selectedCountry}
                            onChange={this.handleChange}
                             name="country">

                            <option value="">Select a nationality</option>
                            {countriesOptions}
                            </select>
                            </div>
                <div >
                <label>city</label>
                    <select width={6}
                        placeholder="City"
                        value={selectedCity }
                        onChange={this.handleChange}
                        name="city">
                        <option value="">Select a city</option>
                        {popCities}
                    </select>
                </div>
                                <Form.Input label='Post Code' name='postCode' value={this.state.addressdata.postCode} width={4} onChange={(e) => this.handleChange(e)} />
                            </Form.Group>
                        </Form>
                        <Button color='teal' onClick={() => {
                            
                            this.saveContact();
                        }
                        }>Save</Button>
                        <Button onClick={() => this.closeEdit()}>Cancel</Button>
                    </Container>
                </React.Fragment>
            );

        }

renderDisplay() {

    const addressData = this.props.addressData;
    console.log(addressData);
        const number = (addressData.number === "" || addressData.number === null || addressData.number === undefined) ? "" : addressData.number;
        const street = (addressData.street === "" || addressData.street === null || addressData.street === undefined) ? "" : addressData.street;
        const subrub = (addressData.subrub === "" || addressData.subrub === null || addressData.subrub === undefined) ? "" : addressData.subrub;
        const postCode = (addressData.postCode === 0 || addressData.postCode === null || addressData.postCode === undefined) ? 0 : addressData.postCode;
        const addressPart = (number === "" || street === ""
            || subrub === "" || postCode === 0) ? "" : `${number}, ${street}, ${subrub}, ${postCode}`;
        const city = addressData.city === "" ? "" : addressData.city;
        const country = addressData.country === "" ? "" : addressData.country;
    return (
        <React.Fragment>
        <Container style={{ margin: '20px' }}>
            <h4>Address: {number+","+street+","+subrub+","+postCode}</h4>
            <h4>City: {city}</h4>
            <h4>Country: {country}</h4>
            <Button onClick={this.openEdit} floated='right' color='teal'>Edit</Button>
        </Container>
    </React.Fragment>
    )
}s
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