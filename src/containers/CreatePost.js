import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Create from '../components/Posts/Create'

import { savePost, uploadImage } from '../actions/posts'

class CreatePost extends Component {
    render() {
        return (
            <div>
                <Create savePost={this.savePost.bind(this)} user={this.props.user} />
                <Link to="/">Go back</Link>
            </div>
        )
    }

    savePost(data, file) {
        if (file) {
            this.props.uploadImage(file, (snapshot) => {
                //let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            }, (error) => {
                console.log('error', error)
            }, () => {
                console.log('Success')
            }).then((fileData) => {
                this.props.savePost({
                    ...data,
                    image: fileData
                }).then(() => {
                    this.props.history.push('/')
                })
            })
        }
        else {
            this.props.savePost(data).then(() => {
                this.props.history.push('/')
            })
        }

    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps, { savePost, uploadImage })(CreatePost)