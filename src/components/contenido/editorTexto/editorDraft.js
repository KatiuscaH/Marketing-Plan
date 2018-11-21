import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import './editorDraft.css'


function uploadImageCallBack(file) {
    return new Promise(
        (resolve, reject) => {
            const xhr = new XMLHttpRequest(); // eslint-disable-line no-undef
            xhr.open('POST', 'https://api.imgur.com/3/image');
            xhr.setRequestHeader('Authorization', 'Client-ID 8d26ccd12712fca');
            const data = new FormData(); // eslint-disable-line no-undef
            data.append('image', file);
            xhr.send(data);
            xhr.addEventListener('load', () => {
                const response = JSON.parse(xhr.responseText);
                resolve(response);
            });
            xhr.addEventListener('error', () => {
                const error = JSON.parse(xhr.responseText);
                reject(error);
            });
        },
    );
}

class EditorDraft extends Component {

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

        if (!this.state.editorState) {
            return (
                <h3>Loading...</h3>
            );
        }

        return (
            <div>
                <Editor
                    editorState={this.state.editorState}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                    toolbar={{
                        options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'image'],
                        inline: {
                            inDropdown: false,
                            className: undefined,
                            component: undefined,
                            dropdownClassName: undefined,

                        },
                        list: { inDropdown: true },
                        textAlign: { inDropdown: true },
                        link: { inDropdown: true },
                        history: { inDropdown: true },
                        image: {
                            uploadCallback: uploadImageCallBack,
                            alt: { present: true, mandatory: false },
                        },
                    }}
                    onEditorStateChange={this.onEditorStateChange}
                />
            </div>

        )

    }
}

export default EditorDraft;
