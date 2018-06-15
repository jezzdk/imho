import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { fetchPost, updatePost, uploadImage } from '../../actions/posts'

class EditPost extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            text: '',
            image: null,
            postLoaded: false
        }

        this.image = React.createRef()
    }

    componentDidMount() {
        this.props.fetchPost(this.props.match.params.id)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.post && !prevState.postLoaded) {
            let { title, text, image } = nextProps.post

            return {
                title,
                text,
                image,
                postLoaded: true
            }
        }

        return prevState
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

        let postId = this.props.match.params.id
        let file = this.image.current.files.length > 0 ? this.image.current.files[0] : null

        if (file) {
            this.props.uploadImage(file).then((fileData) => {
                this.props.updatePost(postId, {
                    title: this.state.title,
                    text: this.state.text,
                    image: fileData
                }).then(() => {
                    this.props.history.push(`/posts/${postId}`)
                })
            })
        }
        else {
            this.props.updatePost(postId, {
                title: this.state.title,
                text: this.state.text,
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

        if (!isFetching && post === null) {
            return null
        }

        let postId = post.id

        return (
            <div>
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
                </form>
                <Link to={`/posts/${postId}`}>Go back</Link>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isFetching: state.posts.fetching,
        post: state.posts.currentPost
    }
}

export default connect(mapStateToProps, { fetchPost, updatePost, uploadImage })(EditPost)