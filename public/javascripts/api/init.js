//Start evaluation
const starRating = (ratingElem) => {

    $(ratingElem).each(function () {

        var dataRating = $(this).attr('data-rating');

        // Rating Stars Output
        function starsOutput(nothingStar, firstStar, secondStar, thirdStar, fourthStar, fifthStar) {
            return ('' +
                '<span class="' + nothingStar + '"></span>' +
                '<span class="' + firstStar + '"></span>' +
                '<span class="' + secondStar + '"></span>' +
                '<span class="' + thirdStar + '"></span>' +
                '<span class="' + fourthStar + '"></span>' +
                '<span class="' + fifthStar + '"></span>');
        }

        var fiveStars = starsOutput('star', 'star', 'star', 'star', 'star');

        var fourHalfStars = starsOutput('star', 'star', 'star', 'star', 'star half');
        var fourStars = starsOutput('star', 'star', 'star', 'star', 'star empty');

        var threeHalfStars = starsOutput('star', 'star', 'star', 'star half', 'star empty');
        var threeStars = starsOutput('star', 'star', 'star', 'star empty', 'star empty');

        var twoHalfStars = starsOutput('star', 'star', 'star half', 'star empty', 'star empty');
        var twoStars = starsOutput('star', 'star', 'star empty', 'star empty', 'star empty');

        var oneHalfStar = starsOutput('star', 'star half', 'star empty', 'star empty', 'star empty');
        var oneStar = starsOutput('star', 'star empty', 'star empty', 'star empty', 'star empty');

        var zeroHalfStar = starsOutput('star half', 'star empty', 'star empty', 'star empty', 'star empty');
        var zeroStar = starsOutput('star empty', 'star empty', 'star empty', 'star empty', 'star empty');

        // Rules
        if (dataRating >= 4.75) {
            $(this).append(fiveStars);
        } else if (dataRating >= 4.25) {
            $(this).append(fourHalfStars);
        } else if (dataRating >= 3.75) {
            $(this).append(fourStars);
        } else if (dataRating >= 3.25) {
            $(this).append(threeHalfStars);
        } else if (dataRating >= 2.75) {
            $(this).append(threeStars);
        } else if (dataRating >= 2.25) {
            $(this).append(twoHalfStars);
        } else if (dataRating >= 1.75) {
            $(this).append(twoStars);
        } else if (dataRating >= 1.25) {
            $(this).append(oneHalfStar);
        } else if (dataRating >= 1) {
            $(this).append(oneStar);
        } else if (dataRating >= 0.5) {
            $(this).append(zeroHalfStar);
        } else if (dataRating < 0.5) {
            $(this).append(zeroStar);
        }

    });

}

//Customisation de la date
const customDate = (date) => {
    console.log(date);
    
    var formatDate = new Date(date);
    return formatDate.getDate() + " " + getMonth(formatDate.getMonth()) + " " + formatDate.getFullYear();
}

/**
 * Récupération du mois en question
 * @param {Number} month Le mois en question
 */
function getMonth(month) {
    var monthLetters = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

    return monthLetters[parseInt(month)];
}

export { starRating, customDate }