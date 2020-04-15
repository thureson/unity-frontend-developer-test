import React from 'react'
import { shallow } from 'enzyme'
import App from './index.js'
import Table from '../Table'

describe('<App />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<App />);
  })

  describe('render()', () => {
    it('renders the App-component', () => {
      expect(wrapper.find('.App')).toHaveLength(1)
    })

    it('renders both Tables', () => {
      expect(wrapper.find(Table)).toHaveLength(2)
    })
  })
})
