import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavigationItems />); 
  });

  it('should render two navigation item elements if not authenticated', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it('should render three navigation item elements if authenticated', () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it('should render logout navigation item with link equal to "/logout" and text equal to "Logout" only when authenticated', () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
  });

  it('should not render logout navigation item if not authenticated', () => {
    expect(wrapper.contains(<NavigationItem>Logout</NavigationItem>)).toEqual(false);
  });

  it('should render orders link if athenticated', () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.contains(<NavigationItem link="/orders">Orders</NavigationItem>)).toEqual(true);
  });

  it('should not render orders link if not authenticated', () => {
    expect(wrapper.contains(<NavigationItem link="/orders">Orders</NavigationItem>)).toEqual(false);
  });

  it('should render burgerBuilder link always', () => {
    expect(wrapper.contains(<NavigationItem link="/">Burger Builder</NavigationItem>)).toEqual(true);

    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.contains(<NavigationItem link="/">Burger Builder</NavigationItem>)).toEqual(true);

  });
});