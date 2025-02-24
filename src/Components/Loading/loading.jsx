import { dotPulse } from 'ldrs'
dotPulse.register()
export default function LoadingSubmit() {
    return (
        <div className="spinner-container-submit">
                <l-dot-pulse
                    size="175"
                    speed="2.5"
                    color="#06c44fcc"
                ></l-dot-pulse>
        </div>
    )
}
