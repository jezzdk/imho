import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import ImageUpload from '../ImageUpload'
import { savePost } from '../../actions/posts'
import { uploadImage } from '../../actions/files'

class CreatePost extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            text: '',
            image: null,
            uploadProcess: 0
        }

        this.image = React.createRef()
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleImageUpload(file) {
        this.setState({
            image: file
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
                this.props.savePost({
                    title: this.state.title,
                    text: this.state.text,
                    image: fileData
                }).then(() => {
                    this.props.history.push('/')
                })
            })
        }
        else {
            this.props.savePost({
                title: this.state.title,
                text: this.state.text,
            }).then(() => {
                this.props.history.push('/')
            })
        }
    }

    render() {
        return (
            <div>
                <div>
                    <h1>Create</h1>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div>
                            <ImageUpload input={this.handleImageUpload.bind(this)}></ImageUpload>
                        </div>
                        <div>
                            <label>Title</label><br />
                            <input type="text" name="title" value={this.state.title} onChange={this.handleChange.bind(this)} />
                        </div>
                        <div>
                            <label>Text</label><br />
                            <textarea name="text" value={this.state.text} onChange={this.handleChange.bind(this)}></textarea>
                        </div>
                        <button type="submit">Save</button>
                        {this.state.uploadProcess ? <p>Uploading: {this.state.uploadProcess}%</p> : null}
                    </form>
                </div>
                <Link to="/">Go back</Link>
            </div>
        )
    }
}

CreatePost.propTypes = {
    user: PropTypes.object,
    savePost: PropTypes.func,
    uploadImage: PropTypes.func,
    history: PropTypes.object
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps, { savePost, uploadImage })(CreatePost)