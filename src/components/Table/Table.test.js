import React from 'react'
import { shallow, mount } from 'enzyme'
import Table from './index.js'
import Row from './Row'
import ColumnHeaderItem from './ColumnHeaderItem'
import ErrorNotice from './ErrorNotice'

/* 
Testing the requirements of the project

NOTES:
- Composed of unit/integration tests
- Missing the tests for checking is the table can be browsed on small devices.
  Couldn't find a way to do it without touching the actual code. 
*/

describe('<Table />', () => {
  let wrapper

  describe('as default', () => {
    describe('shallow render()', () => {

      beforeEach(() => {
        wrapper = shallow(
          <Table 
            columns={columnConfig}
            rows={mockRows_A} />
        )
      })

      it('renders the Table-component', () => {
        expect(wrapper.find('.Table')).toHaveLength(1)
      })

      it('renders correct amount of rows', () => {
        expect(wrapper.find(Row)).toHaveLength(2)
      })

      it('renders reload-button', () => {
        expect(wrapper.find('.table-button')).toHaveLength(1)
      })

      it('renders correct amount of column header keys', () => {
        expect(wrapper.find(ColumnHeaderItem)).toHaveLength(4)
      })
    })

    describe('mounted render()', () => {
      let rows

      beforeEach(() => {
        rows = mockRows_A
        wrapper = mount(
          <Table 
            columns={columnConfig}
            rows={rows}
            reload={() => { rows = mockRows_B }} />
        )
      })

      it('render correct amount of rows', () => {
        // (2 data rows) + (1 header row)
        expect(wrapper.find('.table-row')).toHaveLength(3)
      })

      it('updates rows onClick', () => {
        expect(wrapper.find('.table-row')).toHaveLength(3)
        wrapper.find('.table-button').simulate('click')
        wrapper.setProps({ rows: rows })
        expect(wrapper.find('.table-row')).toHaveLength(4)
      })

      it('sorts rows initially correct', () => {
        let firstRowId = wrapper
          .find('.table-body')
          .props().children[0].props.row.id
        expect(firstRowId).toEqual(mockRows_A[1].id)
      })

      it('reverses sorting on click', () => {
        let firstColumnHeaderItem = wrapper.find('.table-header > .table-row').childAt(0)
        firstColumnHeaderItem.simulate('click')

        let firstRowId = wrapper
          .find('.table-body')
          .props().children[0].props.row.id

        expect(firstRowId).toEqual(mockRows_A[0].id)
      })

      it("doesn't sort on click if no sortWith-function", () => {
        let firstColumnHeaderItem = wrapper.find('.table-header > .table-row').childAt(1)
        firstColumnHeaderItem.simulate('click')

        let firstRowId = wrapper
          .find('.table-body')
          .props().children[0].props.row.id

        expect(firstRowId).toEqual(mockRows_A[1].id)
      })

      it('sorts rows by current sorting when receiving new data', () => {
        let firstColumnHeaderItem = wrapper.find('.table-header > .table-row').childAt(0)
        firstColumnHeaderItem.simulate('click')

        wrapper.find('.table-button').simulate('click')
        wrapper.setProps({ rows: rows })

        let firstRowId = wrapper
          .find('.table-body')
          .props().children[0].props.row.id

        expect(firstRowId).toEqual(mockRows_B[1].id)
      })

    })
  })

  describe('as loading', () => {

    beforeEach(() => {
      wrapper = shallow(
        <Table 
          columns={columnConfig}
          rows={mockRows_A}
          loading={true} />
      )
    })

    it('hides the reload-button', () => {
      expect(wrapper.find('.table-button')).toHaveLength(0)
    })

    it('hides error-message', () => {
      expect(wrapper.find(ErrorNotice)).toHaveLength(0)
    })

  })

  describe('with errors', () => {

    beforeEach(() => {
      wrapper = shallow(
        <Table 
          columns={columnConfig}
          rows={mockRows_A}
          loading={false}
          errors={'Test-error.'} />
      )
    })

    it('renders error-message', () => {
      expect(wrapper.find(ErrorNotice)).toHaveLength(1)
    })

    it('renders reload-button', () => {
      expect(wrapper.find('.table-button')).toHaveLength(1)
    })

  })

})

const columnConfig = [
  {
    key: 'Date',
    property: 'timestamp',
    sortWith: (a, b) => 
      new Date(a.timestamp) - new Date(b.timestamp)
  },
  {
    key: 'User ID',
    property: 'id'
  },
  {
    key: 'Old Value',
    property: 'oldValue'
  },
  {
    key: 'New Value',
    property: 'newValue'
  }
]

const mockRows_A = [
  {
    id: '1as2a3a4',
    timestamp: '2020-10-20',
    oldValue: 'old',
    newValue: 'new',
  },
  {
    id: 'asd1weas2a3a4',
    timestamp: '2020-10-22',
    oldValue: 'old2',
    newValue: 'new2',
  },
]

const mockRows_B = [
  {
    id: 'ggewggw3f22',
    timestamp: '2020-10-20',
    oldValue: 'old',
    newValue: 'new',
  },
  {
    id: 'sdfsfsdgsadg',
    timestamp: '2020-10-19',
    oldValue: 'old2',
    newValue: 'new2',
  },
  {
    id: '2f2309i',
    timestamp: '2020-10-24',
    oldValue: 'old3',
    newValue: 'new3',
  },
]