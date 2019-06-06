export default {
  namespaced: true,
  state: {
    name: '',
  },
  getters: {
    formItemData ( state, getters, rootState ) {
      return {
        b: state.name
      };
    },
  },
  actions: {
    data2State ( { state, commit, rootState }, formData ) {
      commit( 'update', {
        name: formData.b
      } )
    },
  }
}