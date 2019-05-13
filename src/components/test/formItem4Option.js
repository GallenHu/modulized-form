export default {
  id: 'text',
  description: 'form item 4',
  component: 'form-item-text', // 表单项的dom，支持组件名、JSX、返回JSX的函数
  // 所有依赖的其他表单项值，会将其model2data的返回值传递进来，默认传递default
  // depends: ['id'], // NOTE: 约束太严格了，迁移到context.formItems中
  data2Model(formData, context) {
    return {
      text: formData.d,
    };
  },
  model2Data(model, context) {
    return model;
  },
};
