import React, { Component, Fragment } from 'react'

import Burger from './../../components/Burger/Burger'
import BurgerControls from './../../components/Burger/BuildControls/BuildControls'
import Modal from './../../components/UI/Modal/Modal'
import OrderSummary from "./../../components/Burger/OrderSummary/OrderSummary"
import Spinner from './../../components/UI/Spinner/Spinner'
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler'
import axios from "./../../axios-orders"


const INGREDIENT_PRICES = {
    salad: .5,
    bacon: .7,
    cheese: .4,
    meat: 1.3
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://react-my-burger-57331.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({
                    ingredients: response.data
                })
            })
            .catch(error => {
                this.setState({
                    error: true
                })
            })
    }


    updatingPurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0)
        this.setState({ purchaseable: sum > 0 })
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        this.setState({ loading: true })
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: "Edwin",
                address: {
                    street: "123 Main Street",
                    zipCode: "12345",
                    country: "United States"
                },
                email: 'test@test.com'
            },
            deliveryMethod: "fastest"
        }
        axios.post('/orders.json', order)
            .then(response => this.setState({ loading: false, purchasing: false }))
            .catch(error => this.setState({ loading: false, purchasing: false }))
    }

    addIngredientHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = this.state.ingredients[type] + 1
        const priceIncrease = INGREDIENT_PRICES[type]
        const newPrice = this.state.totalPrice + priceIncrease
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })
        this.updatingPurchaseState(updatedIngredients)
    }

    removeIngredientHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = this.state.ingredients[type] - 1
        const priceDeduction = INGREDIENT_PRICES[type]
        const newPrice = this.state.totalPrice - priceDeduction
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })
        this.updatingPurchaseState(updatedIngredients)
    }


    render() {
        let orderSummary = null
        let burger = this.state.error ? 
            <p>Ingredients fail to load</p>
            :
            <Spinner />

        if (this.state.ingredients) {
            orderSummary =
                <OrderSummary
                    ingredients={this.state.ingredients}
                    purchaseCanceled={this.purchaseCancelHandler}
                    purchaseContinue={this.purchaseContinueHandler}
                    price={this.state.totalPrice}
                />
            burger =
                <Fragment>
                    <Burger ingredients={this.state.ingredients} />
                    <BurgerControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemove={this.removeIngredientHandler}
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        purchaseable={this.state.purchaseable}
                        ordered={this.purchaseHandler}
                    />
                </Fragment>
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Fragment>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios)