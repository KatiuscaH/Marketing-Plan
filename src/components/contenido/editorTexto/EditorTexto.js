import React, { Component, Fragment } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';

import Icon from 'react-icons-kit';
import { bold } from 'react-icons-kit/icomoon/bold';
import { italic } from 'react-icons-kit/icomoon/italic';
import { list } from 'react-icons-kit/icomoon/list';
import { underline } from 'react-icons-kit/icomoon/underline';
import {fontSize} from 'react-icons-kit/icomoon/fontSize'
import {strikethrough} from 'react-icons-kit/icomoon/strikethrough'

import { BoldMark, ItalicMark, FormatToolbar } from './indexEditor';
import './editorStyles.css'


const existingValue = JSON.parse(localStorage.getItem('content'))
const initialValue = Value.fromJSON(
  existingValue || {
    document: {
      nodes: [
        {
          object: 'block',
          type: 'paragraph',
          nodes: [
            {
              object: 'text',
              leaves: [
                {
                  text: 'A line of text in a paragraph.',
                },
              ],
            },
          ],
        },
      ],
    },
  }
)



class EditorTexto extends Component {

  state = {
    value: initialValue,
  }

  onChange = ({ value }) => {
    if (value.document !== this.state.value.document) {
      const content = JSON.stringify(value.toJSON())
      localStorage.setItem('content', content)
    }
    this.setState({ value })
  }

  onKeyDown = (e, change) => {
    console.log(e.key);
    if (!e.ctrlKey) { return }
    e.preventDefault()

    switch (e.key) {
      case 'b': {
        change.toggleMark('bold')
        return true
      }
      case 'i': {
        change.toggleMark('italic')
        return true
      }
      case 'l': {
        change.toggleMark('list');
        return true;
      }

      case 'u': {
        change.toggleMark('underline');
        return true;
      }
     

      default: {
        return;
      }
    }
  }

  renderMark = props => {
    switch (props.mark.type) {
      case 'bold':
        return <BoldMark {...props} />

      case 'italic':
        return <ItalicMark {...props} />

      case 'list':
        return (
          <ul {...props.attributes}>
            <li>{props.children}</li>
          </ul>
        );

      case 'underline':
        return <u {...props.attributes}>{props.children}</u>;

      case 'heading-1':
          return <h1 {...props.attributes}>{props.children}</h1>

      case 'strike':
          return <strike {...props.attributes}>{props.children}</strike>;
      default: {
        return;
      }
    }
  }

  onMarkClick = (e, type) => {

    e.preventDefault();


    const { value } = this.state;


    const change = value.change().toggleMark(type);


    this.onChange(change);
  };


  
  render() {
    return (

      <div>
        <FormatToolbar>
          <button
            onPointerDown={(e) => this.onMarkClick(e, 'bold')}
            className="tooltip-icon-button">
            <Icon icon={bold} />
          </button>
          <button
            onPointerDown={(e) => this.onMarkClick(e, 'italic')}
            className="tooltip-icon-button">
            <Icon icon={italic} />
          </button>
          <button
            onPointerDown={(e) => this.onMarkClick(e, 'list')}
            className="tooltip-icon-button"
          >
            <Icon icon={list} />
          </button>
          <button
            onPointerDown={(e) => this.onMarkClick(e, 'underline')}
            className="tooltip-icon-button"
          >
            <Icon icon={underline} />
          </button>
          <button
            onPointerDown={(e) => this.onMarkClick(e, 'heading-1')}
            className="tooltip-icon-button"
          >
            <Icon icon={fontSize} />
          </button>
          <button
            onPointerDown={(e) => this.onMarkClick(e, 'strike')}
            className="tooltip-icon-button"
          >
            <Icon icon={strikethrough} />
          </button>
        </FormatToolbar>
        <Editor className="editor"
          //  plugins={plugins}
          value={this.state.value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          renderMark={this.renderMark}
          
        />
      </div>
    );
  }

}


export default EditorTexto;