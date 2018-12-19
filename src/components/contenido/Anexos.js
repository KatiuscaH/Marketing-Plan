import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd';

const Dragger = Upload.Dragger;

class Anexos extends Component {
    render() {
        const props = {
            name: 'file',
            multiple: true,
            action: '//jsonplaceholder.typicode.com/posts/',
            onChange(info) {
                const status = info.file.status;
                if (status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully.`);
                } else if (status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
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
            </div>
        );
    }
}


export default Anexos;

