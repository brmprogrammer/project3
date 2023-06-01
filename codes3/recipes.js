/*global $*/
(function () {
    'use strict';

    $(document).ready(async () => {
        try {
            const response = await fetch('recipes.json');
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            const recipeList = await (response.json());
            recipeList.forEach((recipe) => {
                $('#recipeList').append(`<input type="radio" name="recipeChoice" value="${recipe.file}"> ${recipe.name} </input>`);
            });
        } catch (e) {
            console.log(e.message);
        }
    });

    $('#click').click(async () => {

        let specialInput = $('input[name="recipeChoice"]:checked');
        try {
            const response = await fetch(specialInput.val());
            console.log(specialInput);
            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`);
            }
            const theRecipe = await response.json();
            $('#recipe').empty();
            $('#recipe').append(`<h1>Recipe: ${theRecipe.name}</h1>`);
            $('#recipe').append('<b>Ingredients</b><div><ul>');
            theRecipe.ingredients.forEach((ing) => {
                $('#recipe').append(`<li>${ing}</li>`);
            });
            $('#recipe').append('</ul></div>');
            $('#recipe').append(`<img src="images/${theRecipe.picture}" height = 400px width = 500px/>`);

        } catch (e) {
            console.log(e.message);
        }
    });
}());