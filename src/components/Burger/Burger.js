import React from 'react'
import classes from './Burger.module.css'

import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const Burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey =>
                [...Array(props.ingredients[igKey])].map((_, i) => 
                    <BurgerIngredient type={igKey} key={igKey+i} />
                )
        )
        .reduce(
            (arr,el) => arr.concat(el),
            [])

    if(transformedIngredients.length === 0)  
        transformedIngredients = <p>Please Start adding Ingredients</p>
    
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
                {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    )
}

export default Burger