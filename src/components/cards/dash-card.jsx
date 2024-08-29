import React from 'react'
import { FaHome } from 'react-icons/fa'
import { FaSection } from 'react-icons/fa6'

const DashCard = () => {
    return (
        <div className="dashboard">
            <div className="dcard bg-success-subtle ">
                <div className="dcard-icon fontIcon1">
                    <FaSection />
                </div>
                <div className="dcard-title">Alumni</div>
                <div className="dcard-value">300</div>
            </div>
            <div className="dcard bg-info-subtle">
                <div className="dcard-icon fontIcon2">
                    <FaHome />
                </div>
                <div className="dcard-title">Students</div>
                <div className="dcard-value">20</div>
            </div>
            <div className="dcard bg-danger-subtle">
                <div className="dcard-icon fontIcon3">
                    <FaHome />
                </div>
                <div className="dcard-title">Jobs</div>
                <div className="dcard-value">356</div>
            </div>
        </div>


    )
}

export default DashCard