import Ember from 'ember'
const {
  Mixin,
  on
} = Ember
import computed from 'ember-computed-decorators'
import FrostListMixin from 'ember-frost-list/mixins/frost-list-mixin'
import createActionClosure from 'ember-frost-object-browser/utils/action-closure'
import JsonApiObjectBrowserSerializer from 'ember-frost-object-browser/modules/json-api-object-browser-serializer'
import {
  filterHandler,
  sortHandler,
  getFromNamespace
} from 'ember-frost-object-browser/utils/object-browser-utils'

export default Mixin.create(FrostListMixin, {

  initObjectBrowserMixin: on('init', function () {


    Ember.defineProperty(this, 'listConfig', undefined, Ember.computed.alias('objectBrowserConfig.listConfig'));
    Ember.defineProperty(this, 'objectBrowserMixinConfig', undefined, Ember.computed(
      'listMixinConfig',
      'objectBrowserConfig.controlsConfig.[]',
      'objectBrowserConfig.facetsConfig',
      'selectedItemsNumber', function () {
        return {
          listMixinConfig: this.get('listMixinConfig'),
          controlsConfig: this.get('objectBrowserConfig.controlsConfig'),
          selectedItemsNumber: this.get('selectedItemsNumber'),
          facetsConfig: this.get('objectBrowserConfig.facetsConfig'),
          onFilterFormChange: this.get('_onFilterFormChange'),
          sortItems: this.get('_sortItems')
        }
    }))

    Ember.defineProperty(this, '_onFilterFormChange', undefined,
      createActionClosure.call(this, filterHandler)
    )
    Ember.defineProperty(this, '_sortItems', undefined,
      createActionClosure.call(this, sortHandler)
    )
  }),

  selectedItemsNumber: Ember.computed('selectedItems', function () {
    return Object.keys(this.get('selectedItems')).length
  }),

  clearListState: function() {
    if(this.get('selectedItems')) {
      this.set('selectedItems', Ember.A())
    }
  },

  // default filter method
  objectBrowserDefaultFilter: function (data, filter) {
    let activeFacets = filter
    if (!Ember.isPresent(activeFacets)) {
      return data
    }
    return data.filter((data) => {
      let key = true
      activeFacets.forEach((facet) => {
        if (data.get(facet.id).indexOf(facet.value) === -1) {
          key = false
        }
      })
      return key
    })
  },

  //TODO default sort steal from ember. Need rework
  objectBrowserDefaultSort: function (items, sortProperties) {
    function normalizeSortProperties(properties) {
      return properties.map(p => {
        let [prop, direction] = p.split(':')
        direction = direction || 'asc'

        return [prop, direction]
      })
    }

    let normalizedSortProperties = normalizeSortProperties(sortProperties)
    return Ember.A(items.slice().sort((itemA, itemB) => {
      for (let i = 0; i < normalizedSortProperties.length; i++) {
        let [prop, direction] = normalizedSortProperties[i];
        let result = Ember.compare(Ember.get(itemA, prop), Ember.get(itemB, prop));
        if (result !== 0) {
          return (direction === 'desc') ? (-1 * result) : result;
        }
      }
      return 0;
    }));
  },

  // hooks
  didReceiveResponse: function (response) {
    return response
  },

  didReceivePaginationResponse: function (response) {
    return response
  },

  queryErrorHandler: function (e) {
   Ember.Logger.error('response error: ' + e)
  },

  actions: {
    loadNext() {
      const serializer = JsonApiObjectBrowserSerializer.create({
        config: this.get('objectBrowserConfig.serializerConfig'),
        context: this
      })

      let pageSize = this.get('pageSize')
      let offset = this.get('offset')

      let modelKey = this.get('objectBrowserConfig.listConfig.items')
      serializer.query().then(
        (response) => {
          this.set(modelKey, this.didReceiveResponse(response))
        },
        (error) => {
          this.queryErrorHandler(error)
        }
      )
    }
  }
})
