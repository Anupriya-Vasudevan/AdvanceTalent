import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie'
import TalentCard from '../TalentFeed/TalentCard.jsx';
import { Loader,Grid,Container,Segment } from 'semantic-ui-react';
import CompanyProfile from '../TalentFeed/CompanyProfile.jsx';
import FollowingSuggestion from '../TalentFeed/FollowingSuggestion.jsx';
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';

export default class TalentFeed extends React.Component {
    constructor(props) {
        super(props);

        let loader = loaderData
        loader.allowedUsers.push("Employer")
        loader.allowedUsers.push("Recruiter")

        this.state = {
           loadNumber: 5,
           loadPosition: 0,
           feedData: [],
            watchlist: [],
           loaderData: loader,
           loadingFeedData: false,
            companyDetails: null
        }

        this.init = this.init.bind(this);
        this.loadTalent = this.loadTalent.bind(this);
        //this.setState({ loaderData });

    };

    init() {
       let loader = TalentUtil.deepCopy(this.state.loaderData)
        loader.isLoading = false


    }

    componentDidMount() {
    //    window.addEventListener('scroll', this.handleScroll);
    this.loadTalent();
        this.init()
    };

    loadTalent() {
        var cookies = Cookies.get('talentAuthToken');
        let data = {
            'position': this.state.loadPosition,
            'number': this.state.loadNumber
        };
        $.ajax({
           
            url: 'http://localhost:60290/profile/profile/getTalent',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            data: data,
            success: function (res) {
                this.setState({
                    feedData: res.data
                })
            }.bind(this)
        })
    }

    render() {
        const talents = this.state.feedData;
        if (talents.length == 0) {
            return (
                <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                    <Container style={{ margin: '20px' }}>
                        <Grid columns='equal'>
                            <Grid.Column>
                                <CompanyProfile />
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Segment>
                                    <p>There are no talents found for your recruiment company</p>
                                </Segment>


                            </Grid.Column>
                            <Grid.Column>
                                <FollowingSuggestion />
                            </Grid.Column>

                        </Grid>
                    </Container>
                </BodyWrapper>
            )
        } else {
            return (
                <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                    <Container style={{ margin: '20px' }}>
                        <Grid columns='equal'>
                            <Grid.Column>
                                <CompanyProfile />
                            </Grid.Column>
                            <Grid.Column width={8}>
                                {talents.map(x => {
                                    return (
                                        <TalentCard key={x.id} data={x} />
                                    )
                                })}
                            </Grid.Column>
                            <Grid.Column>
                                <FollowingSuggestion />
                            </Grid.Column>

                        </Grid>
                    </Container>
                </BodyWrapper>
            )
        }
    }
}