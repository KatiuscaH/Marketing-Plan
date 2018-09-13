import React, { Component } from 'react';
//import { EditorState, RichUtils } from 'draft-js';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createToolbarPlugin from 'draft-js-static-toolbar-plugin';
import 'draft-js-static-toolbar-plugin/lib/plugin.css';
/*import editorStyles from './editorStyles.css';
import buttonStyles from './buttonStyles.css';
import toolbarStyles from './toolbarStyles.css';*/
import './editorStyles.css';
const toolbarPlugin = createToolbarPlugin(/*{
    theme: { buttonStyles, toolbarStyles }
}*/);
const { Toolbar } = toolbarPlugin;
const plugins = [toolbarPlugin];
const text = 'HISTORIA';

class EditorTexto extends Component {

    constructor(props) {
        super(props);
        this.state = {
         editorState: createEditorStateWithText(text),//EditorState.createEmpty(),
        };
    }
    onChange = (editorState) => {
        this.setState({ editorState, });
    };

    focus = () => {
        this.editor.focus();
    };
    /*
        handleyKeyCommand = (command) => {
            const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    
            if (newState) {
                this.onChange(newState);
                return 'handled';
            }
    
            return 'not-handled';
        }
    */
    render() {
        return (
            <div>
                <div /*className={editorStyles.editor}*/ onClick={this.focus}>
                <Toolbar />
                    <Editor
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        plugins={plugins}
                        ref={(element) => { this.editor = element; }}
                    />
                   
                </div>
            </div>
        );
    }
}


export default EditorTexto;