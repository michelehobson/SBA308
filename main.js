let row = 0;
let col = 5;
let learner = [[], []];

const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
};

const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    AssignmentInfo: [
        {
            id: 1,
            name: "Declare a Variable",
            due_at: "2023-01-25",
            points_possible: 50
        },
        {
            id: 2,
            name: "Write a Function",
            due_at: "2023-02-27",
            points_possible: 150
        },
        {
            id: 3,
            name: "Code the World",
            due_at: "3156-11-15",
            points_possible: 500
        }
    ]
};

const LearnerSubmissions = [
    {
        learner_id: 125,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-25",
            score: 47
        }
    },

    {
        learner_id: 125,
        assignment_id: 3,
        submission: {
            submitted_at: "2023-01-25",
            score: 400
        }
    },
    {
        learner_id: 132,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-24",
            score: 39
        }
    },
    {
        learner_id: 125,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-02-12",
            score: 150
        }
    },
    {
        learner_id: 132,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-03-07",
            score: 140
        }
    }
];

let checkForOverdue = function (dueDate, subDate) {
    let dd = new Date(dueDate);
    let sd = new Date(subDate);
    return dd.getTime() < sd.getTime() ? true : false;
}

let checkLearnerSubm = function (LearnerSubmissions) {
    for (const ls in LearnerSubmissions) {
        if (isNaN(LearnerSubmissions[ls].learner_id) || isNaN(LearnerSubmissions[ls].assignment_id)) {
            throw 'Learner Submission - Learner ID and Assignment ID should be numeric';
            return false;
        }
        else if (isNaN(LearnerSubmissions[ls].submission.score)) {
            throw 'Learner Submission - the score must be numeric';
            return false;
        }
    }
}

let checkAssignmentGrp = function (AssignmentGroup) {
    if (AssignmentGroup.course_id !== CourseInfo.id) {
        throw 'Invalid input';
        return false;
    }
    else if (isNaN(CourseInfo.id)) {
        throw 'Please enter a valid ID number for the course'
        return false;
    }
    else if (CourseInfo.name.length === 0) {
        throw 'Please enter a course name'
        return false;
    }
    else if (isNaN(AssignmentGroup.id) || isNaN(AssignmentGroup.course_id) || isNaN(AssignmentGroup.group_weight)) {
        throw 'The Assignment Group ID, Course ID, and Group Weight fields, expect numeric values'
        return false;
    }
    else if (AssignmentGroup.name.length === 0) {
        throw 'Please enter an assignment group name'
        return false;
    }
    else {
        for (let i1 = 0; i1 < AssignmentGroup.AssignmentInfo.length; i1++) {
            if (isNaN(AssignmentGroup.AssignmentInfo[i1].id) || isNaN(AssignmentGroup.AssignmentInfo[i1].points_possible)) {
                throw 'The Assignment Info\'s ID, and Possible Point fields, expect numeric values';
                return false;
            }
            else if (isNaN(AssignmentGroup.AssignmentInfo[i1].points_possible) || AssignmentGroup.AssignmentInfo[i1].points_possible <= 0) {
                throw 'Maximum points possible is used in a calculation, please enter a number greater than zero'
                return false;
            }
            else if (AssignmentGroup.AssignmentInfo[i1].name.length === 0) {
                throw 'Please enter an assignment info name'
                return false;
            }
        }
    }
    return true;
}

let findFutureDueDates = function (dueDate) {
    let dd = new Date(dueDate);
    let td = new Date();
    // If entered due date is => five years into the future, confirm that the entry was intentional
    let oneDay = 24 * 60 * 60 * 1000;
    let yearsBetween = (Math.round(Math.abs(dd - td) / oneDay) / 365);
    // if (yearsBetween >= 5) {
    //     let formattedDate = `${dd.getMonth()}/${dd.getDay()}/${dd.getFullYear()}`
    //     let response = prompt(`You have entered a due date of ${formattedDate}. \n \nChoose "OK" to accept this date \n -Or- \nChoose "Cancel" to reenter the date`)
    //     // Check the user's response and add code ...
    //     response === null ? console.log("Reenter date.") : console.log("Future date accepted.");
    // }
    return dd.getTime() > td.getTime() ? true : false;
}
//Perform sort. Real world situations, the learner's id will not be in order
LearnerSubmissions.sort((a, b) => a.learner_id - b.learner_id)

let outcome = function getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions) {
    // I'm passing the objects under the premise that they ARE NOT hardcoded
    checkAssignmentGrp(AssignmentGroup)
    checkLearnerSubm(LearnerSubmissions)

    let learnerID = LearnerSubmissions[0].learner_id;
    for (let i3 = 0; i3 < LearnerSubmissions.length; i3++) {
        if (LearnerSubmissions[i3].learner_id !== learnerID && i3 !== LearnerSubmissions.length - 1) {
            learnerID = LearnerSubmissions[i3].learner_id;
            printResults();
            learner = [[], []]
            row = 0;
        }
        let bypass = false, overdue = false;
        for (let i4 = 0; i4 < AssignmentGroup.AssignmentInfo.length; i4++) {
            bypass = false, overdue = false;
            if (AssignmentGroup.AssignmentInfo[i4].id === LearnerSubmissions[i3].assignment_id) {
                bypass = findFutureDueDates(AssignmentGroup.AssignmentInfo[i4].due_at)
                if (bypass) {
                    break;
                }
                overdue = checkForOverdue(AssignmentGroup.AssignmentInfo[i4].due_at, LearnerSubmissions[i3].submission.submitted_at)

                if (i3 === LearnerSubmissions.length - 1) {
                    learnerID = LearnerSubmissions[i3].learner_id;
                    loadArray(LearnerSubmissions[i3].learner_id,
                        LearnerSubmissions[i3].submission.score,
                        AssignmentGroup.AssignmentInfo[i4].points_possible,
                        overdue)
                    printResults();
                } else {
                    loadArray(LearnerSubmissions[i3].learner_id,
                        LearnerSubmissions[i3].submission.score,
                        AssignmentGroup.AssignmentInfo[i4].points_possible,
                        overdue)
                }
            }
        }
    }
}

function loadArray(id, score, points, overdue) {
    learner[row][0] = id;
    learner[row][1] = score
    learner[row][2] = points
    learner[row][3] = overdue
    learner[row][4] = row + 1
    ++row;
}

function printResults() {

    let totalScore = 0, totalPoints = 0;

    console.log(`Learner ID: ${learner[0][0]}`)

    for (let a = 0; a < learner.length; a++) {
        totalScore += learner[a][1];
        totalPoints += learner[a][2];
    }

    console.log(`Overall Average: ${totalScore / totalPoints}`);

    for (let b = 0; b < learner.length; b++) {
        console.log(`Asgmt #${learner[b][4]} Score: ${learner[b][1] / learner[b][2]}`);
    }
    console.log(`*******************`)
}

let results = outcome(CourseInfo, AssignmentGroup, LearnerSubmissions);
