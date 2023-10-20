let row = 0;
let col = 5;
let learner = [[], []];
let nbrOfValidAsgmts = 0;

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
        // ,{
        //     id: 3,
        //     name: "Do Something",
        //     due_at: "2023-01-27",
        //     points_possible: 150
        // },        
        // {
        //     id: 4,
        //     name: "Code the World",
        //     due_at: "3156-11-15",
        //     points_possible: 500
        // }
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
        learner_id: 101,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-02-12",
            score: 32
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

let validateInput = function (CourseInfo, AssignmentGroup, LearnerSubmissions) {
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

let countUsableDates = function (AssignmentGroup) {
    let tmp = 0;
    for (let count = 0; count < AssignmentGroup.AssignmentInfo.length; count++) {
        let dd = new Date(AssignmentGroup.AssignmentInfo[count].due_at);
        let td = new Date();
        if (dd.getTime() <= td.getTime()) {
            nbrOfValidAsgmts += 1;
        }
    }
    return nbrOfValidAsgmts;
}

let findFutureDueDates = function (dueDate) {
    let dd = new Date(dueDate);
    let td = new Date();
    // If entered due date is => five years into the future, confirm that the entry was intentional
    let oneDay = 24 * 60 * 60 * 1000;
    let yearsBetween = (Math.round(Math.abs(dd - td) / oneDay) / 365);
    if (yearsBetween >= 5) {
        let formattedDate = `${dd.getMonth()}/${dd.getDay()}/${dd.getFullYear()}`
        let response = prompt(`You have entered a due date of ${formattedDate}. \n \nChoose "OK" to accept this date \n -Or- \nChoose "Cancel" to reenter the date`)
        // Check the user's response and add code ...
        response === null ? console.log("Reenter date.") : console.log("Future date accepted.");
    }
    return dd.getTime() > td.getTime() ? true : false;
}
//Perform sort. Real world situations, the learner's id will not be in order
LearnerSubmissions.sort((a, b) => a.learner_id - b.learner_id)

let outcome = function getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions) {
    try {
        // I'm passing the objects under the premise that they ARE NOT hardcoded
        validateInput(CourseInfo, AssignmentGroup, LearnerSubmissions)
        nbrOfValidAsgmts = countUsableDates(AssignmentGroup)
        learner.length = 1;
        let learnerID = LearnerSubmissions[0].learner_id;
        for (let i3 = 0; i3 < LearnerSubmissions.length; i3++) {
            if (LearnerSubmissions[i3].learner_id !== learnerID && i3 !== LearnerSubmissions.length - 1) {
                printResults(AssignmentGroup);
                learnerID = LearnerSubmissions[i3].learner_id;
                learner = [[], []]
                row = 0;
            }
            let bypass = false, overdue = false;
            for (let i4 = 0; i4 < AssignmentGroup.AssignmentInfo.length; i4++) {
                bypass = false, overdue = false;
                if (AssignmentGroup.AssignmentInfo[i4].id === LearnerSubmissions[i3].assignment_id) {
                    bypass = findFutureDueDates(AssignmentGroup.AssignmentInfo[i4].due_at)
                    if (bypass) break;
                    overdue = checkForOverdue(AssignmentGroup.AssignmentInfo[i4].due_at, LearnerSubmissions[i3].submission.submitted_at)

                    if (i3 === LearnerSubmissions.length - 1) {
                        learnerID = LearnerSubmissions[i3].learner_id;
                        loadArray(LearnerSubmissions[i3].learner_id, LearnerSubmissions[i3].submission.score, AssignmentGroup.AssignmentInfo[i4].points_possible, LearnerSubmissions[i3].assignment_id, overdue);
                        printResults(AssignmentGroup);
                    } else {
                        loadArray(LearnerSubmissions[i3].learner_id, LearnerSubmissions[i3].submission.score, AssignmentGroup.AssignmentInfo[i4].points_possible, LearnerSubmissions[i3].assignment_id, overdue);
                    }
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
}

function loadArray(id, score, points, assignment, overdue) {
    try {
        learner[row][0] = id;
        learner[row][1] = score;
        learner[row][2] = points;
        learner[row][3] = overdue;
        learner[row][4] = assignment;
        ++row;
    } catch (error) {
        console.log(error)
    }
}

function printResults(AssignmentGroup) {
    
    let missedAssignment = false;
    let missedArray = [];
    let missedCnt = 0;

    try {
        console.log(`Learner ID: ${learner[0][0]}`)

        let totalScore = 0, totalPoints = 0;

        // Calculate total score using missed assignments
        if (learner.length < nbrOfValidAsgmts) {
            let notFound = true;
            for (let c = 0; c < AssignmentGroup.AssignmentInfo.length - 1; c++) {
                notFound = true;
                for (let d = 0; d < learner.length; d++) {
                    if (AssignmentGroup.AssignmentInfo[c].id === learner[d][4]) {
                        notFound = false;
                        break;
                    }
                }
                if (notFound) {
                    totalPoints += AssignmentGroup.AssignmentInfo[c].points_possible;
                    missedAssignment = true;
                    missedArray[missedCnt] = AssignmentGroup.AssignmentInfo[c].id;
                    ++missedCnt;
                }
            }
        }
        for (let a = 0; a < learner.length; a++) {
            totalScore += learner[a][1];
            totalPoints += learner[a][2];
        }

        let calcOverall = totalScore / totalPoints * 100;
        console.log(calcOverall % 1 === 0 ? `Overall Average: ${calcOverall}` : `Overall Average: ${(calcOverall).toFixed(2)}`)

        for (let b = 0; b < learner.length; b++) {
            let calcScore = isNaN(learner[b][1]) ? 0 : learner[b][1] / learner[b][2] * 100;
            console.log(calcScore % 1 === 0 ? `Asgmt #${learner[b][4]} Score: ${calcScore}` : `Asgmt #${learner[b][4]} Score: ${(calcScore).toFixed(2)}`);
        }

        if (missedAssignment) {
            for (missedCnt = 0; missedCnt < missedArray.length; missedCnt++) {
                console.log(`Asgmt #${missedArray[missedCnt]} Score: 0 (Missed Exam)`)
            }
        }
        missedAssignment = false;
        console.log('')
    } catch (error) {
        console.log(error)
    }
}

let results = outcome(CourseInfo, AssignmentGroup, LearnerSubmissions);
