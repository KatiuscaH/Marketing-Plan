import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import debounce from 'lodash/debounce';
import './editorDraft.css'
import { Button } from 'antd';


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


function BotonGuardar(e) {
    console.log("Clic Boton: ", e)

}


class EditorDraft extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
        }

    }
    //OnChange
    onEditorStateChange = (editorState) => {
        const contentState = editorState.getCurrentContent();
        this.saveContent(contentState);
        this.setState({
            editorState,
        });

    };

    saveContent = debounce((content)=>{
        fetch('/contenido',{
            method: 'POST',
            body: JSON.stringify({
                content: convertToRaw(content),
            }),
            header : new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('id_token')}`
            })
        })
    },1000);


    componentDidMount() {
        fetch('/content').then(val => val.json())
            .then(rawContent => {
                if (rawContent) {
                    this.setState({ editorState: EditorState.createWithContent(convertFromRaw(rawContent)) })
                } else {
                    this.setState({ editorState: EditorState.createEmpty() });
                }
            });
    }


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
                <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                    <Button type="primary" icon="save" onClick={BotonGuardar}>Guardar</Button>
                </div>
            </div>

        )

    }
}

export default EditorDraft;


/*


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
                <div style={{ display: "flex", flexDirection: "row-reverse" }}>
                    <Button type="primary" icon="save" onClick={BotonGuardar}>Guardar</Button>
                </div>
*/