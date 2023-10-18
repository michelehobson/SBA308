// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
};

// The provided assignment group.
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
            id: 'a',
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

// The provided learner submission data.
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
        assignment_id: 2,
        submission: {
            submitted_at: "2023-02-12",
            score: 150
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
        learner_id: 132,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-03-07",
            score: 140
        }
    }
];

let checkInput = function() {
    if (AssignmentGroup.course_id !== CourseInfo.id) {
        throw 'Invalid input';
        return false;
    } //Check CourseInfo
    else if (isNaN(CourseInfo.id)) {
        throw 'Please enter a valid ID number for the course'
        return false;
    } // Check AssignmentGroup
    else if (isNaN(AssignmentGroup.id || isNaN(AssignmentGroup.course_id || isNaN(AssignmentGroup.group_weight)))) {
        throw 'The Assignment Group ID, Course ID, and Group Weight fields, expect numeric values'
        return false;
    }
    else { // Check Object --> Array --> Object 
        console.log(AssignmentGroup.AssignmentInfo.length)
        for (let ind1 = 0; ind1 < AssignmentGroup.AssignmentInfo.length; ind1++) {
            if (isNaN(AssignmentGroup.AssignmentInfo[ind1].id || isNaN(AssignmentGroup.AssignmentInfo[ind1].points_possible))) {
                throw 'The Assignment Info\'s ID, and Possible Point fields, expect numeric values';
                return false;
            }
        }
    } 
    return true;
}

    // else if (isNaN()) {
        // return false;

    //  }
//}

//Throw error if Assignment Group does not belong to its course id
// let one = 1
// let outcome = function getLearnerData(CourseInfo, AssignmentGroup, ...LearnerSubmissions) {
// let outcome = function getLearnerData(CourseInfo) {

// ||isNaN(AssignmentGroup.AssignmentInfo.id || isNaN()
function getLearnerData(CourseInfo, AssignmentGroup) {
    for (const ag in AssignmentGroup) {
        console.log(1)
        let validInput = checkInput()
        if (!(validInput)) {
            console.log(2)
            alert('Something ain\'t right')
            return;
        }

    }
}
// console.log(outcome(CourseInfo))
let results = getLearnerData(CourseInfo, AssignmentGroup)

console.log(results);


