import React, { Component } from 'react';
import { Table, Input, Popconfirm, Form, Icon } from 'antd';


class TablaPlanMediosEMpresario extends Component {
  constructor(props) {
    super(props);
  }

  state = { dataSource: [] }
 
  render() {
    const { dataSource, onDelete } = this.props;

    const configColumns = [{
      title: 'Publicidad',
      dataIndex: 'publicidad',
      width: 100
    }, {
      title: 'Característica',
      dataIndex: 'caracteristicas',
      width: 100
      
    },  {
        title: 'Ubicación o punto de entrega de publicidad',
        dataIndex: 'ubicacion',
        width: 100
        
      }, {
        title: 'Fecha de realización de la publicidad',
        dataIndex: 'realizacion',
        width: 100
      },{
        title: 'Duración de la campaña',
        dataIndex: 'duracion',
        width: 100
      },{
        title: 'Número por publicidad',
        dataIndex: 'numero',
        width: 100
      },{
        title: 'Costo total',
        dataIndex: 'costo',
        width: 100
    }];


    const columns = configColumns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });

    return (
      <div>
        <Table 
          rowKey="id"
          bordered
          dataSource={dataSource}
          columns={columns}
          pagination={false}
        />
      </div>
    );
  }
}

export default TablaPlanMediosEMpresario;