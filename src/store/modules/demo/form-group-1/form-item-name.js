import { extendsModule, baseFormItem } from '../../../base';

export default extendsModule( baseFormItem, {
  state: {
    _moduleKey: 'form-item-name',
    name: '',
    count: 0,
  },
  getters: {
    formItemData4Submit ( state ) {
      return {
        name: state.name
      };
    },
    formItemData4View ( state ) {
      return {
        name: state.name
      };
    },
  },
  mutations: {
    addCount ( state ) {
      state.count = state.count + 1;
    },
  },
  actions: {
    data2State ( { commit }, formData ) {
      commit( 'update', {
        name: formData.name
      } )
    },
  }
} )