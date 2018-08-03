import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { fetchProfile, updateProfile } from '../actions/profile'
import { uploadImage } from '../actions/files'

import ImageUpload from './ImageUpload'

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            image: null,
            uploadProcess: 0
        }

        this.name = React.createRef()
    }

    componentDidMount() {
        this.props.fetchProfile(this.props.user.uid)
    }

    handleImageUpload(file) {
        this.setState({
            image: file
        })
    }

    removeImage() {
        this.props.updateProfile(this.props.user.uid, {
            photoURL: null
        })
    }

    handleSubmit(event) {
        event.preventDefault()

        if (this.state.image) {
            this.props.uploadImage(this.state.image, (snapshot) => {
                this.setState({
                    uploadProcess: Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                })
            }, (error) => {
                console.log('error', error)
            }, () => {
                console.log('Success')
            }).then((fileData) => {
                this.setState({
                    image: null,
                    uploadProcess: 0
                })

                this.props.updateProfile(this.props.user.uid, {
                    displayName: this.name.current.value,
                    photoURL: fileData
                }).then(() => {
                    this.props.fetchProfile(this.props.user.uid)
                    alert('User updated')
                })
            })
        }
        else {
            this.props.updateProfile(this.props.user.uid, {
                displayName: this.name.current.value,
            }).then(() => {
                this.props.fetchProfile(this.props.user.uid)
                alert('User updated')
            })
        }
    }

    render() {
        let { isFetching, user, profile, error } = this.props

        if (isFetching) {
            return <div>Loading info...</div>
        }

        if (error) {
            return <div>An error occurred: {error}</div>
        }

        if (!profile) {
            return null
        }

        return (
            <div>
                Profile for {profile.displayName} &lt;{user.email}&gt;
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                        <label>Name</label>
                        <input type="text" defaultValue={profile.displayName} ref={this.name} />
                    </div>
                    <div>
                        <label>Change profile image</label>
                        <ImageUpload image={profile.photoURL} input={this.handleImageUpload.bind(this)} remove={this.removeImage.bind(this)}></ImageUpload>
                    </div>
                    <button type="submit">Save</button>
                    {this.state.uploadProcess ? <p>Uploading: {this.state.uploadProcess}%</p> : null}
                </form>
            </div>
        )
    }
}

Profile.propTypes = {
    user: PropTypes.object,
    isFetching: PropTypes.bool,
    profile: PropTypes.object,
    error: PropTypes.string,
    fetchProfile: PropTypes.func,
    updateProfile: PropTypes.func,
    uploadImage: PropTypes.func
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        isFetching: state.profile.fetching,
        profile: state.profile.data,
        error: state.profile.error
    }
}

export default connect(mapStateToProps, { fetchProfile, updateProfile, uploadImage })(Profile)