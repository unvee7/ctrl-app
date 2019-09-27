const React = require('react');
const $ = require('jquery');
const axios = require('axios');

class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      tags: '',
      createdBy: 'dev'
    }
    this.submitHandler = this.submitHandler.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.toggleUpload = this.toggleUpload.bind(this);

  }

  submitHandler(e) {
    e.preventDefault();

    const formData = new FormData();

    var imagefile = document.getElementById('uploadedFile');
    formData.append('file', imagefile.files[0]);
    formData.append('tags', this.state.tags);
    formData.append('createdBy', 'sonny');

    axios({
      method: 'post',
      url: '/api/newOne',
      type: 'multipart/form-data',
      data: formData,
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err.response);
      });
      this.toggleUpload();
  }

  toggleUpload() {
    // if(e.target !== e.currentTarget) return;
    this.setState({
      isClicked: !this.state.isClicked
    })
  }

  changeHandler(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    const { file, tags} = this.state;
    if (!this.state.isClicked) {
      return (
        <div className='navItem pointer' onClick={this.toggleUpload} > Upload</div>
      )
    } else {
      return (
        <div className='modalBackground' onClick={this.props.toggleOff}>
          <div className='uploader'>
            <h1>Upload.</h1>
          <img src='./imgs/x.png' className='exit' onClick={this.toggleUpload}/>
            <form id='uploadForm' className='uploadForm' encType='multipart/form-data' onSubmit={this.submitHandler}>
              <input id='uploadedFile' type='file' name='file' accept='image/*' value={file} onChange={this.changeHandler}/>
              <textarea name='tags' type='textarea' value={tags} placeholder='Separate tags with a comma (,)' rows='5' onChange={this.changeHandler}></textarea>
              <button type='submit' className='submit'> Upload</button>
            </form>
            </div>
          </div>
        )
          }
  }
}

module.exports = Upload;