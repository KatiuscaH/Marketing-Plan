import React, { Component } from 'react';
//import { EditorState, RichUtils } from 'draft-js';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createToolbarPlugin  from 'draft-js-static-toolbar-plugin';
import 'draft-js-static-toolbar-plugin/lib/plugin.css';
import {
    ItalicButton,
    BoldButton,
    UnderlineButton,
    CodeButton,
    HeadlineOneButton,
    HeadlineTwoButton,
    HeadlineThreeButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CodeBlockButton,
  } from 'draft-js-buttons';
import './editorStyles.css';
import editorStyles from'./editorStyles.css';

class HeadlinesPicker extends Component {
    componentDidMount() {
      setTimeout(() => { window.addEventListener('click', this.onWindowClick); });
    }
  
    componentWillUnmount() {
      window.removeEventListener('click', this.onWindowClick);
    }
  
    onWindowClick = () =>
      // Call `onOverrideContent` again with `undefined`
      // so the toolbar can show its regular content again.
      this.props.onOverrideContent(undefined);
  
    render() {
      const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton];
      return (
        <div>
          {buttons.map((Button, i) => // eslint-disable-next-line
            <Button key={i} {...this.props} />
          )}
        </div>
      );
    }
  }
  
  class HeadlinesButton extends Component {
    onClick = () =>
      // A button can call `onOverrideContent` to replace the content
      // of the toolbar. This can be useful for displaying sub
      // menus or requesting additional information from the user.
      this.props.onOverrideContent(HeadlinesPicker);
  
    render() {
      return (
        <div className={editorStyles.headlineButtonWrapper}>
          <button onClick={this.onClick} className={"headlineButton"}>
            A
          </button>
        </div>
      );
    }
  }




const toolbarPlugin = createToolbarPlugin({
    structure: [
      BoldButton,
      ItalicButton,
      UnderlineButton,
      CodeButton,
      
      HeadlinesButton,
      UnorderedListButton,
      OrderedListButton,
      BlockquoteButton,
      CodeBlockButton
    ]
  });
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