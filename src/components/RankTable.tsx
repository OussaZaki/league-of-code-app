import React from 'react';
import { Table, Tag } from 'antd';

export type TableProps = {
  dataSource: any;
};

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: string, record: any) => (
      record.github ? <a href={record.github}>{text}</a> : text
    )
  },
  {
    title: 'Stars',
    dataIndex: 'stars',
    key: 'stars'
  },
  {
    title: 'Score',
    dataIndex: 'local_score',
    key: 'local_score'
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags: string[]) => (
      <span>
        {tags && tags.map(tag => {
          return (
            <Tag color={'#17120f'} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </span>
    )
  }
];

export const RankTable: React.FC<TableProps> = ({ dataSource }) => (
  <Table columns={columns} dataSource={dataSource} pagination={false}/>
);
