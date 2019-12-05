import React from 'react'
import MatchCard from '../components/MatchCard';
import { Button, Modal } from 'semantic-ui-react'

const MatchContainer = (props) => {
    console.log('MatchContainer props = ',props)
    if (props.matches.length !== 0 ) {
        return (
            <Modal trigger={<Button>Show Matches</Button>}>
                <Modal.Header>Donations Ready for Delivery:</Modal.Header>
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
