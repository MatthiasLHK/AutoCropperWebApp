import React, {Component} from "react";
import SetDataForm from "../SetDataForm";


class SetData extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

    const user_id = this.props.match.params.id

        return (
        <div>
                <SetDataForm user_id = {user_id} />
         </div>
         )
    }

}

export default SetData;