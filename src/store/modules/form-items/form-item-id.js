export default {
  namespaced: true,
  state: {
    id: '',
    name: '',
  },
  getters: {
    formItemData ( state ) {
      return {
        id: +state.id
      };
    },
  },
  actions: {
    data2State ( { commit }, formData ) {
      commit( 'update', {
        id: formData.id,
        name: formData.name
      } )
    }
  }
}