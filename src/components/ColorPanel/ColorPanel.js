import React, { Component} from 'react';
import { Button, Divider, Label, Icon, Menu, Modal, Segment, Sidebar } from 'semantic-ui-react';
import { SliderPicker } from 'react-color';
import firebase from '../../firebase';

class ColorPanel extends Component {
    state = {
        modal: false,
        primary: '',
        secondary: '',
        user: this.props.currentUser,
        usersRef: firebase.database().ref('users')
    }

    handleChangePrimary = color => this.setState({
        primary: color.hex
    })

    handleChangeSecondary = color => this.setState({
        secondary: color.hex
    })

    handleSaveColors = () => {
        if (this.state.primary && this.state.secondary){
            this.SaveColors(this.state.primary, this.state.secondary);
        }
    }

    saveColors = (primary, secondary) => {
        this.state.usersRef
            .child(`${this.state.user.uid}/colors`)
            .push()
            .update({
                primary,
                secondary
            })
            .then(() => {
                console.log('Colours Added');
                this.closeModal();
            })
            .catch(err => console.error(err));
    };

    openModal = () => {
        this.setState({
            modal: true
        })
    }

    closeModal = () => {
        this.setState({
            modal: false
        })
    }

    render() {
        const { modal, primary, secondary } = this.state;

        return (
            <Sidebar
                as={Menu}
                icon="labeled"
                inverted
                vertical
                visible
                width="very thin"
            >
                <Divider />
                <Button 
                    icon="add"
                    size="small"
                    color="blue"
                    onClick={this.openModal}
                />

                {/* Color Picker Modal */}
                <Modal
                    basic
                    open={modal}
                    onClose={this.closeModal}
                >
                    <Modal.Header>Choose App Colours</Modal.Header>
                    <Modal.Content>
                        <Segment inverted>
                            <Label content="Primary Colour"/>
                            <SliderPicker 
                                color={primary} 
                                onChange={this.handleChangePrimary} 
                            />
                        </Segment>
                        <Segment inverted>
                            <Label content="Secondary Colour"/>
                            <SliderPicker 
                                color={secondary} 
                                onChange={this.handleChangeSecondary} 
                            />
                        </Segment>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button 
                            color="green" 
                            inverted
                            onClick={this.handleSaveColors}
                        >
                            <Icon name="checkmark" /> Save Colour Selection
                        </Button>
                        <Button 
                            color="red" 
                            inverted 
                            onClick={this.closeModal}
                        >
                            <Icon name="remove" /> Cancel
                        </Button>
                    </Modal.Actions>
                </Modal>
            </Sidebar>
        )
    }
}

export default ColorPanel;