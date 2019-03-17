import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import './editorDraft.css'


class EditorReadOnly extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
        }

    }
    componentDidMount = () => {
        this.setState({
            editorState: this.props.content,
        });
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
        this.props.onEditorStateChange(editorState);

    };


    render() {

        return (
            <div className="home-editor">
                <Editor
                readOnly
                    editorState={this.props.content}
                    onChange={this.props.onChange}
                    wrapperClassName="wrapper-class"
                    editorClassName="rdw-storybook-editor"
                    toolbarClassName="toolbar-class"
                    toolbarHidden={true}
                    onEditorStateChange={this.onEditorStateChange}
                />
            </div>

        )

    }
}

export default EditorReadOnly;
