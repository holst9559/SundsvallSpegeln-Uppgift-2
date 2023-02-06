export default function validateReview(review) {
    const MIN_NAME_LENGTH = 3;
    const MIN_COMMENT_LENGTH = 10;
    console.log(review.author.length);

    const rating = parseInt(review.rating);
    if (isNaN(rating) || rating < 0 || rating > 5) {
        return {
            isValid: false,
            code: 401,
            message: "Invalid rating"
        };
    }

    if (review.author.length < MIN_NAME_LENGTH) {
        return {
            isValid: false,
            code: 401,
            message: `Name has to be atleast ${MIN_NAME_LENGTH} characters long`
        }
    }

    if (review.comment.length < MIN_COMMENT_LENGTH) {
        return {
            isValid: false,
            code: 401,
            message: `Comment has to be atleast ${MIN_COMMENT_LENGTH} characters long`
        }
    }

    const hasProfanity = checkProfanity([review.author, review.comment]);
    if (hasProfanity) {
        return {
            isValid: false,
            code: 401,
            message: "Cannot contain profanity"
        }
    }

    return {
        isValid: true,
        code: 200,
        message: "Review is validated"
    }
}

function checkProfanity(arr) {
    const profanities = [
        "järnspikar", "attans", "nedrans", "milda matilda", "herregud", "jösses", "jesus amalia"
    ];

    return arr.some(str => {
        const lowercaseStr = str.toLowerCase().replace(/\s/g, "");
        return profanities.some(p => lowercaseStr.includes(p));
    });
}

