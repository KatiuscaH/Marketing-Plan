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
    componentDidMount = ()  => {
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
      toolbarHidden
      toolbarClassName="rdw-storybook--toolbar"
      wrapperClassName="rdw-storybook-wrapper"
      editorClassName="rdw-storybook-editor"
    />
            </div>

        )

    }
}

export default EditorReadOnly;
