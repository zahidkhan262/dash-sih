import React from 'react'
import { useAuth } from '../../context'

const NotificationCard = () => {
    const {notificationRef} = useAuth()
    return (
        <div className="dropdown-menu-animate-up notification-card" aria-labelledby="drop2" ref={notificationRef}>
            <div className="d-flex align-items-center justify-content-between py-3 px-7">
                <h5 className="mb-0 fs-5 fw-semibold">Notifications</h5>
                <span className="badge text-bg-primary rounded-4 px-3 py-1 lh-sm">5 new</span>
            </div>
            <div className="message-body " data-simplebar>
                <a className="py-2 d-flex align-items-center dropdown-item my-2">
                    <span className="me-3">
                        <img src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-2.jpg" alt="user" className="rounded-circle" width={40} height={40} />
                    </span>
                    <div className="w-100">
                        <h6 className="mb-1 fs-6 fw-semibold lh-base">Roman Joined the Team!</h6>
                        <span className="fs-6 d-block text-body-secondary">Congratulate him</span>
                    </div>
                </a>
            </div>
            <div className="message-body " data-simplebar>
                <a className="py-2 d-flex align-items-center dropdown-item my-2">
                    <span className="me-3">
                        <img src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-2.jpg" alt="user" className="rounded-circle" width={40} height={40} />
                    </span>
                    <div className="w-100">
                        <h6 className="mb-1 fs-6 fw-semibold lh-base">Roman Joined the Team!</h6>
                        <span className="fs-6 d-block text-body-secondary">Congratulate him</span>
                    </div>
                </a>
            </div>
            <div className="py-6 px-7 mb-1">
                <button className="btn btn-outline-primary w-100">See All Notifications</button>
            </div>
        </div>
    )
}

export default NotificationCard