import React, { Component } from 'react'

export default class Test extends Component {
    state = {
        displayDownButton: false,
        displayUpButton: false,
        scrollPosition:0
    }
    render() {
        return (
           <div className='card-list'>
             {this.state.displayDownButton?
             <button 
                 className='dashboard-Down' 
                 color='olive' 
                 size='small'>
             <i name='angle double down'/>See Stats
             </button>
             : null}
            {this.state.displayUpButton?
            <button 
                 className='dashboard-Up' 
                 color='olive' 
                 size='small'>
            <i name='angle double up'/>Back on top
            </button>
            : null}
        </div>
        )
    }
}