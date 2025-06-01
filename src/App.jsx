import { Routes, Route, NavLink } from 'react-router-dom'
import VanillaForm from './pages/VanillaForm'
import HookForm from './pages/HookForm'

export default function App() {
    return (
        <div className="container">
            <nav>
                <NavLink to="/vanilla-form">Vanilla Form</NavLink> |{' '}
                <NavLink to="/hook-form">Hook Form</NavLink>
            </nav>

            <Routes>
                <Route path="/vanilla-form" element={<VanillaForm />} />
                <Route path="/hook-form" element={<HookForm />} />
            </Routes>
        </div>
    )
}
