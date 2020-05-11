import React from 'react';
import { Rnd } from 'react-rnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class CanvasElement extends React.Component {
    render(){
        const isSelected = this.props.selectedElementId === this.props.elementId;
        const selectedClass = isSelected ? "selected-element" : "border";
        return (
            <Rnd
                id={this.props.elementId}
                className={`draggable position-absolute d-flex align-items-center justify-content-center ${selectedClass}`}
                //default={{ x: this.props.x || 300, y: this.props.y || 300, width: this.props.width || 200, height: this.props.height || 200 }}
                size={{ width: this.props.width,  height: this.props.height }}
                position={{ x: this.props.x, y: this.props.y }}
                maxWidth={this.props.containerSize.width}
                maxHeight={this.props.containerSize.height}
                onDragStop={(event, data) => this.props.onChangePosition({id: data.node.id, x: data.x, y: data.y, width: data.node.offsetWidth, height: data.node.offsetHeight})}
                onResize={(e, dir, refToElement, delta, position) => this.props.onResize(dir, refToElement, position)}
                onResizeStop={(e, dir, refToElement) => this.props.onChangeSize(refToElement)}
                bounds=".limiter"
                onMouseDown={event => {
                    event.target.ondragstart = function () {
                        return false;
                    }
                }}
                onClick={this.props.onSelect}
            >
                {isSelected && (
                    <div className="trash-icon" onClick={() => {this.props.onRemove(this.props.elementId)}}>
                        <FontAwesomeIcon icon="trash"/>
                    </div>
                )}
                <div id={this.props.elementId} className="block-content">
                    {this.props.contentRef && (
                        <img className="block-content" alt="somelogo" src={this.props.contentRef} />
                    )}
                    {this.props.content && (
                        <div className="block-content">{this.props.content}</div>
                    )}
                </div>
            </Rnd>
        )
    }
}