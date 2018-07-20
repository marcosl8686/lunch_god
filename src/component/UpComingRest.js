import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';
import { ListItem } from 'react-native-elements';

var user;

class UpComingRest extends Component {
    componentWillMount() {
        console.log(this.props, "Component will mount on list restaurant")
        switch (this.props.restaurant_list.userEmail) {
            case 'marcos.lee@livingspaces.com':
                user = 'Marcos Lee';
                break;
            case 'leo.garcia@livingspaces.com':
                user = 'Leo Garcia';
                break;
            case 'pete.franco@livingspaces.com':
                user = 'Pete Franco';
                break;
            case 'aaron.doan@livingspaces.com':
                user = 'Aaron Doan';
                break;
            default:
                user = 'unKnown';
                break;
        }
    }

    onRowPress() {
        Actions.ListItem({ employee: this.props.restaurant_list,  });
    }

    userMatch() {
        var user;
       
    }
    render() {
        const { name, location, image_url, id } = this.props.restaurant_list;

        return (
            <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
                <ListItem
                    roundAvatar
                    key={id}
                    title={name}
                    subtitle={user}
                    avatar={{ uri: image_url }}
                />
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    titleStyle: {
        fontSize: 18,
        paddingLeft: 15
    }
};

export default UpComingRest;