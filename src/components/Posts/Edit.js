import React, { Component } from 'react'

class Edit extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            text: '',
            image: null
        }

        this.image = React.createRef()
    }

    componentDidMount() {
        let { post: { title, text, image } } = this.props

        this.setState({
            title,
            text,
            image
        })
    }

    render() {
        return (
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
        )
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

        this.props.updatePost({
            title: this.state.title,
            text: this.state.text,
            image: this.state.image,
        }, file)
    }
}

export default Edit