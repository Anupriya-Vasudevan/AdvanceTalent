﻿import React from 'react';
import Cookies from 'js-cookie';
import SocialMediaLinkedAccount from './SocialMediaLinkedAccount.jsx';
import { IndividualDetailSection } from './ContactDetail.jsx';
import FormItemWrapper from '../Form/FormItemWrapper.jsx';
import { Address, Nationality } from './Location.jsx';
import Language from './Language.jsx';
import Skill from './Skill.jsx';
import Education from './Education.jsx';
import Certificate from './Certificate.jsx';
import VisaStatus from './VisaStatus.jsx'
import PhotoUpload from './PhotoUpload.jsx';
import VideoUpload from './VideoUpload.jsx';
import CVUpload from './CVUpload.jsx';
import SelfIntroduction from './SelfIntroduction.jsx';
import Description from './Description.jsx';
import Experience from './Experience.jsx';
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';
import { LoggedInNavigation } from '../Layout/LoggedInNavigation.jsx';
import TalentStatus from './TalentStatus.jsx';

export default class AccountProfile extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            profileData: {
                address: {},
                nationality: '',
                education: [],
                languages: [],
                skills: [],
                experience: [],
                certifications: [],
                visaStatus: '',
                visaExpiryDate: '',
                profilePhoto: '',
                linkedAccounts: {
                    linkedIn: "",
                    github: ""
                },
                jobSeekingStatus: {
                    status: "",
                    availableDate: null
                }
            },
            loaderData: loaderData,

        }

        this.updateWithoutSave = this.updateWithoutSave.bind(this)
        this.updateAndSaveData = this.updateAndSaveData.bind(this)
        this.updateForComponentId = this.updateForComponentId.bind(this)
        this.saveProfile = this.saveProfile.bind(this)
        this.loadData = this.loadData.bind(this)
        this.init = this.init.bind(this);
    };

    init() {
        let loaderData = this.state.loaderData;
        loaderData.allowedUsers.push("Talent");
        loaderData.isLoading = false;
        this.setState({ loaderData, })
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/getTalentProfile',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            success: function (res) {
                this.updateWithoutSave(res.data)
                console.log(res.data)
            }.bind(this)
        })
        this.init()
    }
    //updates component's state without saving data
    updateWithoutSave(newValues) {
        let newProfile = Object.assign({}, this.state.profileData, newValues)
        this.setState({
            profileData: newProfile
        })
    }

    //updates component's state and saves data
    updateAndSaveData(newValues) {
        let newProfile = Object.assign({}, this.state.profileData, newValues)
        this.setState({
            profileData: newProfile
        }, this.saveProfile)
    }

    updateForComponentId(componentId, newValues) {
        this.updateAndSaveData(newValues)
    }

    saveProfile() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/updateTalentProfile',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(this.state.profileData),
            success: function (res) {
                console.log(res)
                if (res.success == true) {
                    TalentUtil.notification.show("Profile updated sucessfully", "success", null, null)
                } else {
                    TalentUtil.notification.show("Profile did not update successfully", "error", null, null)
                }

            }.bind(this),
            error: function (res, a, b) {
                console.log(res)
                console.log(a)
                console.log(b)
            }
        })
    }

    render() {
        const profile = {
            firstName: this.state.profileData.firstName,
            lastName: this.state.profileData.lastName,
            email: this.state.profileData.email,
            phone: this.state.profileData.phone
        }
        return (
            <BodyWrapper reload={this.loadData} loaderData={this.state.loaderData}>
                <section className="page-body">
                    <div className="ui container">
                        <div className="ui container">
                            <div className="profile">
                                <form className="ui form">
                                    <div className="ui grid">
                                        <FormItemWrapper
                                            title='Linked Accounts'
                                            tooltip='Linking to online social networks adds credibility to your profile'
                                        >
                                            <SocialMediaLinkedAccount
                                               details={this.state.profileData}
                                                controlFunc={this.updateForComponentId}
                                                componentId='linkInDetails'
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='User Details'
                                            tooltip='Enter your contact details'
                                        >
                                            <IndividualDetailSection
                                                controlFunc={this.updateForComponentId}
                                                details={profile}
                                                componentId='contactDetails'
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Address'
                                            tooltip='Enter your current address'>
                                            <Address
                                                controlFunc={this.updateForComponentId}
                                                addressData={this.state.profileData.address}
                                                updateProfileData={this.updateWithoutSave}
                                                saveProfileData={this.updateAndSaveData}
                                                componentId='Address'
                                            />
                                        </FormItemWrapper>
                                       
                                        <FormItemWrapper
                                            title='Nationality'
                                            tooltip='Select your nationality'
                                        >
                                            <Nationality
                                                nationalityData={this.state.profileData.nationality}
                                                saveProfileData={this.updateAndSaveData}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Languages'
                                            tooltip='Select languages that you speak'
                                        >
                                            <Language
                                                details={this.state.profileData}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Skills'
                                            tooltip='List your skills'
                                        >
                                            <Skill
                                                details={this.state.profileData}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Work experience'
                                            tooltip='Add your work experience'
                                        >
                                            <Experience
                                                details={this.state.profileData}
                                            />
                                        </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Visa Status'
                                            tooltip='What is your current Visa/Citizenship status?'
                                        >
                                          
                                          <VisaStatus
                                                details={this.state.profileData}
                                                controlFunc={this.updateForComponentId}
                                                componentId='VisaStatus'
                                            />
                                            </FormItemWrapper>
                                        <FormItemWrapper
                                            title='Status'
                                            tooltip='What is your current status in jobseeking?'>
                                        <TalentStatus
                                                status={this.state.profileData.jobSeekingStatus}
                                                updateProfileData={this.updateWithoutSave}
                                                saveProfileData={this.updateAndSaveData}
                                            />
                                            </FormItemWrapper>
                                        <FormItemWrapper
                                        >
                                         <Description
                                                details={this.state.profileData}
                                                // controlFunc={this.updateAndSaveLinkIn}
                                                controlFunc={this.updateForComponentId}
                                                componentId='descriptionDetails'
                                            />
                                       </FormItemWrapper>
                                       <FormItemWrapper
                                            title='Profile Photo'
                                            tooltip='Please upload your profile photo'
                                            hideSegment={true}
                                        >
                                            <PhotoUpload
                                                details={this.state.profileData}
                                            // updateProfileData={this.updateWithoutSave}

                                            />
                                        </FormItemWrapper>
                                    </div>
                                </form>
                            </div >
                        </div>
                    </div>
                </section>
            </BodyWrapper>
        )
    }
}
