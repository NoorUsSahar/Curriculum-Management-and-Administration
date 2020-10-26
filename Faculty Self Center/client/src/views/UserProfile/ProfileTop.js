import React from 'react'
import PropTypes from 'prop-types'

const ProfileTop = ({profile : { 
    designation , 
    phone_number ,
    website , 
    faculty : { name , email }
    }
    }) => {
    return (
        <div class="profile-top bg-primary p-2">
          <img
            class="round-img my-1"
            src=""
            alt=""
          />
          <h1 class="large">{name}</h1>
          <p class="lead">{designation}</p>
          <p class="lead">{phone_number}</p>
          <p class="lead">{email}</p>
          {/* <p>Seattle, WA</p> */}
          <div class="icons my-1">

              {
                  website && (
                    <a href={website} target="_blank" rel="noopener noreferrer">
                     <i class="fas fa-globe fa-2x"></i>
                        </a>
                  )
              }
            
            {/*
            social &&social.twitter &&(
                <a href="{twitter}" target="_blank" rel="noopener noreferrer">
              <i class="fab fa-twitter fa-2x"></i>
            </a>
            ) 

            // do rest similarly
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i class="fab fa-facebook fa-2x"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i class="fab fa-linkedin fa-2x"></i>
            </a>
             <a href="#" target="_blank" rel="noopener noreferrer">
              <i class="fab fa-youtube fa-2x"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <i class="fab fa-instagram fa-2x"></i>
            </a> */}
          </div>
        </div>
    )
}

ProfileTop.propTypes = {
    profile : PropTypes.object.isRequired
}

export default ProfileTop
