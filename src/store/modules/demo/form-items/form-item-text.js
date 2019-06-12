import { extendsModule, baseFormItem } from '../../../base';

export default extendsModule( baseFormItem, {
  state: {
    text: '',
  },
  getters: {
    formItemData ( state ) {
      return {
        text: state.text,
      };
    },
  },
  actions: {
    data2State ( { commit }, formData ) {
      commit( 'update', {
        text: formData.text
      } )
    },
  }
} )