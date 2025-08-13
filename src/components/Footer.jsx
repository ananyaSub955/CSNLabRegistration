import React from 'react'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
    const navigate = useNavigate();
    return (
        // <!-- Remove the container if you want to extend the Footer to full width. -->
        <div className="mt-5 pb-2 fs-5">

            <section>
                {/* <!-- Footer --> */}
                <footer className="text-center text-white bg-blue" >
                    {/* <!-- Grid container --> */}
                    <div className="container p-4 pb-0">
                        {/* <!-- Section: CTA --> */}
                        <section className="">
                            <p className="d-flex justify-content-center align-items-center">
                                <span className="me-3">Sign up with an account now!</span>
                                <button type="button" className="btn btn-outline-light btn-rounded" onClick={() => navigate('/signUpPage')}>
                                    Sign up!
                                </button>
                            </p>
                        </section>
                        {/* <!-- Section: CTA --> */}
                    </div>
                    {/* <!-- Grid container --> */}

                    {/* <!-- Copyright --> */}
                    <div className="text-center p-3">
                        © 2020 Copyright:
                        <a className="text-white" href="https://mdbootstrap.com/">MDBootstrap.com</a>
                    </div>
                    {/* <!-- Copyright --> */}
                </footer>
                {/* <!-- Footer --> */}
            </section>

        </div>
        // <!-- End of .container -->
    )
}

export default Footer