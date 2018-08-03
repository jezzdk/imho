import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import ImageUpload from '../ImageUpload'
import { fetchPost, updatePost } from '../../actions/posts'
import { uploadImage } from '../../actions/files'

class EditPost extends Component {
    constructor(props) {
        super(props)

        this.state = {
            image: null,
            uploadProcess: 0,
            postLoaded: false
        }

        this.title = React.createRef()
        this.text = React.createRef()
        this.image = React.createRef()
    }

    componentDidMount() {
        this.props.fetchPost(this.props.match.params.id)
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

    removeImage() {
        if (window.confirm('Are you sure? Your changes will be lost!')) {
            let postId = this.props.match.params.id

            this.props.updatePost(postId, {
                image: null
            }).then(() => {
                this.props.fetchPost(postId)
            })
        }
    }

    handleSubmit(event) {
        event.preventDefault()

        let postId = this.props.match.params.id

        if (this.state.image) {
            this.props.uploadImage(this.state.image, (snapshot) => {
                this.setState({
                    uploadProcess: Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                })
            }).then((fileData) => {
                this.props.updatePost(postId, {
                    title: this.title.current.value,
                    text: this.text.current.value,
                    image: fileData
                }).then(() => {
                    this.props.history.push(`/posts/${postId}`)
                })
            })
        }
        else {
            this.props.updatePost(postId, {
                title: this.title.current.value,
                text: this.text.current.value,
                image: this.state.image,
            }).then(() => {
                this.props.history.push(`/posts/${postId}`)
            })
        }
    }

    render() {
        let { isFetching, post } = this.props

        if (isFetching) {
            return <p>Loading...</p>
        }

        if (!post) {
            return null
        }

        let postId = post.id

        return (
            <div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                        <ImageUpload input={this.handleImageUpload.bind(this)} image={post.image} remove={this.removeImage.bind(this)}></ImageUpload>
                    </div>
                    <div>
                        <label>Title</label><br />
                        <input type="text" name="title" defaultValue={post.title} ref={this.title} />
                    </div>
                    <div>
                        <label>Text</label><br />
                        <textarea name="text" defaultValue={post.text} ref={this.text}></textarea>
                    </div>
                    <button type="submit">Save</button>
                    {this.state.uploadProcess ? <p>Uploading: {this.state.uploadProcess}%</p> : null}
                </form>
                <Link to={`/posts/${postId}`}>Go back</Link>
            </div>
        )
    }
}

EditPost.propTypes = {
    isFetching: PropTypes.bool,
    post: PropTypes.object,
    fetchPost: PropTypes.func,
    updatePost: PropTypes.func,
    uploadImage: PropTypes.func,
    history: PropTypes.object,
    match: PropTypes.object
}

const mapStateToProps = state => {
    return {
        isFetching: state.posts.fetching,
        post: state.posts.currentPost
    }
}

export default connect(mapStateToProps, { fetchPost, updatePost, uploadImage })(EditPost)