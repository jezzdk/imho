import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { fetchUser, updateUser } from '../actions/users'
import { uploadImage } from '../actions/files'

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            displayName: '',
            email: '',
            image: null,
            uploadProcess: 0,
            userLoaded: false
        }

        this.image = React.createRef()
    }

    componentDidMount() {
        this.props.fetchUser(this.props.auth.uid)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.user && !prevState.userLoaded) {
            let { displayName, image, email } = nextProps.user

            return {
                displayName,
                image,
                email,
                userLoaded: true
            }
        }

        return prevState
    }

    render() {
        let { isFetching, user } = this.props

        if (isFetching) {
            return <div>Loading info...</div>
        }

        if (user === null) {
            return null
        }

        return (
            <div>
                Profile for {this.state.displayName} &lt;{this.state.email}&gt;
            </div>
        )
    }
}

Profile.propTypes = {
    isFetching: PropTypes.bool,
    auth: PropTypes.object,
    user: PropTypes.object,
    fetchUser: PropTypes.func,
    updateUser: PropTypes.func,
    uploadImage: PropTypes.func
}

const mapStateToProps = state => {
    return {
        isFetching: state.users.fetching,
        auth: state.auth.user,
        user: state.users.currentUser
    }
}

export default connect(mapStateToProps, { fetchUser, updateUser, uploadImage })(Profile)