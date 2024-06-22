import { helix } from 'ldrs'
helix.register()
export default function loadingSubmit() {
    return (
        <div className="spinner-container-submit">
            <l-helix
                size="45"
                speed="2.5"
                color="#06c44fcc"
            ></l-helix>
        </div>
    )
}