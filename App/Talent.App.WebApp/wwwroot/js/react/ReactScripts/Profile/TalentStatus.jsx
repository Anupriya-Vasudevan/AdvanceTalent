import React from 'react'
import { Form, Checkbox } from 'semantic-ui-react';
import { SingleInput } from '../Form/SingleInput.jsx';

export default class TalentStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "React"
          };
          this.onValueChange = this.onValueChange.bind(this);
        }
      
        onValueChange(event) {
          this.setState({
            selectedOption: event.target.value
          });
          var updateData = 
            this.selectedOption
        

        //update props here
        this.props.saveProfileData(updateData)
        }
      
       
      
        render() {
          return (
            <form >
              <div className="sixteen wide column">
                  <p>Current status</p>
                <label>
                  <input
                    type="radio"
                    value="Actively looking for job"
                    checked={this.state.selectedOption === "Actively looking for job"}
                    onChange={this.onValueChange}
                  />
                 Actively looking for job
                </label>
              </div>
              <div className="radio">
                <label>
                  <input
                    type="radio"
                    value="Not looking for job at that moment"
                    checked={this.state.selectedOption === "Not looking for job at that moment"}
                    onChange={this.onValueChange}
                  />
                Not looking for job at that moment
                </label>
              </div>
              <div className="radio">
                <label>
                  <input
                    type="radio"
                    value="currently employed but ope to offers"
                    checked={this.state.selectedOption === "currently employed but ope to offers"}
                    onChange={this.onValueChange}
                  />
                 currently employed but ope to offers
                </label>
              </div>
              <div className="radio">
                <label>
                  <input
                    type="radio"
                    value="will be avilable on later dates"
                    checked={this.state.selectedOption === "will be avilable on later dates"}
                    onChange={this.onValueChange}
                  />will be avilable on later dates
                </label>
                </div>
             
            </form>
          );
        }
      }
      