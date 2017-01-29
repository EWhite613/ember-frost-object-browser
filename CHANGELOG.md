# 17.0.4

* **Fixed** `frost-object-browser` component to only show facets DOM when the `filters` property is present.


# 17.0.3
* Added frost-list to the blueprint install (the expected choice for the content component)
* Fixed the look of the scroll gutter for pagination
* Fixed the spacing for the last item in the list when the action bar would cover it

# 17.0.2

* **Fixed** consumption in apps by removing file with bad reference.


# 17.0.1
**added** action bar styles


# 17.0.0

* Coming soon...unblocking upgrades

# 16.0.4

* **Added** configuration option to turn off prototype extensions for Date.


# 16.0.3
* Updated blueprint

# 16.0.2

* **Updated** `ember-data` dependency to float on the minor instead of the major.
* **Updated** Cleaned up the `CHANGELOG.md`

# 16.0.1

* **Updated** `ember-frost-info-bar` dependency in blueprint to latest version.
* **Updated** usage of sinon-chai to include the development environment.
* **Removed** `ember-hook` devDependency since it is not being used.

# 16.0.0

- Removed `onSelect` from the block parameters for the `view` slot
- Added `selections` to the `frost-object-browser` interface
- Updated the README to reflect block-slots 1.0 syntax
- The `actions` slot is no longer visible when no items are selected
- Added a show/hide transition animation for the `actions` slot

# 15.0.0
- Block-slots upgrade to >1.0.0

# 14.2.2
No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`

# 14.2.1
* Remove css counters. Replace with selections.length

# 14.2.0
* Added `onSortChange` and `sortData` attributes to `frost-object-browser-inline`

# 14.1.4
* Updated action bar positioning
* Updated margin between each action button

# 14.1.3
No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`

# 14.1.2
* Floating action bar
* Add selected item count
* Set facets font size to medium


# 14.1.1
No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`

# 14.1.0

## Non-Breaking

* **Added** unit and integration tests for frost-object-browser component
* **Added** unit and integration tests for selection-action-button component
* **Added** unit and integration tests for selection-action-link component
* **Added** docBlock headers for frost-object-browser component
* **Added** docBlock headers for selection-action-button component
* **Added** docBlock headers for selection-action-link component

# 14.0.0

Modified the interface of the object browser to minimize coupling between the presentation and logic layers.

See https://github.com/ciena-frost/ember-frost-object-browser#api for the new interface specification.

A new `frost-object-browser-inline` component has also been introduced that implements the `frost-object-browser` component according to the previously stable 5.x interface and marked the usage of this component as deprecated for removal in the next major release (15.x).  This allows users of the legacy format a smoother transition path to the new slots based implementation.

See https://github.com/ciena-frost/ember-frost-object-browser#inline-api for the legacy inline specification.

# 13.0.1
No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`

# 13.0.0

## Breaking

* **Upgraded** `ember-frost-bunsen` to version `6.0.0`.

  > `model` became `bunsenModel` and `view` became `bunsenView`.

* **Upgraded** `ember-prop-types` to version `2.0.0`.

  > `oneOf` changed to `oneOfType` to better align with the React `propTypes` API.

# 12.0.0

No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`

# 11.0.0

No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`

# 11.0

## Breaking

* **Removed** support for pagination being built into the object-browser

* **Added** support for pagination as a named block slot
  This was done to increase the flexibilty of the object browser.
  The new usage allows for pagination to be passed into the component's block
  section:

  ```handlebars
  {#frost-object-browser
    facets=model.facets
    filters=filters
    model=model.model
    onCreate=(action 'onCreate')
    onDetailChange=(action 'onDetailChange')
    onFacetChange=(action 'onOptionSelected')
    onFilter=onFilter
    onRowSelect=(action 'onRowSelect')
    title='Resources'
    values=model.visibleResources
    viewSchema=viewSchema
  as |slot|}}
    {{#block-slot slot 'pagination' as |paginator onPageChanged|}}
      {{paginator.control
        onPageChanged=(action onPageChanged)
      }}
    {{/block-slot}}
  {{/frost-object-browser}}
  ```


# 10.0

## Breaking

* **Removed** support for the frost-list being built into the object-browser (what is showing the object data in list view)

* **Added** support for the object data as a named block slot
  This was done to increase the flexibilty of what can be set to handle the object data.
  The new usage allows for this object data to be passed into the component's block
  section:

  ```handlebars
  {#frost-object-browser
    facets=model.facets
    filters=filters
    model=model.model
    onCreate=(action 'onCreate')
    onDetailChange=(action 'onDetailChange')
    onFacetChange=(action 'onOptionSelected')
    onFilter=onFilter
    onRowSelect=(action 'onRowSelect')
    title='Resources'
    values=model.visibleResources
    viewSchema=viewSchema
  as |slot|}}
    {{#block-slot slot 'objects' as |object onSelect|}}
      {{#frost-list onSelect=(action onSelect) selections=object.selectedItems records=object.computedValues as |record|}}
        {{#frost-object-browser-list-item model=record as |value|}}
          {{frost-bunsen-detail
            model=object.model
            renderers=object.renderers
            value=value
            view=object.computedViewLevel
          }}
        {{/frost-object-browser-list-item}}
      {{/frost-list}}
    {{/block-slot}}
  {{/frost-object-browser}}
  ```

# 9.0

## Breaking

* **Removed** support for application level actions (create at the app level)

* **Added** support for application level actions as a named block slot
  This was done to increase the flexibilty of what can be set as the `app-actions`.
  The new usage allows for these actions to be passed into the component's block
  section:

  ```handlebars
  {#frost-object-browser
    facets=model.facets
    filters=filters
    model=model.model
    onCreate=(action 'onCreate')
    onDetailChange=(action 'onDetailChange')
    onFacetChange=(action 'onOptionSelected')
    onFilter=onFilter
    onRowSelect=(action 'onRowSelect')
    title='Resources'
    values=model.visibleResources
    viewSchema=viewSchema
  as |slot|}}
    {{#block-slot slot 'app-actions' as |onCreate|}}
      {{frost-button
        icon='frost/infobar-create'
        onClick=(action onCreate)
        priority='tertiary'
        size='medium'
        text='Create'
        vertical=true
      }}
    {{/block-slot}}
  {{/frost-object-browser}}
  ```

# 8.0

## Breaking

* **Removed** support for the button bar (level of detail controls)

* **Added** support for the button bar level of detail controls as a named block slot
  This was done to increase the flexibilty of what can be used as the level of detail
  controls. The new usage allows for these controls to be passed into the component's
  block section:

  ```handlebars
  {#frost-object-browser
    facets=model.facets
    filters=filters
    model=model.model
    onCreate=(action 'onCreate')
    onDetailChange=(action 'onDetailChange')
    onFacetChange=(action 'onOptionSelected')
    onFilter=onFilter
    onRowSelect=(action 'onRowSelect')
    title='Resources'
    values=model.visibleResources
    viewSchema=viewSchema
  as |slot|}}
    {{#block-slot slot 'view-controls' as |viewControl viewLevel onDetailChange|}}
      <div class="button-bar {{ viewControl.detailLevel }}">
      {{#if viewLevel.low}}
        {{frost-button
          disabled=(eq viewControl.detailLevel 'low')
          onClick=(action onDetailChange 'low')
          priority='tertiary'
          size='small'
          icon='frost/list-small'
        }}
      {{/if}}
      {{#if viewLevel.medium}}
        {{frost-button
          disabled=(eq viewControl.detailLevel 'medium')
          onClick=(action onDetailChange 'medium')
          priority='tertiary'
          size='small'
          icon='frost/list-medium'
        }}
      {{/if}}
      {{#if viewLevel.high}}
        {{frost-button
          disabled=(eq viewControl.detailLevel 'high')
          onClick=(action onDetailChange 'high')
          priority='tertiary'
          size='small'
          icon='frost/list-large'
        }}
      {{/if}}
      </div>
    {{/block-slot}}
  {{/frost-object-browser}}
  ```

# 7.0

## Breaking

* **Removed** support for the info bar content (title and subtitle information)

* **Added** support for the info bar content as a named block slot
  This was done to increase the flexibilty of what can be used as the info bar
  content. The new usage allows for these content to be passed into
  the component's block section:

  ```handlebars
  {#frost-object-browser
    facets=model.facets
    filters=filters
    model=model.model
    onCreate=(action 'onCreate')
    onDetailChange=(action 'onDetailChange')
    onFacetChange=(action 'onOptionSelected')
    onFilter=onFilter
    onRowSelect=(action 'onRowSelect')
    title='Resources'
    values=model.visibleResources
    viewSchema=viewSchema
  as |slot|}}
    {{#block-slot slot 'info-bar' as |infoBar|}}
      <div class="primary-title">
        {{infoBar.title}}
      </div>
      <div class="sub-title">
        {{infoBar.summary}}
      </div>
    {{/block-slot}}
  {{/frost-object-browser}}
  ```

# 6.0

## Breaking

* **Removed** support for the filter pane content (filters)

* **Added** support for the filter pane content as a named block slot
  This was done to increase the flexibilty of what can be used as the filter pane
  content. The new usage allows for these content to be passed into
  the component's block section:

  ```handlebars
  {#frost-object-browser
    facets=model.facets
    filters=filters
    model=model.model
    onCreate=(action 'onCreate')
    onDetailChange=(action 'onDetailChange')
    onFacetChange=(action 'onOptionSelected')
    onFilter=onFilter
    onRowSelect=(action 'onRowSelect')
    title='Resources'
    values=model.visibleResources
    viewSchema=viewSchema
  as |slot|}}
    {{#block-slot slot 'filters' as |filters onFilter|}}
      {{frost-object-browser-filter filters=filters onFilter=onFilter}}
    {{/block-slot}}
  {{/frost-object-browser}}
  ```

#5.1.1

* **Fixed** Added `ember-prop-types` to catch a bug where multiple instances were sharing memory

#5.1.0

* **Added** Created a property to allow for showing/not showing the counts in the subtitle of the `info-bar` section.

# 5.0

## Breaking

* **Removed** support for the row actions content (actions on records: edit, delete, details)

* **Added** support for the row actions content as a named block slot
  This was done to increase the flexibilty of what can be used as the row actions
  content. The new usage allows for these content to be passed into
  the component's block section:

  ```handlebars
  {#frost-object-browser
    facets=model.facets
    filters=filters
    model=model.model
    onCreate=(action 'onCreate')
    onDetailChange=(action 'onDetailChange')
    onFacetChange=(action 'onOptionSelected')
    onFilter=onFilter
    onRowSelect=(action 'onRowSelect')
    title='Resources'
    values=model.visibleResources
    viewSchema=viewSchema
  as |slot|}}
    {{#block-slot slot 'actions'}}
      {{#each actionBarItems as |actionBarItem|}}
        {{#frost-button
          disabled=(not actionBarItem.enabled)
          onClick=(action 'onActionClick' actionBarItem.id)
          priority='secondary'
          size='large'
        }}
          <div class="text">{{actionBarItem.label}}</div>
        {{/frost-button}}
      {{/each}}
    {{/block-slot}}
  {{/frost-object-browser}}
  ```
