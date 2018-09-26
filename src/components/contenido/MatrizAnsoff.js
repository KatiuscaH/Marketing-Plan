import React, { Component } from 'react';

import { Input, Button  } from 'antd';
import './MatrizAnsoff.css'



const { TextArea, Row, Col } = Input;

class MatrizAnsoff extends Component {
    render() {
        return (
            <div className="principal">
                <h1 style={{ textAlign: 'center' }}>Matriz Ansoff</h1>
                <h2 style={{ textAlign: 'center' }}>Productos</h2>
               

                <div className="caja">
                <h2 className="vertical">Mercados</h2>
                    <div style={{

                        paddingTop: '50px',
                        paddingLeft: '50px',

                        width: '100%'

                    }}>

                        <TextArea rows={6} />
                        <TextArea rows={6} />

                    </div>

                    <div style={{
                        paddingTop: '50px',
                        paddingRight: '50px',
                        width: '100%'

                    }} >

                        <TextArea rows={6} />
                        <TextArea rows={6} />
                    </div>
                <Button type="primary" icon="save" >Guardar</Button>

                </div>
            </div>
        );
    }
}


export default MatrizAnsoff;