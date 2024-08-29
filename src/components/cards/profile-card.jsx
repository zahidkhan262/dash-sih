import React from 'react'
import { FaMailBulk } from 'react-icons/fa'
import { useAuth } from '../../context'
import { Link } from 'react-router-dom'

const ProfileCard = () => {

    const { profileRef } = useAuth()
    return (
        <div className="profile-card" aria-labelledby="drop1" ref={profileRef}>
            <div className="profile-dropdown position-relative" data-simplebar>
                <div className="">
                    <h5 className="mb-0  fw-semibold">User Profile</h5>
                </div>
                <div className="d-flex align-items-center border-bottom">
                    <img src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/profile/user-1.jpg" className="rounded-circle" width={80} height={80} alt="modernize-img" />
                    <div className="ms-3 userDetails">
                        <h5 className="mb-1">Mathew Anderson</h5>
                        <span className="mb-1 d-block">Designer</span>
                        <p className="mb-0 d-flex align-items-center gap-2">
                            <FaMailBulk />info@modernize.com
                        </p>
                    </div>
                </div>
                <div className="message-section">
                    <div className="message-body">
                        <a href="https://bootstrapdemos.adminmart.com/modernize/dist/main/page-user-profile.html" className="py-8 px-7 mt-8 d-flex align-items-center">
                            <span className="d-flex align-items-center justify-content-center text-bg-light rounded-1 p-6">
                                <img src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/svgs/icon-account.svg" alt="modernize-img" width={24} height={24} />
                            </span>

                        </a>
                        <div className="w-100 ps-3">
                            <h6 className="mb-1 fw-semibold lh-base">My Profile</h6>
                            <span className="d-block text-body-secondary">Account Settings</span>
                        </div>
                    </div>
                    <div className="message-body">
                        <a href="https://bootstrapdemos.adminmart.com/modernize/dist/main/page-user-profile.html" className="py-8 px-7 mt-8 d-flex align-items-center">
                            <span className="d-flex align-items-center justify-content-center text-bg-light rounded-1 p-6">
                                <img src="https://bootstrapdemos.adminmart.com/modernize/dist/assets/images/svgs/icon-account.svg" alt="modernize-img" width={24} height={24} />
                            </span>

                        </a>
                        <div className="w-100 ps-3">
                            <h6 className="mb-1 fw-semibold lh-base">My Profile</h6>
                            <span className="d-block text-body-secondary">Account Settings</span>
                        </div>
                    </div>
                    <Link to="/login" className="btn btn-outline-primary mt-4 col-12">Log Out</Link>
                </div>
            </div>

        </div>
    )
}

export default ProfileCard