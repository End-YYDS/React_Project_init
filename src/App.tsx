import "./index.css";
import { Button } from "@/components/ui/button";
function App() {
    return (
        <div className="flex flex-col items-center justify-center min-h-svh">
            <Button onClick={() => alert("Clicked")}>Click me</Button>
        </div>
    );
}

export default App;
