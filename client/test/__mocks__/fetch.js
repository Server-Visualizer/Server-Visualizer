// Mock fetch call
export default function() {
    return Promise.resolve({
        json: () => 
            Promise.resolve([
                { method: 'GET', reqTime: 1566751130540, elapsedTime: 10, status: 200 }, 
                { method: 'GET', reqTime: 1566751130540, elapsedTime: 10, status: 200 }
            ])
    }); 
}