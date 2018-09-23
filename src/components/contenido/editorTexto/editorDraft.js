import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, convertFromRaw   } from 'draft-js';
import './editorDraft.css';

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
    saveContent = (content) => {
        localStorage.setItem('content', JSON.stringify(convertToRaw(content)));
    }

    constructor(props) {
        super(props);
        
        const content = localStorage.getItem('content');
       
        if(content) {
            const contentState = convertFromRaw(JSON.parse(content));
            this.state = {
               editorState: EditorState.createWithContent(contentState)
            };

            this.saveContent(this.state.editorState);
               
        }else{
            this.state = {
                editorState: EditorState.createEmpty(),
              }
        }
      }
    //OnChange
      onEditorStateChange = (editorState) => {
        const contentState = editorState.getCurrentContent();
        console.log('content state', convertToRaw(contentState));
        this.saveContent(editorState);
        this.setState({
            editorState,
        });
        /*this.setState({editorState: editorState});
        this.saveContent(editorState);*/
      };



    render() {
        
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