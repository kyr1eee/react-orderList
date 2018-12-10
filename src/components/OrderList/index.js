import React, { Component } from 'react';
import OrderItem from '../OrderItem'

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        fetch("/mock/order.json").then(res => {
            if (res.ok) {
                res.json().then(data => {
                    this.setState({
                        data: data
                    });
                });
            }
        })
    }

    render() {
        return (
            <div>
                {
                    // Array.prototype.map进行列表渲染
                    this.state.data.map(item => {
                        return <OrderItem data={item} key={item.id} onSubmit={this.handleSubmit} />
                    })
                }

            </div>
        );
    }

    handleSubmit = (id, comment, stars) => {
        const newData = this.state.data.map(item => {
            return item.id === id ? {
                ...item,
                comment: comment,
                stars: stars,
                ifCommented: true
            } : item;
        });
        this.setState({
            data: newData
        })
    }
}

export default index;