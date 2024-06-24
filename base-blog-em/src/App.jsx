import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { Posts } from "./Posts";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    // Created a QueryClientProvider and provided queryClient
    // which would be available to all its descendants
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Blog &apos;em Ipsum</h1>
        <Posts />
      </div>
    </QueryClientProvider>
    
  );
}

export default App;
