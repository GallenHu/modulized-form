import { extendsModule, baseFormItem } from '../../../base';

export default extendsModule( baseFormItem, {
  state: {
    _moduleKey: 'form-item-desc', // 需要与组件名相同
    desc: ''
  },
  getters: {
    formItemData ( state ) {
      return {
        desc: state.desc
      };
    },
  },
  actions: {
    data2State ( { commit }, formData ) {
      commit( 'update', {
        desc: formData.desc
      } )
    }
  }
} )