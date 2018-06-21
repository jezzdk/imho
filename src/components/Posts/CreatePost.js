import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { savePost, uploadImage } from '../../actions/posts'

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

    openFileDialog(event) {
        event.preventDefault()
        this.image.current.click()
    }

    removeImage(event) {
        event.preventDefault()

        this.image.current.value = ''
        this.setState({
            image: null
        })
    }

    handleFileUpload(event) {
        let input = event.target

        if (input.files.length > 0) {
            if (input.files[0].size > 1000000) {
                alert('Image size too large. Maximum 1MB!')
                return
            }

            if (!['image/jpeg', 'image/gif', 'image/png'].includes(input.files[0].type)) {
                alert('Only jpg, png and gif images are accepted!')
                return
            }

            var reader = new FileReader()

            reader.onload = (e) => {
                this.setState({
                    image: e.target.result
                })
            }

            reader.readAsDataURL(input.files[0])
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()

        let file = this.image.current.files.length > 0 ? this.image.current.files[0] : null

        if (file) {
            this.props.uploadImage(file, (snapshot) => {
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
                            <input type="file" onChange={this.handleFileUpload.bind(this)} ref={this.image} style={{display: 'none'}} />

                            {this.state.image ? (
                                <div>
                                    <img alt="" src={this.state.image} style={{maxWidth: '100px'}} />
                                    <div><a href="#remove" onClick={this.removeImage.bind(this)}>Remove image</a></div>
                                </div>
                            ) : <a href="#upload" onClick={this.openFileDialog.bind(this)}>upload image</a>}
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