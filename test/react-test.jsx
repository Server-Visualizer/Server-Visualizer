import React from 'react'; 
// Import testing 
import { render, fireEvent } from 'react-testing-library'
import { shallow, mount, configure } from 'enzyme'; 
import Adapter from 'enzyme-adapter-react-16'; 
// Main app 
import App from './App.jsx'; 
// Containers
import Graphs from './containers/GraphContainer.jsx';
import Requests from './containers/RequestContainer.jsx';
// Components 
import RequestDisplay from './components/RequestDisplay.jsx';
import PieChart from './components/HTTPRequestPieChart.jsx';
// Configure the adapter 
Enzyme.configure({ adapter: new Adapter() }); 

// App should render its components without crashing 
it('renders without crashing', () => {
    // Declare a constant and assign to the created dom element 
    const div = document.createElement('div'); 
    // Render the App component at div
    ReactDOM.render(<App />, div); 
    // Remove the mounted React component from the DOM 
    // and clean up its event ahndlers and state
    ReactDOM.unmountComponentAtNode(div); 
}); 
// GraphContainer should render 
describe('Graph Container component', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<Graphs />); 
        expect(wrapper).toMatchSnapshot(); 
    }); 
}); 
// RequestContainer should render
describe('Request Container component', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<Requests />); 
        expect(wrapper).toMatchSnapshot(); 
    }); 
}); 

// Request Display component should render
describe('Request Display component', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<RequestDisplay />); 
        expect(wrapper).toMatchSnapshot(); 
    }); 
}); 
// Pie chart component should render 
describe('Pie chart component', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<PieChart />); 
        expect(wrapper).toMatchSnapshot(); 
    }); 
}); 

// Mock fetch calls 
window.fetch = jest.fn()
                 .mockImplementationOnce(() => ({
                   status: 200,
                   json: () => new Promise((resolve, reject) => {
                     resolve({
                       requests: [
                         { method: 'GET', reqTime: 1566751130540, elapsedTime: 10, status: 200 }, 
                         { method: 'GET', reqTime: 1566751130540, elapsedTime: 10, status: 200 }, 
                         { method: 'GET', reqTime: 1566751130540, elapsedTime: 10, status: 200 },
                       ]
                     })
                   })
                 }))
                 .mockImplementationOnce(() => ({
                    status: 500,
                  }))
// App's componentDidMount should fetch the data
describe('App', () => {
    // Test the componentDidMount lifecycle 
    describe('componentDidMount', () => {
      it('sets the state in componentDidMount', async () => {
        // Make a shallow copy 
        const renderedComponent = await shallow(<App />)
        // App comp updates
        await renderedComponent.update()
        // The request's length should be 3
        expect(renderedComponent.state('requests').length).toEqual(3); 
      })

