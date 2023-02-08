export default function validateReview(review) {
    const MAX_COMMENT_LENGTH = 200;

    const rating = parseInt(review.rating);
    if (isNaN(rating) || rating < 0 || rating > 5) {
        return {
            isValid: false,
            code: 403, //Forbidden
            message: "Felaktigt betyg"
        };
    }

    if (typeof review.author !== "string") {
        return {
            isValid: false,
            code: 400,
            message: `Inte en sträng`
        }
    } 

    if (review.author.length <= 0) {
        return {
            isValid: false,
            code: 403,
            message: `Vänligen fyll i ditt namn`
        }
    }

    if (typeof review.comment !== "string") {
        return {
            isValid: false,
            code: 400,
            message: `Inte en sträng`
        }
    }

    if (review.comment.length > MAX_COMMENT_LENGTH) {
        return {
            isValid: false,
            code: 403,
            message: `Kommentaren är för lång`
        }
    }

    const hasProfanity = checkProfanity([review.author, review.comment]);
    if (hasProfanity) {
        return {
            isValid: false,
            code: 403,
            message: "Får inte innehålla svordomar"
        }
    }

    return {
        isValid: true,
        code: 200,
        message: "Recension godkänd"
    }
}

function checkProfanity(arr) {
    const profanities = [
        "järnspikar", "attans", "nedrans", "mildamatilda", "herregud", "jösses", "jesusamalia", "fan", "jävlar", "jävla"
    ];

    return arr.some(str => {
        const lowercaseStr = str.toLowerCase().replace(/\s/g, "");
        return profanities.some(p => lowercaseStr.includes(p));
    });
}

