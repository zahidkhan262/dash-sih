import React from 'react'

const DashCard = () => {
    return (
        <div className="dashboard">
            <div className="dcard bg-success-subtle ">
                <div className="dcard-icon">
                    {/* Your icon here */}
                </div>
                <div className="dcard-title">Alumni</div>
                <div className="dcard-value">300</div>
            </div>
            <div className="dcard bg-info-subtle">
                <div className="dcard-icon">
                    {/* Your icon here */}
                </div>
                <div className="dcard-title">Students</div>
                <div className="dcard-value">20</div>
            </div>
            <div className="dcard bg-danger-subtle">
                <div className="dcard-icon">
                    {/* Your icon here */}
                </div>
                <div className="dcard-title">Jobs</div>
                <div className="dcard-value">356</div>
            </div>
        </div>


    )
}

export default DashCard