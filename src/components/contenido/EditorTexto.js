import React, { Component } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import './EditorTexto.css';

class EditorTexto extends Component {

    constructor() {
        super();
        this.state = {
            editorState: EditorState.createEmpty(),
        };
    }
    onChange = (editorState) => {
        this.setState({ editorState });
    };

    handleyKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command);

        if (newState) {
            this.onChange(newState);
            return 'handled';
        }

        return 'not-handled';
    }

    onUnderlineClick = () => {
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
    }

    letraCodigo = () => {
        this.onChange(RichUtils.toggleCode(this.state.editorState));
    }

    render() {
        return (
            <div>
                <button onClick={this.onUnderlineClick}>Subrayar</button>
                <button onClick={this.letraCodigo}>Codigo</button>
                <Editor
                    editorState={this.state.editorState}
                    handleKeyCommand={this.handleyKeyCommand}
                    onChange={this.onChange}
                />
            </div>
        );
    }
}


export default EditorTexto;