import React, { Component } from 'react';
import './style.css'
class OrderItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: props.comment || '',
            ifClickComment: false,
            ifClickShowComment: false,
            stars: props.stars || 0
        };
    }

    renderCommentArea() {
        return (
            <div className="orderItem__commentContainer">
                <textarea className="orderItem__comment" onChange={this.handleCommentChange} value={this.state.comment} />
                {this.renderStars()}
                <button className="orderItem__btn orderItem__btn--red" onClick={this.handleSubmitComment}>提交</button>
                <button className="orderItem__btn orderItem__btn--grey" onClick={this.handleCancelComment}>取消</button>
            </div>
        )
        
    }

    renderShowCommentArea() {
        return (
            <div className="orderItem__commentContainer">
                <div className="commentUser" style={{fontSize: '15px', fontWeight: 'bold'}}>匿名用户</div>
                <div>{this.renderStars()}</div>
                <div>{this.state.comment}</div>    
            </div>
        );
    }

    renderStars() {
        const {stars} = this.state;
        return (
            <div>
                {
                    [1, 2, 3, 4, 5].map((item, index) => {
                        const light = stars >= item ? 'orderItem__star--light' : 'orderItem__star';
                        return (
                                <span key={index} className={light} onClick={this.handleStarsClick.bind(this, item)}>♥</span>
                        )
                    })
                }
            </div>
            
        );
    }

    render() {
        const {shop, product, price, picture, ifCommented} = this.props.data;
        const displayCommentBtn = this.state.ifClickComment ? {display: 'none'} : {display: ''};
        return (
            <div className="orderItem">
                <div className="orderItem__picContainer">
                    <img className="orderItem__pic" alt="pic" src={picture}/>
                </div>
                <div className="orderItem__content">
                    <div className="orderItem__product">{product}</div>
                    <div className="orderItem__shop">{shop}</div>
                    <div className="orderItem__detail">
                        <div className="orderItem__price">{price}</div>
                        <div>
                            {
                                ifCommented ? (
                                    <button className="orderItem__btn orderItem__btn--grey" onClick={this.handleShowCommentClick}>查看评价</button>
                                ) : (
                                    <button className="orderItem__btn orderItem__btn--red" onClick={this.handleCommentClick} style={displayCommentBtn}>评价</button>
                                )
                            }
                            
                        </div>
                    </div>
                </div>
                {this.state.ifClickShowComment ? this.renderShowCommentArea() : ''}
                {this.state.ifClickComment ? this.renderCommentArea() : ''}
            </div>
        );
    }

    handleCommentClick = () => {
        this.setState({
            ifClickComment: true
        });
    }

    handleShowCommentClick = () => {
        this.setState({
            ifClickShowComment: !this.state.ifClickShowComment
        })
    }

    handleCommentChange = (event) => {
        this.setState({
            comment: event.target.value
        });
    }

    handleStarsClick = (item) => {
        this.setState({
            stars: item
        })
    }

    handleCancelComment = () => {
        this.setState({
            comment: this.props.stars || '',
            ifClickComment: false,
            stars: this.props.stars || 0
        });
    }

    handleSubmitComment = () => {
        const {comment, stars} = this.state;
        const {id} = this.props.data;
        this.setState({
            ifClickComment: false
        });
        this.props.onSubmit(id, comment, stars)
    }
}

export default OrderItem;