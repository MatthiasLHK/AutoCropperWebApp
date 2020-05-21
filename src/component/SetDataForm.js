import React from "react";
import {Button, Form, Icon, Input, Modal, Header} from "semantic-ui-react";

class SetDataForm extends React.Component {


    render() {

        const InputSuccess = () => (
              <Modal trigger={<Button color= "secondary" style = {{ marginLeft:20 }}> Start Cropping! </Button>}>
                  <Modal.Description>
                    <Header style = {{color: 'green' , marginLeft: 10, marginTop: 5}}>Input Successful!</Header>
                    <text style ={{ marginBotton: 20 }}>
                      Head over to your profile to view the changes!
                    </text>
                  </Modal.Description>
              </Modal> );

        return (
            <div className = "SetDataForm">
            <Form>
                <Form.Field>
                    <label style ={{marginTop: 100, marginLeft: 10, fontSize: 21}}> Temperature </label>
                    <Icon name = "thermometer" size= "big" style = {{marginLeft: 3}}/>
                    <Input style = {{width: 130, fontSize: 12}}
                                label={{ basic: true, content: '°C'}}
                               labelPosition='right'
                               placeholder='Enter Temperature'
                             />

                    </Form.Field>
                <Form.Field>
                    <label style = {{fontSize: 19, marginLeft: 10}}> Water Content </label>
                    <Icon name = "tint" size= "big" style = {{marginLeft: 3}} />
                    <Input style = {{width: 130, fontSize: 12}}
                                                    label={{ basic: true, content: 'ml'}}
                                                   labelPosition='right'
                                                   placeholder='Enter Water Content'
                                                 />
                    </Form.Field>
                <Form.Field>
                 <label style = {{fontSize: 19, marginLeft: 10}}> Light Intensity </label>
                    <Icon name = "lightbulb outline" size = "big" style = {{marginLeft: 3}} />
                    <Input style = {{width: 135, fontSize: 12}}
                                                    label={{ basic: true, content: '??'}}
                                                   labelPosition='right'
                                                   placeholder='Enter Light Intensity'
                                                 />
                    </Form.Field>
                 <Form.Field>
                    <label style = {{fontSize: 18, marginLeft: 10}}> Fertiliser Content </label>
                    <Icon name = "leaf" size= "big" style = {{marginLeft: 3}} />
                    <Input style = {{width: 138, fontSize: 11}}
                                                    label={{ basic: true, content: 'g'}}
                                                   labelPosition='right'
                                                   placeholder='Enter Fertiliser Content'
                                                 />
                    </Form.Field>

                <InputSuccess />
            </Form>
            </div>

        )
    }
}


export default SetDataForm;