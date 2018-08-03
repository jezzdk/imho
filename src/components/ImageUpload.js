import React, { Component } from 'react'
import PropTypes from 'prop-types'

class UploadImage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            image: null
        }

        this.image = React.createRef()
    }

    openFileDialog(event) {
        event.preventDefault()
        this.image.current.click()
    }

    removeImage(event) {
        event.preventDefault()

        if (this.state.image) {
            this.image.current.value = ''

            this.setState({
                image: null
            })

            this.props.input(null)
        }
        else if (this.props.remove) {
            this.props.remove()
        }
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

            if (this.props.input !== undefined) {
                this.props.input(input.files[0])
            }
        }
    }


    render() {
        return (
            <div>
                <input type="file" onChange={this.handleFileUpload.bind(this)} ref={this.image} style={{display: 'none'}} />
                {this.state.image || this.props.image ? (
                    <div>
                        <img alt="" src={this.state.image || this.props.image} style={{maxWidth: '100px'}} onClick={this.openFileDialog.bind(this)} />
                        <div><a href="#remove" onClick={this.removeImage.bind(this)}>{this.state.image ? 'Undo' : 'Remove image' }</a></div>
                    </div>
                ) : <a href="#upload" onClick={this.openFileDialog.bind(this)}>Upload image</a>}
            </div>
        )
    }
}

UploadImage.propTypes = {
    image: PropTypes.string,
    input: PropTypes.func,
    remove: PropTypes.func,
}

export default UploadImage