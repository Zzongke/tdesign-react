import React, { useState } from 'react';
import {
  Upload,
  Radio,
  Switch,
  Space,
  MessagePlugin,
  SwitchProps,
  type TdRadioGroupProps,
  UploadProps,
} from 'tdesign-react';

function getCurrentDate(needTime = false) {
  const d = new Date();
  const month = d.getMonth() + 1;
  const monthText = month < 10 ? `0${month}` : month;
  const date = `${d.getFullYear()}-${monthText}-${d.getDate()}`;
  const time = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
  if (needTime) return [date, time].join(' ');
  return date;
}

export default function UploadExample() {
  const [files, setFiles] = useState([]);
  const [files2, setFiles2] = useState([
    {
      name: '默认文件',
      url: 'https://tdesign.gtimg.com/site/source/figma-pc.png',
      status: 'success',
      size: 1024,
      // 上传日期，如果接口返回的字段包含 uploadTime，则会以接口返回的为准，默认使用本地电脑时间。
      // 如果希望使用接口返回的上传日期，但是接口字段名不是 uploadTime，则可以使用函数 formatResponse 格式化接口数据
      uploadTime: '2022-09-25',
    },
  ]);

  const [autoUpload, setAutoUpload] = React.useState(false);
  const [theme, setTheme] = React.useState<'file' | 'image'>('file');

  const onFail = () => {
    MessagePlugin.error('上传失败');
  };

  const onSuccess = () => {
    MessagePlugin.success('上传成功');
  };

  // res.url 图片地址；res.uploadTime 文件上传时间；res.error 上传失败的原因
  const formatResponse: UploadProps['formatResponse'] = (res) => {
    // 响应结果添加上传时间字段，用于 UI 显示
    res.uploadTime = getCurrentDate();
    return res;
  };

  const handleChange: SwitchProps<typeof autoUpload>['onChange'] = (checked) => {
    setAutoUpload(checked);
  };

  const handleTheme: TdRadioGroupProps<typeof theme>['onChange'] = (value) => {
    setTheme(value);
  };

  return (
    <Space direction="vertical">
      <div>
        是否自动上传：
        <Switch value={autoUpload} onChange={handleChange} />
      </div>
      <Radio.Group defaultValue="file" onChange={handleTheme} variant="default-filled">
        <Radio.Button value="file">文件拖拽上传</Radio.Button>
        <Radio.Button value="image">图片拖拽上传</Radio.Button>
      </Radio.Group>

      <br />

      {/* 可以使用 trigger 自定义拖拽区域显示的内容 */}
      {/* <!-- abridgeName 表示省略文件名中间文本，保留两侧。左侧保留的文本数量，右侧保留的文本数量] --> */}
      <Space>
        <Upload
          theme={theme}
          autoUpload={autoUpload}
          data={{ extraData: 123, fileName: 'certificate' }}
          draggable
          action="//service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
          files={files}
          formatResponse={formatResponse}
          onChange={setFiles}
          onFail={onFail}
          onSuccess={onSuccess}
          // use fileListDisplay to define any file info
          // fileListDisplay={({ files }) => <div>{JSON.stringify(files)}</div>}
        />

        <Upload
          theme={theme}
          autoUpload={autoUpload}
          data={{ extraData: 123, fileName: 'certificate' }}
          draggable
          action="//service-bv448zsw-1257786608.gz.apigw.tencentcs.com/api/upload-demo"
          files={files2}
          formatResponse={formatResponse}
          onChange={setFiles2}
          onFail={onFail}
          onSuccess={onSuccess}
        />
      </Space>
    </Space>
  );
}
