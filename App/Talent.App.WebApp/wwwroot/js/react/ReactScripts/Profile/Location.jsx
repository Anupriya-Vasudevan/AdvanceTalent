import React from 'react'
import Cookies from 'js-cookie'
import { default as countries } from '../../../../util/jsonFiles/countries.json';
import { ChildSingleInput } from '../Form/SingleInput.jsx';


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
    console.log(this.props.addressData)

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
          
        const details = props.nationalityData ?
        Object.assign({}, this.props.nationalityData)
        : {
            nationality: ""
        }

    this.state = {
        newNationality: details
    };

        this.update = this.update.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveContact = this.saveContact.bind(this)
    }
    update() {
        console.log("mouse Enter!!")
        const details = Object.assign({}, this.props.nationalityData)
        this.setState({
            newNationality: details
            
        })
    }
    componentDidUpdate(prevProps) {
        /*  console.log("componentDidUpdate") */
        if (this.props.nationalityData !== prevProps.nationalityData) {
            const details = Object.assign({}, this.props.nationalityData)
            this.setState({
                newNationality: details
                //this.props.details.id
            })
        }
    }
    

    handleChange(event) {
        console.log(event.target.name)
        console.log(event.target.value)
        const data = Object.assign({}, this.state.newNationality)
        data[event.target.name] = event.target.value
        this.setState({
            newNationality: data
        })
        this.saveContact(data);
    }

    saveContact(data) {
        //const number = this.state.newContact.number
       
        console.log("saveContact!!")
        // const data = Object.assign({}, this.state.newContact)
        console.log(data)
        this.props.saveProfileData(this.props.componentId, data)
        
    }

    render() {
        let countriesOptions = [];
        //let citiesOptions = [];
        const selectednationality = this.state.newnationality;
        //const selectedCity = this.props.location.city;
        
        countriesOptions = Object.keys(countries).map((x) => <option key={x} value={x}>{x}</option>);

       
    
    return(
        <div>
             <select className="ui right labeled dropdown"
                    placeholder="nationality"
                    value={selectednationality}
                    onChange={this.handleChange}
                    name="nationality">
                    <option value="">Select a nationality</option>
                    {countriesOptions}
                </select>
            </div>
        )
    }
    
}