import React from 'react'
import { useAuth } from '../../context'
import { notificationData } from '../../utils/data'

const NotificationCard = () => {
    const { notificationRef } = useAuth()
    return (
        <div className="dropdown-menu-animate-up notification-card" aria-labelledby="drop2" ref={notificationRef}>
            <div className="d-flex align-items-center justify-content-between py-3 px-7">
                <h5 className="mb-0 fs-5 fw-semibold">Notifications</h5>
                <span className="badge text-bg-primary rounded-4 px-3 py-1 lh-sm">5 new</span>
            </div>
            <div className="message-section">
                {
                    notificationData?.map((noti) => (
                        <div className="message-body " data-simplebar key={noti?.id}>
                            <a className=" d-flex align-items-center dropdown-item my-2">
                                <span className="me-3">
                                    <img src={noti?.icon} alt="user" className="rounded-circle" width={40} height={40} />
                                </span>
                                <div className="w-100 userName">
                                    <h6 className="mb-1 fs-6 fw-semibold lh-base">{noti?.title}</h6>
                                    <span className="d-block text-body-secondary">{noti?.subTitle}</span>
                                </div>
                            </a>
                        </div>
                    ))
                }


            </div>

            <div className="py-6 px-7 mb-1">
                <button className="btn btn-outline-primary w-100">See All Notifications</button>
            </div>
        </div>
    )
}

export default NotificationCard