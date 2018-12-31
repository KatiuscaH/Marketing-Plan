import React, { Component } from 'react';
import { Upload, Icon, message, List } from 'antd';
import { ADD_ANEXOS } from '../../config';
import axios from 'axios';

const Dragger = Upload.Dragger;

class Anexos extends Component {
    state = {
        fileList:[]
    }
    
            handleUpload = () => {
                const { fileList } = this.state;
                const formData = new FormData();
                axios.get(ADD_ANEXOS, {headers:{Authorization: `Bearer ${localStorage.getItem('id_token')}` }})
                fileList.forEach((file) => {
                  formData.append('files[]', file);
                });
                        }
            

    state = {
        fileList: [],
       
    }

    componentDidMount() {
        axios.get(ADD_ANEXOS, { headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` } })
            .then(res => {
                const fileList = [];
                res.data.forEach(element => {
                    fileList.push({
                        value: element.id,
                        label: `${element.nombre}`,
                        })
                });
                this.setState({ fileList})
                console.log(fileList)
            }).catch(err => {
                console.log(err.res)
            })
    }


    render() {

        const props = {
            name: 'file',
            multiple: true,
            action: ADD_ANEXOS,
            headers: { Authorization: `Bearer ${localStorage.getItem('id_token')}` },
            multiple: true,
            
            onChange(info) {
                const status = info.file.status;
                if (status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (status === 'done') {
                    message.success(`${info.file.name} archivo subido satisfactoriamente.`);
                } else if (status === 'error') {
                    message.error(`${info.file.name} archivo fallido.`);
                }
            },
        };



        return (
            <div>
                <h1 style={{ textAlign: 'center' }}>Anexos</h1>
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">Haga clic o arrastre el archivo a esta área para subir</p>
                    <p className="ant-upload-hint">Soporte para una carga única o masiva.</p>
                </Dragger>
<br/>
                <List
                    bordered
                    dataSource={this.state.fileList}
                    renderItem={item => (<List.Item>{item.label}</List.Item>)}
                />
            </div>
        );
    }
}


export default Anexos;

