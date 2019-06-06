import Vue from 'vue';
import Vuex from 'vuex';
import formItemModules from './form-items';
import formGroupModules from './form-groups';

Vue.use( Vuex );

const fillPlugin = store => {
  const moduleKeys = Object.keys( formItemModules );
  const moniteTypes = moduleKeys.map( moduleKey => `${ moduleKey }/update` );

  let dispatched = false; // 避免无限循环

  store.subscribe( ( mutation ) => {
    const { type = '' } = mutation;

    const index = moniteTypes.indexOf( type );

    // 每次有某个module触发update的mutation时，联动其他module的state更新到最新，因为可能有互相依赖
    if ( index > -1 && !dispatched )
    {
      dispatched = true;
      moniteTypes.forEach( ( _, curIndex ) => {
        if ( curIndex !== index )
        {
          store.dispatch( `${ moduleKeys[ curIndex ] }/data2State`, store.getters.formData )
        }
      } )
      Vue.nextTick( () => {
        dispatched = false;
      } )
    }
  } );
};

const store = new Vuex.Store( {
  state: {
    hiddenFormGroups: [],
    formGroups: []
  },
  getters: {
    // 用于表单校验
    formModel ( state ) {
      return Object.keys( formItemModules ).reduce( ( result, moduleKey ) => {
        return {
          ...result,
          [ moduleKey ]: state[ moduleKey ]
        };
      }, {} );
    },
    // 用于后端接口
    formData ( state, getters ) {
      return Object.keys( formItemModules ).reduce( ( result, moduleKey ) => {
        return {
          ...result,
          ...getters[ `${ moduleKey }/formItemData` ]
        };
      }, {} );
    },
    visibleFormGroups ( state ) {
      return state.formGroups.filter(
        groupName => !state.hiddenFormGroups.includes( groupName )
      );
    },
    isFormGroupVisible ( state ) {
      return groupName => !state.hiddenFormGroups.includes( groupName );
    },
  },
  mutations: {
    initFormGroups ( state, formGroups ) {
      state.formGroups = formGroups || [];
    },
    hideFormGroup ( state, groupName ) {
      if ( !state.hiddenFormGroups.includes( groupName ) )
      {
        state.hiddenFormGroups.push( groupName );
      }
    },
    showFormGroup ( state, groupName ) {
      const index = state.hiddenFormGroups.indexOf( groupName );
      if ( index > -1 )
      {
        state.hiddenFormGroups.splice( index, 1 );
      }
    }
  },
  actions: {
    fillForm ( { dispatch }, backendData ) {
      Object.keys( formItemModules ).forEach( ( moduleKey ) => {
        dispatch( `${ moduleKey }/data2State`, backendData )
      } );
    },
  },
  modules: {
    ...formItemModules,
    ...formGroupModules,
  },
  plugins: [ fillPlugin ],
} );

export default store;