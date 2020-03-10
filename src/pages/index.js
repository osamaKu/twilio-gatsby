import React, { useState, useEffect, useRef } from "react"
// import { Link } from "gatsby"
import TwilioVideo from "twilio-video"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"

import StartForm from "../components/start-form"

const Video = ({ token }) => {
  const localVidRef = useRef()
  const remoteVidRef = useRef()

  useEffect(() => {
    // TwilioVideo.connect(token, { video: true, audio: true, name: "test" }).then(
    //   room => {
    //     // Attach local video
    //     TwilioVideo.createLocalVideoTrack().then(track => {
    //       localVidRef.current.appendChild(track.attach())
    //     })

    //     // Attach all remote video participants
    //     room.participants.forEach(participant => {
    //       participant.tracks.forEach(publication => {
    //         if (publication.isSubscribed) {
    //           const track = publication.track

    //           remoteVidRef.current.appendChild(track.attach())
    //         }
    //       })
    //     })
    //   }
    // )

    TwilioVideo.connect(token, { video: true, audio: true, name: "test" }).then(
      room => {
        // Attach the local video
        TwilioVideo.createLocalVideoTrack().then(track => {
          localVidRef.current.appendChild(track.attach())
        })

        const addParticipant = participant => {
          console.log("new participant!")
          console.log(participant)

          participant.tracks.forEach(publication => {
            if (publication.isSubscribed) {
              const track = publication.track

              remoteVidRef.current.appendChild(track.attach())
              console.log("attached to remote video")
            }
          })

          participant.on("trackSubscribed", track => {
            console.log("track subscribed")
            remoteVidRef.current.appendChild(track.attach())
          })
        }

        room.participants.forEach(addParticipant)
        room.on("participantConnected", addParticipant)
      }
    )
  }, [token])

  return (
    <div>
      <div ref={localVidRef} />
      <div ref={remoteVidRef} />
    </div>
  )
}

const IndexPage = () => {
  const [token, setToken] = useState(false)

  return (
    <Layout>
      <SEO title="Home" />
      {/* <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link> */}
      {/*
      TODO::
      1- Show Local Video
      2- Connect The Room
      3- Show Participants Video (remote)
      4- Handle Events
     */}
      {!token ? <StartForm storeToken={setToken} /> : <Video token={token} />}
    </Layout>
  )
}

export default IndexPage
