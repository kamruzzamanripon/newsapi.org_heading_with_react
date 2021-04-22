import React, { Component } from 'react'
import {newsCategory} from '../news'

class header extends Component {
    state ={
        searchTerm: ''
    }

    handleChange = e =>{
        this.setState({searchTerm: e.target.value})
    }
    handleKeyPress = e =>{
        if(e.key === 'Enter'){
            this.props.search(this.state.searchTerm)
        }
    }
    render() {
        const { category, changeCategory } = this.props
        return (
            <div>
                <div className='my-4'>
                    <h1 className='mb-b s' style={{ fontWeight:'300'}}>
                        Block Buster Headline
                    </h1>
                    <input 
                        type="text"
                        className='form-control'
                        placeholder='Type anything & press enter to Search'
                        value={this.state.searchTerm}
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                    />

                    <div className='my-4'>
                        {newsCategory && 
                            Object.keys(newsCategory).map( (item)=>{
                                if(category == newsCategory[item]){
                                    return(
                                        <button 
                                        onClick={()=>this.props.changeCategory(newsCategory[item])}
                                        className='btn btn-sm btn-warning mr-2 mb-2'
                                        >
                                            {`#${newsCategory[item]}`}
                                        </button>
                                    )
                                }

                                return(
                                    <button 
                                    onClick={()=>this.props.changeCategory(newsCategory[item])}
                                    className='btn btn-sm btn-light mr-2 mb-2'
                                    >
                                        {`#${newsCategory[item]}`}
                                    </button>   
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default header
