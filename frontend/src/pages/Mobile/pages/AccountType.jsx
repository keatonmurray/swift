import React from 'react'
import { MdOutlinePerson } from "react-icons/md";
import { HiOutlineBriefcase } from "react-icons/hi";
import { MdKeyboardArrowRight } from "react-icons/md";

import { Link } from 'react-router-dom';

const AccountType = () => {
  return (
    <div className="swift auth account-type flex-column d-flex justify-content-center align-items-center min-vh-100">
        <div className="px-4">
            <p className="text-small text-uppercase text-center fw-bold welcome-text">Welcome!</p>
            <h1 className="text-center mb-4 fw-semibold fs-36">Choose Your <span className="d-block">Account Type</span></h1>
            <p className="small text-center">Tell us a bit about yourself so we can customize your experience.</p>
            <br />
            <Link to="/register" className="w-100 btn btn-dark my-1 py-3 fw-semibold">
                <div className="d-flex align-items-center justify-content-center">
                    <MdOutlinePerson size={40} className="button-icon me-2"/>
                    <span className="text-start ">Personal <span className="d-block text-start mt-1 fw-normal small">For individuals and personal use</span></span>
                    <MdKeyboardArrowRight size={35} className="ms-2 button-icon"/>
                </div>
            </Link>
            <Link className="w-100 btn btn-dark my-1 py-3 fw-semibold">
               <div className="d-flex align-items-center justify-content-center">
                    <HiOutlineBriefcase size={33} className="button-icon me-2"/>
                    <span className="text-start ">Business <span className="d-block text-start mt-1 fw-normal small">For companies and organizations</span></span>
                    <MdKeyboardArrowRight size={35} className="ms-2 button-icon"/>
                </div>
            </Link>
        </div>
    </div>
  )
}

export default AccountType