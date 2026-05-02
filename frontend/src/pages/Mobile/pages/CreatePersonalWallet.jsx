import React from 'react'

import { useParams } from 'react-router-dom'

const CreatePersonalWallet = () => {
  const { id } = useParams()
  return (
    <div className="swift personal-wallet d-flex align-items-center justify-content-center min-vh-100 bg-white">CreatePersonalWallet</div>
  )
}

export default CreatePersonalWallet