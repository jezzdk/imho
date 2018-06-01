import React, { Component } from 'react'

class Create extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      text: ''
    }
  }

  render() {
    return (
      <div>
        <h1>Create</h1>
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
      </div>
    )
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    this.props.savePost({
      ...this.state,
    })
  }
}

export default Create