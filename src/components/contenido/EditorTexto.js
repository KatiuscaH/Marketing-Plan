import React, { Component } from 'react';
import { EditorState, RichUtils } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import createImagePlugin from 'draft-js-image-plugin';
import 'draft-js-emoji-plugin/lib/plugin.css'
import './EditorTexto.css';


const emojiPlugin = createEmojiPlugin();
const imagePlugin = createImagePlugin();
const { EmojiSuggestions, EmojiSelect  } = emojiPlugin;

class EditorTexto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
        };
    }
    onChange = (editorState) => {
        this.setState({ editorState, });
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
                    plugins={[emojiPlugin,imagePlugin]}
                />
                <EmojiSuggestions />
                <EmojiSelect />
            </div>
        );
    }
}


export default EditorTexto;