// The provided course information.
const CourseInfo = {
    id: 4512,
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

//Throw error if Assignment Group does not belong to its course id
// let one = 1
// let outcome = function getLearnerData(CourseInfo, AssignmentGroup, ...LearnerSubmissions) {
// let outcome = function getLearnerData(CourseInfo) {
function getLearnerData(CourseInfo, AssignmentGroup) {
    for (const ag in AssignmentGroup) {
        if (AssignmentGroup.course_id !== CourseInfo.id) {
            throw 'Invalid input';
        } //Check for invalid dates
        else if (isNaN(one)) {
            throw 'NOT A NUMBER'
        } // Check for invalid numbers
        // else if () {

        // }
    }
}
// console.log(outcome(CourseInfo))
let results = getLearnerData(CourseInfo, AssignmentGroup)
console.log(results);

