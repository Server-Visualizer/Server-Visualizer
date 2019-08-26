import React from 'react'; 
// Import testing 
import Enzyme, { shallow, configure } from 'enzyme'; 
import Adapter from 'enzyme-adapter-react-16'; 
import BabelPolyfill from 'babel-polyfill'; 
// Main app 
import App from '../App.jsx'; 
// Containers
import Graphs from '../containers/GraphContainer.jsx';
import Requests from '../containers/RequestContainer.jsx';
// Components 
import RequestDisplay from '../components/RequestDisplay.jsx';
import PieChart from '../components/PieChart.jsx'; 
// Import mock fetch data
import fetch from './__mocks__/fetch'; 
global.fetch = fetch; 
// Configure the adapter 
Enzyme.configure({ adapter: new Adapter() }); 

// App should render its components without crashing 
describe('App component', () => {
  // test the initial layout
    it('should render initial layout', () => {
      const component = shallow(<App />); 
      expect(component.getElements()).toMatchSnapshot(); 
    }); 
}); 
// Test our fetch 
describe('App component', () => {
  describe('When rendered', () => {
    it('should fetch the requests', () => {
      // fetch using the mock fetch method
      const fetchSpy = jest.spyOn(window, 'fetch');
      const wrapper = shallow(<App />); 
      expect(fetchSpy).toBeCalled(); 
    })
  })
}); 

// GraphContainer should render 
describe('Graph Container component', () => {
  // test the initial layout
    it('should render initial layout', () => {
      const component = shallow(<Graphs />); 
      expect(component.getElements()).toMatchSnapshot(); 
    }); 
    it('renders correctly', () => {
      // test the shallow copy
        const wrapper = shallow(<Graphs context={[{test: test}]}/>); 
        expect(wrapper).toMatchSnapshot(); 
    }); 
}); 

// Request Display component testing
describe('Request Display component', () => {
  // test the initial layout
  it('should render initial layout', () => {
      const component = shallow(<RequestDisplay reqInfo={{ method: "GET", reqTime: 10, elapsedTime: 10, status: 200}}/>); 
      expect(component.getElements()).toMatchSnapshot(); 
  }); 
  // It should render 
    it('renders correctly', () => {
        const wrapper = shallow(<RequestDisplay reqInfo={{ method: "GET", reqTime: 10, elapsedTime: 10, status: 200}} />); 
        expect(wrapper).toMatchSnapshot(); 
    }); 
}); 

