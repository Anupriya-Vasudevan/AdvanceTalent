import React from 'react';
import { Loader,Icon,Card,Image,Container } from 'semantic-ui-react';

export default class CompanyProfile extends React.Component {
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

    loadEmployer() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'https://talentservicesprofile20210219125952.azurewebsites.net/profile/profile/getEmployerProfile',
            //url: 'http://localhost:60290/profile/profile/getEmployerProfile',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            success: function (res) {
                const company = res.employer.companyContact;
                this.setState({
                    name: company.name,
                    address: company.location.city + ", " + company.location.country,
                    contactEmail: company.email,
                    contactPhone: company.phone
                });
            }.bind(this)
        })
    }

    render() {
        return (
            <Card>
                <Card.Content>
                    <Image style={{ margin: '20px', marginLeft: '35%' }} src='https://semantic-ui.com/images/wireframe/image.png' size='tiny' circular />
                    <br />
                    <Card.Header textAlign="center">{this.state.name}</Card.Header>
                    <Container textAlign='center'>
                        <Icon name='map marker alternate'></Icon>{this.state.address}
                    </Container>
                    <br />
                    <Card.Description textAlign='center'>We currently do not have specific skills that we desire.</Card.Description>

                </Card.Content>
                <Card.Content extra>
                    <Icon name='phone'></Icon>: {this.state.contactPhone}
                    <br />
                    <Icon name='mail'></Icon>: {this.state.contactEmail}
                </Card.Content>
            </Card>

        )
    }
}
