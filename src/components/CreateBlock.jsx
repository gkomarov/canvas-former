import React from 'react';

export default class CreateBlock extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            textElement: '',
            imageElement: null,
            imagePreview: null,
            editableId: null
        }
        this.textElementRef = React.createRef();
        this.imageRef = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.collectAndSendElement = this.collectAndSendElement.bind(this);
        this.loadImage = this.loadImage.bind(this);
        this.clearState = this.clearState.bind(this);
    }

    componentDidUpdate () {
        const selectedElement = this.props.selectedElement;
        if (selectedElement && selectedElement.Content !== this.state.textElement && selectedElement.Type === "Text" && !this.state.editableId) {
            this.setState({ textElement: selectedElement.Content, editableId: selectedElement.id });
        } else if (!selectedElement && this.state.textElement && this.state.editableId) {
            // clear edit when element not selected
            this.setState({ textElement: '', editableId: null });
        }
    }

    loadImage () {
        let reader = new FileReader();
        let preview = '';
        reader.onloadend = () => {
            preview = reader.result;
            this.setState({ editableId: null, textElement: '', imagePreview: preview }, this.collectAndSendElement);
        }
        if (this.state.imageElement) {
            reader.readAsDataURL(this.state.imageElement);
        } 
    }

    clearState () {
        this.setState({ textElement: '', imageElement: null, editableId: null });
    }

    collectAndSendElement() {
        const imageElement = this.state.imageElement;
        let content = this.state.textElement;
        let contentRef = null;
        let contentType = "Text";
        if (imageElement) {
            contentRef = this.state.imagePreview;
            content = null;
            contentType = "Graphics";
        }

        if (this.state.editableId) {
            let element = {
                id: this.state.editableId,
                Content: content,
                ContentRef: contentRef,
            };
            this.props.editElement(element);
        } else {
            let element = {
                X: 300,
                Y: 300,
                Width: 100,
                Height: 100,
                Type: contentType,
                Content: content,
                ContentRef: contentRef,
            };
            this.props.addNewElement(element);
        }
        this.setState({ textElement: '', imageElement: null, editableId: null }, () => { this.imageRef.current.value = '' });
    }

    handleChange(event) {
        const value = event.target.files ? event.target.files[0] : event.target.value;
        this.setState({ [event.target.id]: value })
    }

    render() {
        return (
            <div className="mr-3">
                <h1>Editor</h1>
                <div className="accordion" id="accordionExample">
                    <div className="card">
                        <div className="card-header" id="headingOne">
                            <div className="mb-0">Enter text of your letter</div>
                        </div>

                        <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                            <div className="card-body">
                                <div className="form-group">
                                    <textarea id="textElement" content="Text" onChange={this.handleChange} type="text" value={this.state.textElement} className="form-control" rows="2" />
                                </div>
                                <button type="button" className="btn btn-success" onClick={this.collectAndSendElement}>
                                    {this.state.editableId ? "Save" : "Add new element"}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header" id="headingTwo">
                            <div className=" text-lead mb-0">Add your image:</div>
                        </div>

                        <div id="collapseTwo" className="collapse show" aria-labelledby="headingTwo" data-parent="#accordionExample">
                            <div className="card-body">
                                <div className="form-group">
                                    <input id="imageElement" content="Graphics" onChange={this.handleChange} type="file" ref={this.imageRef} className="form-control" />
                                </div>
                                <button type="button" className="btn btn-success" onClick={this.loadImage}>Add file</button>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="button" className="btn btn-primary mt-3 mr-3" onClick={this.props.submitCanvas}>Submit canvas</button>
                <button type="button" className="btn btn-success mt-3 mr-3" onClick={this.props.onLoadTemplate}>Load template</button>
                <button type="button" className="btn btn-warning mt-3 mr-3" onClick={this.props.onResetTemplate}>Reset template</button>
            </div>
        )
    }
}