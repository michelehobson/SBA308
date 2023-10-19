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

let checkAgainstToday = function (dueDate, bypass) {
    let dd = new Date(dueDate);
    let td = new Date()
    // console.log('DOESN\'T COUNT\n' + dd + "\n" + td)
    return dd.getTime() > td.getTime() ? true : false;
}

let checkAgainstSub = function (dueDate, subDate, overdue) {
    let dd = new Date(dueDate);
    let sd = new Date(subDate);
    // console.log('DOESN\'T COUNT\n' + dd + "\n" + sd)
    return dd.getTime() > sd.getTime() ? true : false;
}

let checkLearnerSubm = function () {
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

let checkAssignmentGrp = function () {
    if (AssignmentGroup.course_id !== CourseInfo.id) {
        throw 'Invalid input';
        return false;
    } //Check CourseInfo
    else if (isNaN(CourseInfo.id)) {
        throw 'Please enter a valid ID number for the course'
        return false;
    }
    else if (CourseInfo.name.length === 0) {
        throw 'Please enter a course name'
        return false;
    } // Check AssignmentGroup
    else if (isNaN(AssignmentGroup.id) || isNaN(AssignmentGroup.course_id) || isNaN(AssignmentGroup.group_weight)) {
        throw 'The Assignment Group ID, Course ID, and Group Weight fields, expect numeric values'
        return false;
    }
    else if (AssignmentGroup.name.length === 0) {
        throw 'Please enter an assignment group name'
        return false;
    }
    else { // Check Object --> Array --> Object 
        for (let i1 = 0; i1 < AssignmentGroup.AssignmentInfo.length; i1++) {
            if (isNaN(AssignmentGroup.AssignmentInfo[i1].id) || isNaN(AssignmentGroup.AssignmentInfo[i1].points_possible)) {
                throw 'The Assignment Info\'s ID, and Possible Point fields, expect numeric values';
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
let outcome = function getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions) {
    for (let i3 = 0; i3 < LearnerSubmissions.length; i3++) {
        for (let i4 = 0; i4 < AssignmentGroup.AssignmentInfo.length; i4++) {
            if (AssignmentGroup.AssignmentInfo[i4].id === LearnerSubmissions[i3].assignment_id) {
                let bypass = false, overdue = false;
                let total = 0, pct = 0;
                bypass = checkAgainstToday(AssignmentGroup.AssignmentInfo[i4].due_at, bypass)
                console.log(bypass)
                if (bypass) {
                    break;
                }
                // console.log(LearnerSubmissions[i3].assignment_id + ": " + LearnerSubmissions[i3].learner_id + ": " + LearnerSubmissions[i3].submission.submitted_at)
                // console.log(AssignmentGroup.AssignmentInfo[i4].id + ": " + AssignmentGroup.AssignmentInfo[i4].due_at)
                overdue = checkAgainstSub(AssignmentGroup.AssignmentInfo[i4].due_at, LearnerSubmissions[i3].submission.submitted_at, bypass, overdue)
            }
        }
    }
    checkAssignmentGrp()
    checkLearnerSubm()
    // IT CONTINUES IF THE INPUT IS VALID. STRAAAANNNNGGGGE
    console.log('LOVE Jesus')

}

let results = outcome(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(results);


