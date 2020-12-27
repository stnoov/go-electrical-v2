import Map from "./Map/Map";
import AuthContent from "./Authentication/AuthContent";
import './Main.css'


export default function Main() {
    return (
        <div className='main-page'>
            <AuthContent />
            <Map />
        </div>
    )
}