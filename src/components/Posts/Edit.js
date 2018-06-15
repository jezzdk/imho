import React, { Component } from 'react'

class Edit extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            text: ''
        }
    }

    componentDidMount() {
        let { post: { title, text} } = this.props

        this.setState({
            title,
            text
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
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
        )
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()

        let postId = this.props.post.id

        this.props.updatePost({
            ...this.state,
            id: postId
        })
    }
}

export default Edit