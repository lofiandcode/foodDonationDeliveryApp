import React from 'react'
import MatchCard from '../components/MatchCard';
import { Button, Modal } from 'semantic-ui-react'

const MatchContainer = (props) => {
    console.log('MatchContainer props = ',props)
    if (props.matches.length !== 0 ) {
        return (
            <Modal trigger={<Button>Show Matches</Button>}>
                <Modal.Header>Donations Reading for Delivery:</Modal.Header>
                <Modal.Content>
                <Modal.Description>
                    <MatchCard matches={props.matches}/>
                </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    } else {
        // console.log('IN esle in match container')
        return null
    }
}

export default MatchContainer

// {/* <Header>Default Profile Image</Header>
//         <p>
//           We've found the following gravatar image associated with your e-mail
//           address.
//         </p>
//         <p>Is it okay to use this photo?</p> */}

// const MatchContainer = (props) => {
//             console.log('MatchContainer props = ',props)
//             if (props.matches.length !== 0 ) {
//                 return (
//                     <MatchCard matches={props.matches}/>
//                 );
//             } else {
//                 // console.log('IN esle in match container')
//                 return null
//             }
        
//     // }
    
//     // export default MatchContainer