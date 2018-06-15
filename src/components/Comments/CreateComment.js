import React, { Component } from 'react'
import { connect } from 'react-redux'
import { saveComment } from '../../actions/comments'

class CreateComment extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            text: ''
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()

        if (!this.state.title || !this.state.text) {
            alert('please add content')
            return
        }

        this.props.saveComment(this.props.post.id, {
            title: this.state.title,
            text: this.state.text,
        })

        this.setState({
            title: '',
            text: ''
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
                <div>
                    <button type="submit">Save</button>
                </div>
            </form>
        )
    }
}

export default connect(null, { saveComment })(CreateComment)