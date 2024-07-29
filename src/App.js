import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import Main from "./member/page/Main";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main />}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
