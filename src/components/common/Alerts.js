import React, { Component, Fragment} from 'react';
import { withAlert } from 'react-alert';

export class Alerts extends Component {
    componentDidMount() {
        this.props.alert.show('It\'s working !')
    }
    render() {
        return (
            <div>
                hello
            </div>
        )
    }
}
export default withAlert(Alerts)
