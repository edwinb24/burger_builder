import React, { Component, Fragment } from 'react'

import Burger from './../../components/Burger/Burger'
import BurgerControls from './../../components/Burger/BuildControls/BuildControls'

const INGREDIENT_PRICES = {
    salad: .5,
    bacon: .7,
    cheese: .4,
    meat: 1.3
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseable: false
    }

    updatingPurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0)
        this.setState({purchaseable: sum > 0})  
    }

    addIngredientHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = this.state.ingredients[type] + 1
        const priceIncrease= INGREDIENT_PRICES[type]
        const newPrice = this.state.totalPrice + priceIncrease
        this.setState({
            ingredients : updatedIngredients,
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
            ingredients : updatedIngredients,
            totalPrice: newPrice
        })
        this.updatingPurchaseState(updatedIngredients)
    }


    render() {
        return (
            <Fragment>
                <Burger ingredients={this.state.ingredients} />
                <BurgerControls 
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientRemove={this.removeIngredientHandler}
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
                />
            </Fragment>
        )
    }
}

export default BurgerBuilder